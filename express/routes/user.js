
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
            console.log(error);
            res.json({
                message: "Unable to register with these credentials",
                regSuc: false,
            });
        });
    }
})


module.exports = router;
