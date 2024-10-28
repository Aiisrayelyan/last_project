const express = require("express");
const followersService = require("../services/followers_service.js");
const authMiddleware = require("../middleware/auth_middleware.js");
const router = express.Router();

router.post("/follow", authMiddleware, async (req, res) => {
    try {
        const result = await followersService.followUser(req.user, req.body.userId);
        res.status(200).json({ message: "Followed successfully", result });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete("/unfollow", authMiddleware, async (req, res) => {
    try {
        const result = await followersService.unfollowUser(req.user, req.body.userId);
        res.status(200).json({ message: "Unfollowed successfully", result });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get("/followers", authMiddleware, async (req, res) => {
    try {
        const followers = await followersService.getFollowers(req.user);
        res.status(200).json(followers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get("/following", authMiddleware, async (req, res) => {
    try {
        const following = await followersService.getFollowing(req.user);
        res.status(200).json(following);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get("/blocked", authMiddleware, async (req, res) => {
    try {
        const blockedUsers = await followersService.getBlockedUsers(req.user);
        res.status(200).json(blockedUsers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
