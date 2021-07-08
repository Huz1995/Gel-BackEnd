
const express = require("express");
const router = express.Router();
const HairArtist = require("../mongo_models/hair_artist");
const HairClient = require("../mongo_models/hair_client");

router.post("/registration", (req, res, next) => {
    const isHairArtist = (req.body.isHairArtist === 'true');
    if (isHairArtist) {
        const hairArtist = new HairArtist({
            email: req.body.email,
            uid: req.body.uid,
            isHairArtist: req.body.isHairArtist,
            profilePhotos: [],
            photoUrl: null,
        });
        hairArtist.save().then((dbRes) => {

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
    } else {
        const hairClient = new HairClient({
            email: req.body.email,
            uid: req.body.uid,
            isHairArtist: req.body.isHairArtist,
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
        console.log(result2);
        if(result2 != null) {
            res.status(202).send(result2.isHairArtist);
        }
        else {
            res.status(404).send("error");
        }
    }
});


module.exports = router;
