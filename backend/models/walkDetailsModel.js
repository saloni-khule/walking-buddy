const mongoose = require('mongoose');

const Schema = mongoose.Schema

const walkSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    }
    // ,
    // departure: {
    //     type: timestamps,
    //     required: true
    // }

},
    { timestamps: true })


module.exports = mongoose.model('walkDetailsModel', walkSchema);
