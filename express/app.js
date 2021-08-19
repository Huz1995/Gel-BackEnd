const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authRoute = require('./routes/authentication');
const hairArtistProfileRoute = require('./routes/hairArtistProfile');
const hairClientProfileRoute = require('./routes/hairClientProfile');
const searchHairArtistsRoute = require('./routes/searchHairArtists');


var admin = require("firebase-admin");

var serviceAccount = require("../gel-auth-dev-firebase-adminsdk-277q6-fc605e12ac.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const {
  MONGO_USERNAME,
  MONGO_PASSWORD,
  MONGO_HOSTNAME,
  MONGO_DB,
} = process.env;

const mongoDBConnect = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}/${MONGO_DB}?retryWrites=true&w=majority`;


/*init an express application*/
const app = express();
const http = require('http').createServer(app);

//Socket Logic
const socketio = require('socket.io')(http)

socketio.on("connection", (userSocket) => {
    userSocket.on("send_message", (data) => {
        userSocket.broadcast.emit("receive_message", data)
    })
})


/*use cors for cross orgin referencing*/
app.use(cors());
/*use json bodyparser to parse url req.body to json*/
app.use(bodyParser.json({limit: '100mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '100mb', extended: true}))

/*connect to mongoDb*/
mongoose.connect(mongoDBConnect,{ useNewUrlParser: true, useUnifiedTopology: true })
.then(connection => {
    console.log("Rest Api has successfully connected to mongoDb Database");
})
.catch(err=>{
  console.log(err);
    console.log("Not connected to the database");
})

app.get("", (req,res,next) => {
  res.send("Welcome to Gel");
});

app.use("/api/authentication",authRoute);
app.use("/api/hairArtistProfile",hairArtistProfileRoute);
app.use("/api/hairClientProfile",hairClientProfileRoute);
app.use("/api/searchHairArtists",searchHairArtistsRoute);


module.exports = app;