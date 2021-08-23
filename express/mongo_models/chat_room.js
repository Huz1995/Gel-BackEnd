const mongoose = require('mongoose');
const Message = require('../schema/message_schema');

const ChatRoomSchema= new mongoose.Schema({
    roomID: {
        type: String,
        required: true,
    },
    messages: {
        type: [Message],
        required: true,
    },
})


module.exports = mongoose.model("ChatRoom",ChatRoomSchema);