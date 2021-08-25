const HairClient = require("../mongo_models/hair_client");
const HairArtist = require("../mongo_models/hair_artist");
const ChatRoom = require("../mongo_models/chat_room");
const Message = require("../mongo_models/message");

module.exports = (app, io,db) => {
    io.on("connection", function (socket) {
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
                messages: [],
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

        socket.on("_sendMessage", async (message) => {
            var updatedChatRoom = await ChatRoom.findOneAndUpdate(
                {roomID: message.roomID},
                {$push: {
                    messages: {
                        $each: [message], 
                    }
                }
                },        
                {new: true},
            )
            console.log(message.receiverUID);
            io.emit(message.receiverUID,message);
        });


        
    })
}