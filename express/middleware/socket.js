const HairClient = require("../mongo_models/hair_client");
const HairArtist = require("../mongo_models/hair_artist");

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

            console.log(data);
            io.emit(data.artistUID, {clientUID: data.clientUID});
            
        })
    })
}