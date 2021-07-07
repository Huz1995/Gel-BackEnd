const express = require("express");
const router = express.Router();
const HairArtist = require("../mongo_models/hair_artist");

/*get hair artist profile data and send to front end*/
router.get('/:uid',(req,res,next) => {
    const uid = req.params.uid;
    HairArtist.findOne({uid: req.params.uid})
    .then(userData => {
        res.send(userData);
    })
})

/*add photo url to hair artist profile*/
router.put("/addphoto", (req,res,next) => {
    HairArtist.findOneAndUpdate({uid: req.body.uid},{$push: {photoUrls: req.body.url}}, {new:true})
    .then(result => {
        res.send(result.photoUrls);
    })
    .catch(error => {
        res.send("unable to store new photo url");
    })
})

module.exports = router;