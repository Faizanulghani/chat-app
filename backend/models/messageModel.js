let mongoose = require("mongoose");

let messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    message: { type: String, required: true },
    conversationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "conversation",
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("message", messageSchema);