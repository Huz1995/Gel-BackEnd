const express = require("express");
const router = express.Router();
const HairClient = require("../mongo_models/hair_client");
const authCheck = require("../middleware/authentication_check");

/*get hair artist profile data and send to front end*/
router.get('/:uid',authCheck,(req,res,next) => {
    const uid = req.params.uid;
    HairClient.findOne({uid: req.params.uid})
    .then(userData => {
        res.send(userData);
    })
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

module.exports = router;