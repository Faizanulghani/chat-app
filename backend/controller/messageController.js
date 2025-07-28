let Conversation = require("../models/conversationModel");
let messageModel = require("../models/messageModel");
exports.sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;
    let chats = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });
    if (!chats) {
      chats = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessages = new messageModel({
      senderId,
      receiverId,
      message,
      conversationId: chats._id,
    });

    if (newMessages) {
      chats.messages.push(newMessages._id);
    }

    await chats.save();
    await newMessages.save();
    res.status(201).json({ success: true, newMessages });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getMessage = async (req, res) => {
  try {
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let chats = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    }).populate("messages");
    if (!chats) {
      return res.status(200).json([]);
    }
    const message = chats.messages;
    res.status(200).json({ success: true, message });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
