// /backend/controllers/messageController.js
const Message = require('../models/Message');
const User = require('../models/User');

exports.sendMessage = async (req, res) => {
  const { receiverId, content } = req.body;
  const senderId = req.user.id;

  const message = await Message.create({ sender: senderId, receiver: receiverId, content });
  res.status(201).json(message);
};

exports.getMessages = async (req, res) => {
  const { userId } = req.params;
  const currentUserId = req.user.id;

  const messages = await Message.find({
    $or: [
      { sender: currentUserId, receiver: userId },
      { sender: userId, receiver: currentUserId },
    ],
  }).sort({ createdAt: 1 });

  res.json(messages);
};
