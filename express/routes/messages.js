const express = require("express");
const router = express.Router();
const HairClient = require("../mongo_models/hair_client");
const HairArtist = require("../mongo_models/hair_artist");
const ChatRoom = require("../mongo_models/chat_room");
const authCheck = require("../middleware/authentication_check");


/*this path sends metachat data to the client who is the sender*/
router.post("/metaChatDataClientSender", authCheck, async (req,res,next) => {
    /*we have a list of receiver id's that the client is messenging, coming as a string
    remove the bracket characters in the string and then split on commas to get data type as an
    array with the uids the client is taking too*/
    const dummyString = req.body.recieverUIDs.replace("[","").replace("]","");
    recUIDs = dummyString.split(", ");
    /*if there is no uid then set empty array*/
    if(recUIDs[0]===''){
        recUIDs = [];
    } 
    dataToSend = [];
    /*for each rec uids*/
    for(i = 0; i < recUIDs.length; i++) {
        /*find  the hair artist from collection*/
        const hairArtist = await HairArtist.findOne({uid: recUIDs[i]});
        /*get the chat room id from the users uids*/
        const roomID = req.body.senderUID + " " + recUIDs[i];
        const chatRoom = await ChatRoom.findOne({roomID: roomID})
        /*want to send the latest message and time to the client*/
        var latestMessage;
        /*when the client is messenging for first timethe chat room could be null,
        or there is no message in array in chatroom, so we create a deafult latest
        message*/
        if(chatRoom == null || chatRoom.messages.length === 0) {
            latestMessage = {
                txtMsg: " ",
                time: " ",
            };
        } 
        else {
           latestMessage = chatRoom.messages[chatRoom.messages.length - 1]; 
        }
        /*meta data we are sending to the client*/
        var hairArtistDataToSend = {
            profilePhotoUrl : hairArtist.profilePhotoUrl,
            receiverUID: hairArtist.uid,
            receiverName: hairArtist.about.name, 
            latestMessageTxt: latestMessage.txtMsg,
            latestMessageTime: latestMessage.time
        }
        dataToSend.push(hairArtistDataToSend);
    }
    console.log(dataToSend);
    res.send(dataToSend);
});

/*same as above but the artist is requesting meta chat data*/
router.post("/metaChatDataArtistSender", authCheck, async (req,res,next) => {
    const dummyString = req.body.recieverUIDs.replace("[","").replace("]","");
    recUIDs = dummyString.split(", ");
    if(recUIDs[0]===''){
        recUIDs = [];
    } 
    dataToSend = [];
    for(i = 0; i < recUIDs.length; i++) {
        const hairClient = await HairClient.findOne({uid: recUIDs[i]});
        const roomID = recUIDs[i] + " " + req.body.senderUID;
        const chatRoom = await ChatRoom.findOne({roomID: roomID})
        var latestMessage;
        if(chatRoom.messages.length === 0) {
            latestMessage = {
                txtMsg: " ",
                time: " ",
            };
        }
        else {
           latestMessage = chatRoom.messages[chatRoom.messages.length - 1]; 
        }
       console.log(chatRoom.messages.length);
        var hairClientDataToSend = {
            profilePhotoUrl : hairClient.profilePhotoUrl,
            receiverUID: hairClient.uid,
            receiverName: hairClient.name,
            latestMessageTxt: latestMessage.txtMsg,
            latestMessageTime: latestMessage.time
        }
        dataToSend.push(hairClientDataToSend);
    }
    console.log(dataToSend);
    res.send(dataToSend);
});

/*this is getting the chatroom data and sending to the users to display*/
router.get("/chatroom/:roomId", authCheck, async (req,res,next) => {
    console.log(req.params.roomId);
    const chatRoom = await ChatRoom.findOne({roomId: req.params.id});
    console.log(chatRoom);
    res.send(chatRoom);
})


module.exports = router