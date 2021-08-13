
const express = require("express");
const router = express.Router();
const HairArtist = require("../mongo_models/hair_artist");
const HairClient = require("../mongo_models/hair_client");

router.post("/registration",(req, res, next) => {
    const isHairArtist = (req.body.isHairArtist === 'true');
    if (isHairArtist) {
        const tempName = "@" + req.body.email.split("@")[0];
        const hairArtist = new HairArtist({
            email: req.body.email,
            uid: req.body.uid,
            isHairArtist: req.body.isHairArtist,
            profilePhotos: [],
            reviews: [],
            profilePhotoUrl: req.body.photoURL != "null" ? req.body.photoURL : null,
            about: {
                name: tempName,
                contactNumber: "",
                instaUrl: "",
                description: "",
                chatiness: "",
                workingArrangement: "",
                previousWorkExperience: "",
                hairTypes: "",
                hairServCost: "",
            },
            location: {
                type: 'Point',
                coordinates: [0,0],
            },
        });
        hairArtist.save().then((dbRes) => {
            res.status(201).json({
                message: "The user has been successfully registered",
                result: dbRes,
                regSuc: true,
            })

        }).catch((error) => {
            console.log(error);

            res.json({
                message: "Unable to register with these credentials",
                regSuc: false,
            });
        });
    } else {
        const tempName = "@" + req.body.email.split("@")[0];
        const hairClient = new HairClient({
            email: req.body.email,
            uid: req.body.uid,
            isHairArtist: req.body.isHairArtist,
            profilePhotoUrl: req.body.photoURL != "null" ? req.body.photoURL : null,
            name: tempName,
            favouriteUIDs: [],
        });
        hairClient.save().then((dbRes) => {
            res.status(201).json({
                message: "The user has been successfully registered",
                result: dbRes,
                regSuc: true,
            })
        }).catch((error) => {
            res.json({
                message: "Unable to register with these credentials",
                regSuc: false,
            });
        });
    }
})



/*function that gets the info if the user is a hair professional
or not*/
router.get("/:uid", async (req,res,next) => {

    const result = await HairArtist.findOne({uid: req.params.uid});
    if(result!=null) {
        res.status(202).send(result.isHairArtist);
    }
    else {
        const result2 = await HairClient.findOne({uid: req.params.uid});
        if(result2 != null) {
            res.status(202).send(result2.isHairArtist);
        }
        else {
            res.send("User does not exist");
        }
    }
});


module.exports = router;
