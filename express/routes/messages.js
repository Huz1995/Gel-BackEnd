const express = require("express");
const router = express.Router();
const HairClient = require("../mongo_models/hair_client");
const HairArtist = require("../mongo_models/hair_artist");
const ChatRoom = require("../mongo_models/chat_room");
const authCheck = require("../middleware/authentication_check");


router.post("/metaChatDataClientSender", authCheck, async (req,res,next) => {
    const dummyString = req.body.recieverUIDs.replace("[","").replace("]","");
    metaChatDataClientSender = dummyString.split(", ");
    if(metaChatDataClientSender[0]===''){
        metaChatDataClientSender = [];
    } 
    dataToSend = [];
    for(i = 0; i < metaChatDataClientSender.length; i++) {
        const hairArtist = await HairArtist.findOne({uid: metaChatDataClientSender[i]});
        var hairArtistDataToSend = {
            profilePhotoUrl : hairArtist.profilePhotoUrl,
            receiverUID: hairArtist.uid,
            receiverName: hairArtist.about.name, 
        }
        dataToSend.push(hairArtistDataToSend);
    }
        console.log(dataToSend);
    res.send(dataToSend);

});

router.post("/metaChatDataArtistSender", authCheck, async (req,res,next) => {
    const dummyString = req.body.recieverUIDs.replace("[","").replace("]","");
    metaChatDataArtistSender = dummyString.split(", ");
    if(metaChatDataArtistSender[0]===''){
        metaChatDataArtistSender = [];
    } 
    dataToSend = [];
    for(i = 0; i < metaChatDataArtistSender.length; i++) {
        const hairClient = await HairClient.findOne({uid: metaChatDataArtistSender[i]});
        console.log(hairClient);
        var hairClientDataToSend = {
            profilePhotoUrl : hairClient.profilePhotoUrl,
            receiverUID: hairClient.uid,
            receiverName: hairClient.name,
        }
        dataToSend.push(hairClientDataToSend);
    }
        console.log(dataToSend);
    res.send(dataToSend);
});

router.get("/chatroom/:roomId", authCheck, async (req,res,next) => {
    console.log(req.params.roomId);
    const chatRoom = await ChatRoom.findOne({roomId: req.params.id});
    console.log(chatRoom);
    res.send(chatRoom);
})


module.exports = router