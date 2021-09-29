import Award from "./Award";
import Imdb from "./Imdb";
import Tomatoe from "./Tomatoe";
import Comment from "./Comment";

class Farmer {
    _id: String = '';
    plot: String = '';
    poster: String = '';
    genres: String[] = [];
    runtime: Number = 0;
    cast: String[] = [];
    num_mflix_comments: Number = 0;
    title: String = '';
    fullplot: String = '';
    languages: String[] = [];
    countries: String[] = [];
    released: Date = new Date();
    directors: String[] = [];
    rated: String = '';
    awards: Award = new Award();
    lastUpdated: Date = new Date();
    year: Number = 0;
    imdb: Imdb = new Imdb();
    type: String = '';
    tomatoes: Tomatoe = new Tomatoe();
    comments: Comment[] = [];
    userId: String = '';
}

export default Farmer;