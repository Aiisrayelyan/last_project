const express = require("express");
const router = express.Router();

router.post("/block", async (req, res) => {
    try {
        res.status(200).json({ message: "block" });
    } catch (error) {
        res.status(500).json({ message: "Error block" });
    };
});
router.delete("/unblock", async (req, res) => { });
router.get("/blocked", async (req, res) => { });


module.exports = router;