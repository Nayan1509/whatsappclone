const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    wa_id: String,
    name: String,
    text: String,
    timestamp: Date,
    direction: String, // 'inbound' or 'outbound'
    status: {
      type: String,
      enum: ["sent", "delivered", "read"],
      default: "sent",
    },
    meta_msg_id: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", messageSchema, "processed_messages");
