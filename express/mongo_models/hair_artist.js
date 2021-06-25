const mongoose = require('mongoose');


const HairArtistSchema = new mongoose.Schema({
    email: {
        type: String,
        required: false,
    },
    uid: {
        type: String,
        required: false, 
    },
    isHairArtist: {
        type: Boolean,
        required: true,
    }
})

module.exports = mongoose.model("Hair_Artist",HairArtistSchema);