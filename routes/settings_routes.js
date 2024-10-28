const express = require("express");
const router = express.Router();
const settingsService = require("../services/settings_service.js");


router.get("/", async (req, res) => {
    try {
        await settingsService.getUserSettings(req.user);
        res.status(200).json({ message: "Settings retrieved successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving settings" });
    };
});

router.put("/", async (req, res) => {
    try {
        await settingsService.updateUserSettings(req.user, req.body);
        res.status(200).json({ message: "Settings updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error updating settings" });
    };
});

router.post("/password/change", async (req, res) => {
    try {
        await settingsService.changePassword(req.user, req.body);
        res.status(200).json({ message: "Password changed successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error changing password" });
    };
});

module.exports = router;