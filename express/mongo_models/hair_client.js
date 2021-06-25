const mongoose = require('mongoose');


const HairClientSchema = new mongoose.Schema({
    email: {
        type: String,
        required: false,
    },
    uid: {
        type: String,
        required: true, 
    },
    isHairArtist: {
        type: Boolean,
        required: true,
    }
});

module.exports = mongoose.model("Hair_Client",HairClientSchema);