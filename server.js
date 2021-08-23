const http = require('http');
const socketio = require("socket.io");
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authRoute = require('./express/routes/authentication.js');
const hairArtistProfileRoute = require('./express/routes/hairArtistProfile');
const hairClientProfileRoute = require('./express/routes/hairClientProfile');
const searchHairArtistsRoute = require('./express/routes/searchHairArtists');
const messagesRoute = require('./express/routes/messages')

/*init to firebase admin*/
var admin = require("firebase-admin");
var serviceAccount = require("./gel-auth-dev-firebase-adminsdk-277q6-fc605e12ac.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

/*connect to mongodb*/
const {
  MONGO_USERNAME,
  MONGO_PASSWORD,
  MONGO_HOSTNAME,
  MONGO_DB,
} = process.env;
const mongoDBConnect = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}/${MONGO_DB}?retryWrites=true&w=majority`;


/*init an express application*/
const app = express();
/*init node server*/
const server = http.createServer(app);
/*init socket*/
const io = socketio(server,{
    cors:
    {
       origin:"*"
    }
}).sockets;


/*use cors for cross orgin referencing*/
app.use(cors());
/*use json bodyparser to parse url req.body to json*/
app.use(bodyParser.json({limit: '100mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '100mb', extended: true}))

mongoose.connect(mongoDBConnect,{ useNewUrlParser: true, useUnifiedTopology: true })
.then(connection => {
    console.log("Rest Api has successfully connected to mongoDb Database");
})
.catch(err=>{
  console.log(err);
    console.log("Not connected to the database");
})


app.use("/api/authentication",authRoute);
app.use("/api/hairArtistProfile",hairArtistProfileRoute);
app.use("/api/hairClientProfile",hairClientProfileRoute);
app.use("/api/searchHairArtists",searchHairArtistsRoute);
app.use("/api/messages",messagesRoute);


/* set up the port variable*/
const port = process.env.PORT || '3000';
app.set("port",port);



require("./express/middleware/socket")(app, io, mongoDBConnect);

// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/index.html');
// });

/*create server using express app and listen on port*/
server.listen(port, () => console.log(`Server running at port ${port}`));