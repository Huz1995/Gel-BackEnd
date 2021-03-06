const mongoose = require('mongoose');

const HairArtistLocation = new mongoose.Schema({
    type: {
        type: String,
        enum: ['Point'],
        required: true
      },
      coordinates: {
        type: [Number],
        required: true
      }
})

const HairArtistReview = new mongoose.Schema({
    score: {
        type: Number,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    datetime: {
        type: String,
        required: true,
    },
    reviewerUID: {
        type: String,
        required: true,
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
    dialCode: {
        type: String,
        required: false,
        default: null,
    },
    isoCode: {
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
        default: [0, 0],
    },
    numReviews: {
        type: Number,
        required: true,
    },
    totalScore: {
        type: Number,
        required: true,
    },
    reviews: {
        type: [HairArtistReview],
        required: true,
    },
    hairClientMessagingUids: {
        type: [String],
        required: true,
    }
    
})

HairArtistSchema.index({location: "2dsphere"});

module.exports = mongoose.model("Hair_Artist",HairArtistSchema);