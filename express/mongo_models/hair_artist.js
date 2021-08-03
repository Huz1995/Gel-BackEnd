const mongoose = require('mongoose');

const HairArtistLocation = new mongoose.Schema({
    lat: {
        type: Number,
        required: false,
        default: null,
    },
    lng: {
        type: Number,
        required: false,
        default: null,
    }
})

const HairArtistProfileInformation = new mongoose.Schema({
    name: {
        type: String,
        required: false,
        default: null,
    },
    contactNumber: {
        type: String,
        required: false,
        default: null,
    },
    instaUrl: {
        type: String,
        required: false,
        default: null,
    },
    description: {
        type: String,
        required: false,
        default: null,
    },
    chatiness: {
        type: String,
        required: false,
        default: null,
    },
    workingArrangement: {
        type: String,
        required: false,
        default: null,
    },
    previousWorkExperience: {
        type: String,
        required: false,
        default: null,
    },
    hairTypes: {
        type: String,
        required: false,
        default: null,
    },
    hairServCost: {
        type: String,
        required: false,
        default: null,
    },
    
})

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
    profilePhotoUrl: {
        type: String,
        required: false,
        default: null,
    },
    about: {
        type: HairArtistProfileInformation,
        required: true,
    },
    location: {
        type: HairArtistLocation,
        required: true,
    }
    
})

module.exports = mongoose.model("Hair_Artist",HairArtistSchema);