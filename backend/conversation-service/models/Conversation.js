const mongoose = require("mongoose");

const ConversationSchema = new mongoose.Schema({
    conversation_id: {
        type: String,
        required: true,
        unique: true
    },
    user1_name: {
        type: String,
        required: true,
        unique: true
    },
    user2_name: {
        type: String,
        required: true,
        unique: true
    },
    messages: {
        type: [String],
        required: true
    },
});

const Conversation = mongoose.model("conversation", ConversationSchema);
module.exports = Conversation;
