import Farmer from '../models/farmer.js';
import mongoose from 'mongoose';
import Award from '../models/award.js';
import Imdb from '../models/imdb.js';
import Tomatoe from '../models/tomatoe.js';

export const getFarmers = async (req, res) => {
    const { page } = req.query;

    try {
        const limit = 12;
        const startIndex = (Number(page) - 1) * limit;
        const total = await Farmer.countDocuments({});
        const farmers = await Farmer.find().sort({ _id: -1 }).limit(limit).skip(startIndex);
        res.status(200).json({ data: farmers, currentPage: Number(page), numberOfPages: Math.ceil(total / limit) });
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getFarmer = async (req, res) => {
    const { id } = req.params;

    try {
        const farmer = await Farmer.findById(id);
        res.status(200).json(farmer);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getFarmersBySearch = async (req, res) => {
    const { searchQuery, genres } = req.query;

    try {
        const title = new RegExp(searchQuery, "i");
        let farmers = [];
        if (genres) {
            if (searchQuery === 'none') {
                farmers = await Farmer.find({ genres: { $all: genres.split(',') } });
            }
            else {
                farmers = await Farmer.find({ $and: [{ title }, { genres: { $all: genres.split(',') } }] });
            }
        }
        else {
            farmers = await Farmer.find({ title });
        }

        res.json({ data: farmers });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createFarmer = async (req, res) => {
    const farmer = req.body;

    try {
        if (farmer?.title?.trim()?.length === 0) return res.status(200).json({ error: "No title given" });
        if (farmer?.fullPlot?.trim()?.length === 0) return res.status(200).json({ error: "No plot given" });

        const newAwards = new Award({ wins: farmer.awards, nomination: 0, text: `${farmer.awards} win.` });
        const newImdb = new Imdb({ rating: 0, votes: 0, id: Math.random() })
        const newFarmer = new Farmer({
            plot: farmer.fullPlot.substring(0, 100),
            genres: farmer.selectedGenres,
            runtime: farmer.runtime,
            rated: "NOT RATED",
            cast: farmer.selectedActors,
            poster: farmer.file,
            title: farmer.title,
            fullplot: farmer.fullPlot,
            languages: farmer.selectedLanguages,
            released: farmer.releasedDate,
            directors: farmer.selectedDirectors,
            writers: farmer.selectedWriters,
            awards: newAwards,
            lastupdated: new Date().toISOString(),
            year: farmer.year,
            imdb: newImdb,
            countries: farmer.selectedCountries,
            type: farmer.type,
            tomatoes: new Tomatoe(),
            userId: farmer.userId
        });
        await newFarmer.save();
        res.status(201).json(newFarmer);
    }
    catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updateFarmer = async (req, res) => {
    const { id } = req.params;
    const { title, fullPlot, awards, file, userId } = req.body;

    try {
        if (title?.trim()?.length === 0) return res.status(200).json({ error: "No title given" });
        if (fullPlot?.trim()?.length === 0) return res.status(200).json({ error: "No plot given" });

        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No farmer with id: ${id}`);

        const updatedFarmer = {
            plot: fullPlot.substring(0, 100),
            poster: file,
            title: title,
            fullplot: fullPlot,
            lastupdated: new Date().toISOString(),

            _id: id
        };

        await Farmer.findByIdAndUpdate(id, updatedFarmer, { new: true });
        res.status(201).json(updateFarmer);
    }
    catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const deleteFarmer = async (req, res) => {
    const { id } = req.params;

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No farmer with id: ${id}`);

        await Farmer.findByIdAndRemove(id);

        res.status(201).json({ message: "Farmer deleted successfully." });
    }
    catch (error) {
        res.status(409).json({ message: error.message });
    }
}

