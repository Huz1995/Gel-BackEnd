const HairClient = require("../mongo_models/hair_client");
const HairArtist = require("../mongo_models/hair_artist");
const ChatRoom = require("../mongo_models/chat_room");

module.exports = (app, io,db) => {
    io.on("connection", function (socket) {
        console.log(socket.id); 
        socket.on("_storeNewUIDs", async (data) => {
            await HairClient.findOneAndUpdate(
                {uid: data.clientUID},        
                {$push: {
                    hairArtistMessagingUids: {
                    $each: [data.artistUID]
                    }
                }
            });
            await HairArtist.findOneAndUpdate(
                {uid: data.artistUID},        
                {$push: {   
                    hairClientMessagingUids: {
                    $each: [data.clientUID]
                    }
                }
            });
            const newChatRoom =  new ChatRoom({
                roomID: data.clientUID + " " + data.artistUID,
                messages: [{
                    roomID: data.clientUID + " " + data.artistUID,
                    txtMsg: "Hi there I hear you want a hair cut",
                    receiverUID: data.clientUID,
                    senderUID: data.artistUID,
                    time: Date.now(),
                },
                {
                    roomID: data.clientUID + " " + data.artistUID,
                    txtMsg: "Yes I do",
                    receiverUID: data.artistUID,
                    senderUID: data.clientUID,
                    time: Date.now(),
                }],
            })
            newChatRoom.save().
            then(res => {
                console.log(res);
            })
            .catch(error => {
                console.log(error);
            }) 
            console.log(data);
            io.emit(data.artistUID, {clientUID: data.clientUID});
            
        })


        
    })
}