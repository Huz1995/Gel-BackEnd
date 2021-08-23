const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({

    roomID: {
        type: String,
        required: true,
    },
    txtMsg: {
        type: String,
        required: true,
    },
    receiverUID: {
        type: String,
        required: true,
    },
    senderUID: {
        type: String,
        required: true,
    },
    time: {
        type: Date,
        required: true,
    }

})

module.exports = MessageSchema;