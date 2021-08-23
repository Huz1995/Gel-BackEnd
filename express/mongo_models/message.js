const mongoose = require('mongoose');
const MessageSchema = require('../schema/message_schema');

module.exports = mongoose.model("Message", MessageSchema);