const express = require("express");
const router = express.Router();
const {
  getConversations,
  getMessagesByUser,
  sendMessage,
} = require("../controllers/messageController");

router.get("/conversations", getConversations);
router.get("/messages/:wa_id", getMessagesByUser);
router.post("/message", sendMessage);

module.exports = router;
