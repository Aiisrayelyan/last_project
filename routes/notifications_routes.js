const express = require("express");
const router = express.Router();


router.get("/",async (req, res)=>{});
router.post("/mark-read/:notificationId",async (req, res)=>{});
router.delete("/:notificationId",async (req, res)=>{});

module.exports = router;