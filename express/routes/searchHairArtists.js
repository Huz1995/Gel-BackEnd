const express = require("express");
const router = express.Router();
const HairArtist = require("../mongo_models/hair_artist");
const authCheck = require("../middleware/authentication_check");

router.post("",authCheck,(req,res,next) => {
    HairArtist.find({
        location: {
          $near: {
            $geometry: {
               type: "Point" ,
               coordinates: [req.body.lng, req.body.lat]
            },
            $maxDistance: 15000,
            $minDistance: 0,
          }
        }
     }).then((result)=>{
         res.send(result);
     })
     .catch((error) => {
         console.log(error)
         })
})


module.exports = router;