const Message = require("../models/Message");

// Get chat list (grouped by wa_id)
exports.getConversations = async (req, res) => {
  const conversations = await Message.aggregate([
    {
      $group: {
        _id: "$wa_id",
        name: { $first: "$name" },
        wa_id: { $first: "$wa_id" },
        lastMessage: { $last: "$text" },
        lastTime: { $last: "$timestamp" },
      },
    },
    { $sort: { lastTime: -1 } },
  ]);
  res.json(conversations);
};

// Get all messages for a user
exports.getMessagesByUser = async (req, res) => {
  const wa_id = req.params.wa_id;
  const messages = await Message.find({ wa_id }).sort({ timestamp: 1 });
  res.json(messages);
};

// Send a message
exports.sendMessage = async (req, res) => {
  const { wa_id, text } = req.body;

  const newMsg = await Message.create({
    wa_id,
    text,
    direction: "outbound",
    status: "sent",
    timestamp: new Date(),
  });

  res.status(201).json(newMsg);
};
