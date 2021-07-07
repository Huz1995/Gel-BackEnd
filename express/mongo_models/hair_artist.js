const mongoose = require('mongoose');


const HairArtistSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    uid: {
        type: String,
        required: true, 
    },
    isHairArtist: {
        type: Boolean,
        required: true,
    },
    photoUrls: {
        type: [String],
        required: true,
    },
})

module.exports = mongoose.model("Hair_Artist",HairArtistSchema);