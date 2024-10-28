const express = require("express");
const userService = require("../services/users_service.js");
const authMiddleware = require("../middleware/auth_middleware.js");
const router = express.Router();

router.post("/register", async (req, res) => {
    try {
        const user = await userService.registerUser(req.body);
        res.status(201).json({
            message: "User registered successfully", user,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    };
});

router.post("/login", async (req, res) => {
    try {
        const { token, userId } = await userService.loginUser(req.body);
        res.status(200).json({ token, userId });
    } catch (error) {
        res.status(401).json({ message: error.message });
    };
});

router.get("/profile/:userId", authMiddleware, async (req, res) => {
    try {
        const user = await userService.getUserProfile(req.params.userId);
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ message: error.message });
    };
});

router.put("/profile/:userId", authMiddleware, async (req, res) => {
    try {
        const updatedUser = await userService.updateUserProfile(req.params.userId, req.body);
        res.status(200).json({
            message: "User updated successfully", updatedUser,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    };
});

router.delete("/profile/:userId", authMiddleware, async (req, res) => {
    try {
        await userService.deleteUser(req.params.userId);
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    };
});

router.post("/logout", authMiddleware, async (req, res) => {
    try {
        await userService.logoutUser();
        res.status(200).json({ message: "User logged out seccessfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    };
});

module.exports = router;