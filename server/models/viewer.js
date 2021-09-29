import mongoose from 'mongoose';

const viewerSchema = mongoose.Schema({
    rating: { type: Number },
    numReviews: { type: Number },
    meter: { type: Number },
});

const Viewer = mongoose.model('viewer', viewerSchema);
export default Viewer;