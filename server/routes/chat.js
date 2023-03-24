const express = require("express");
const router = express.Router();
const {
	checkConversation,
	newConversation,
	getChatAgg,
} = require("../controllers/chatController");

router.get("/conversations/:user", checkConversation);

router.post("/conversations/new", newConversation);

module.exports = router;
