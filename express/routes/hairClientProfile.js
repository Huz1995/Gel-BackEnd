const express = require("express");
const router = express.Router();
const HairClient = require("../mongo_models/hair_client");
const HairArtist = require("../mongo_models/hair_artist");
const authCheck = require("../middleware/authentication_check");


/*get hair artist profile data and send to front end*/
router.get('/:uid',authCheck,async (req,res,next) => {

    var hairClient = await HairClient.findOne({uid: req.params.uid});
    var hairClientToFrontEnd = {
        uid: hairClient.uid,
        profilePhotoUrl: hairClient.profilePhotoUrl,
        name: hairClient.name,
        email: hairClient.email,
        isHairArtist:  hairClient.isHairArtist,
        favoriteHairArtists: [],
    }
    for(i = 0; i < hairClient.favouriteHairArtists.length; i++) {
        const hairArtist = await HairArtist.findOne({uid: hairClient.favouriteHairArtists[i]});
        hairClientToFrontEnd.favoriteHairArtists.push(hairArtist);
    }
    return res.send(hairClientToFrontEnd);
})

router.get('/reviewer/:uid',authCheck, async (req, res, next) => {
    var hairClient = await HairClient.findOne({uid: req.params.uid});
    reviewData = {
        reviewerProfilePhotoUrl: hairClient.profilePhotoUrl,
        reviewerName: hairClient.name,
    }
    res.send(reviewData);
})


router.put("/setName/:uid/",authCheck, (req,res,next) => {
    HairClient.findOneAndUpdate({uid: req.params.uid},{name: req.body.name})
    .then(result => {
        res.send("name updated");
    })
    .catch(error => {
        console.log(error);
        res.send("unable to update infomation");
    })
})

router.delete("/profilepicture", authCheck,(req,res,next) => {
    console.log(req.body.photoUrl);
    HairClient.findOneAndUpdate({uid: req.body.uid},{profilePhotoUrl: null})
    .then(result => {
        res.send("profile photo url added");
    })
    .catch(error => {
        res.send("unable to store new photo url");
    })
})

/*add photo url to hair artist profile*/
router.put("/profilepicture", authCheck,(req,res,next) => {
    console.log(req.body.photoUrl);
    HairClient.findOneAndUpdate({uid: req.body.uid},{profilePhotoUrl: req.body.photoUrl})
    .then(result => {
        res.send("profile photo url added");
    })
    .catch(error => {
        res.send("unable to store new photo url");
    })
})

router.post("/favouriteHairArtists",authCheck,(req,res,next) => {
    HairClient.findOneAndUpdate(
        {uid: req.body.uid},        
        {$push: {
            favouriteHairArtists: {
            $each: [req.body.favouriteHairArtists]
            }
        }
    })
    .then(result => {
        console.log(result);
        res.send("artist added as favourite");
    })
    .catch(error => {
        console.log(error);
        res.send("error");
    })
    console.log(req.body.favouriteHairArtists);
});

router.delete("/favouriteHairArtists",authCheck,(req,res,next) => {
    HairClient.findOneAndUpdate(
        {uid: req.body.uid},        
        {$pull: {
            favouriteHairArtists: req.body.favouriteHairArtists,
        }
    })
    .then(result => {
        console.log(result);
        res.send("artist removed as favourite");
    })
    .catch(error => {
        console.log(error);
        res.send("error");
    })
    console.log(req.body.favouriteHairArtists);
});

module.exports = router;