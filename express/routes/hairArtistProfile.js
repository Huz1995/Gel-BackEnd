const express = require("express");
const router = express.Router();
const HairArtist = require("../mongo_models/hair_artist");
const authCheck = require("../middleware/authentication_check");

/*get hair artist profile data and send to front end*/
router.get('/:uid',authCheck,(req,res,next) => {
    const uid = req.params.uid;
    HairArtist.findOne({uid: req.params.uid})
    .then(userData => {
        res.send(userData);
    })
})

/*add photo url to hair artist profile*/
router.put("/photos", authCheck,(req,res,next) => {
    console.log(req.body.photoUrl);
    HairArtist.findOneAndUpdate({uid: req.body.uid},{$push: {photoUrls: {$each: [req.body.photoUrl], $position: 0}}}, {new:true})
    .then(result => {
        res.send("photo url added");
    })
    .catch(error => {
        res.send("unable to store new photo url");
    })
})


/*add photo url to hair artist profile*/
router.put("/profilepicture", authCheck,(req,res,next) => {
    console.log(req.body.photoUrl);
    HairArtist.findOneAndUpdate({uid: req.body.uid},{profilePhotoUrl: req.body.photoUrl}, {new:true})
    .then(result => {
        res.send("profile photo url added");
    })
    .catch(error => {
        res.send("unable to store new photo url");
    })
})



module.exports = router;