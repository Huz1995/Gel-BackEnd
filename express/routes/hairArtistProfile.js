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
    .catch(error => {
        console.log(error);
    })
})

/*add photo url to hair artist profile*/
router.put("/photos", authCheck,(req,res,next) => {

    HairArtist.findOneAndUpdate(
        {uid: req.body.uid},
        {$push: {
            photoUrls: {
                $each: [req.body.photoUrl], $position: 0
            }
        }
    }
    )
    .then(result => {
        res.send("photo url added");
    })
    .catch(error => {
        res.send("unable to store new photo url");
    })
})

/*add photo url to hair artist profile*/
router.delete("/photos", authCheck,(req,res,next) => {
    console.log(req.body.photoUrl);
    HairArtist.findOneAndUpdate(
        {uid: req.body.uid},
        {$pull: {
            photoUrls: req.body.photoUrl
        }
    }
    )
    .then(result => {
        console.log(result);
        res.send("photo url deleted");
    })
    .catch(error => {
        res.send("unable to delete url");
    })
})


/*add photo url to hair artist profile*/
router.put("/profilepicture", authCheck,(req,res,next) => {
    console.log(req.body.photoUrl);
    HairArtist.findOneAndUpdate({uid: req.body.uid},{profilePhotoUrl: req.body.photoUrl})
    .then(result => {
        res.send("profile photo url added");
    })
    .catch(error => {
        res.send("unable to store new photo url");
    })
})

router.delete("/profilepicture", authCheck,(req,res,next) => {
    HairArtist.findOneAndUpdate({uid: req.body.uid},{profilePhotoUrl: null})
    .then(result => {
        res.send("profile photo url added");
    })
    .catch(error => {
        res.send("unable to store new photo url");
    })
})

router.put("/about/:uid/",authCheck, (req,res,next) => {
    console.log(req.body);
    HairArtist.findOneAndUpdate({uid: req.params.uid},{about: req.body})
    .then(result => {
        res.send("about infomation updated");
    })
    .catch(error => {
        console.log(error);
        res.send("unable to update infomation");
    })
})

router.put("/location/:uid/",authCheck, (req,res,next) => {
    console.log(req.body);
    HairArtist.findOneAndUpdate({uid: req.params.uid},{location: {type: 'Point', coordinates: [req.body.lng,req.body.lat]}},{new: true})
    .then(result => {
        res.send("about infomation updated");
    })
    .catch(error => {
        console.log(error);
        res.send("unable to update infomation");
    })
})

router.post("/review", authCheck, async (req,res,next) => {
    console.log(req.body);
    const review = {
        score: req.body.score,
        body: req.body.body,
        reviewerUID: req.body.hairClientUid,
        datetime: req.body.datetime,
    }
    var updatedHairArtist = await HairArtist.findOneAndUpdate(
        {uid: req.body.hairArtistUid},
        {$push: {
            reviews: {
                $each: [review], $position: 0
            }
        }
        },        
        {new: true},
    )
    await HairArtist.findOneAndUpdate(
        {uid: req.body.hairArtistUid},      
        {
            $inc: {numReviews: 1}
        },
    )
    await HairArtist.findOneAndUpdate(
        {uid: req.body.hairArtistUid},      
        {
            $inc: {totalScore: review.score}
        },
    )
    console.log(updatedHairArtist.reviews[0]._id);
    res.send({_id: updatedHairArtist.reviews[0]._id});

})

router.delete("/review",authCheck, async (req,res,next) => {
    console.log(req.body.hairArtistUid);
    console.log(req.body.reviewId);
    console.log(req.body.score);
    await HairArtist.findOneAndUpdate(
        {uid: req.body.hairArtistUid},
        {$pull: {
            reviews: {
                _id : req.body.reviewId
            }
        }
        },        
    )
    await HairArtist.findOneAndUpdate(
        {uid: req.body.hairArtistUid},      
        {
            $inc: {numReviews: -1}
        },
    )
    await HairArtist.findOneAndUpdate(
        {uid: req.body.hairArtistUid},      
        {
            $inc: {totalScore: -req.body.score}
        },
    )
    res.send("ok");
})

module.exports = router;