const HairClient = require("../mongo_models/hair_client");
const HairArtist = require("../mongo_models/hair_artist");
const ChatRoom = require("../mongo_models/chat_room");
const Message = require("../mongo_models/message");

module.exports = (app, io,db) => {
    io.on("connection", function (socket) {
        /*ths is when the hair clients tomessengins a new artist*/
        socket.on("_storeNewUIDs", async (data) => {
            /*adding the new artist uid ot the client*/
            await HairClient.findOneAndUpdate(
                {uid: data.clientUID},        
                {$push: {
                    hairArtistMessagingUids: {
                    $each: [data.artistUID]
                    }
                }
            });
            /*add the client uid to the artist*/
            await HairArtist.findOneAndUpdate(
                {uid: data.artistUID},        
                {$push: {   
                    hairClientMessagingUids: {
                    $each: [data.clientUID]
                    }
                }
            });
            /*create a new chat room with id made from client then artist uid*/
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

        /*when either artist or client sends a new message*/
        socket.on("_sendMessage", async (message) => {
            /*add the message to the chat room array*/
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
            /*for live data if they are both connected to socket willChange: on the messenging page
            send to the reciever the message so can display on their phone*/
            io.emit(message.receiverUID,message);
        });


        
    })
}