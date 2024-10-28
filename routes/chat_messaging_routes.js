const express = require("express");
const router = express.Router();


router.post("/", async (req, res) => { });
router.get("/", async (req, res) => { });
router.post("/:chatId/message")
router.get("/:chatId/messages", async (req, res) => { });
router.put("/:chatId/message/:messageId", async (req, res) => { });
router.delete("/:chatId/message/:messageId", async (req, res) => { });

module.exports = router;