const express = require("express");
const postService = require("../services/posts_service.js");
const authMiddleware = require("../middleware/auth_middleware.js");
const router = express.Router();


router.post("/", authMiddleware, async (req, res) => {
    try {
        const post = await postService.createPost(req.user, req.body);
        res.status(201).json({ message: "Post created successfully", post });
    } catch (error) {
        res.status(500).json({ message: error.message });
    };
});

router.get("/", authMiddleware, async (req, res) => {
    try {
        const posts = await postService.getAllPosts();
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    };
});

router.get("/:postId", authMiddleware, async (req, res) => {
    try {
        const post = await postService.getPostById(req.params.postId);
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    };
});

router.put("/:postId", authMiddleware, async (req, res) => {
    try {
        const updatedPost = await postService.updatedPost(req.user, req.params.postId, req.body);
        res.status(200).json({ message: "Post updated successfully", updatedPost });
    } catch (error) {
        res.status(500).json({ message: error.message });
    };
});

router.delete("/:postId", authMiddleware, async (req, res) => {
    try {
        await postService.deletePost(req.user, req.params.postId);
        res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    };
});

router.post("/:postId/like", authMiddleware, async (req, res) => {
    try {
        const likedPost = await postService.likePost(req.user, req.params.postId);
        res.status(200).json({ message: "Post liked successfully", likedPost });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete("/:postId/like", authMiddleware, async (req, res) => { });
router.post("/:postId/share", authMiddleware, async (req, res) => { });
router.get("/:userId/posts", authMiddleware, async (req, res) => { });

module.exports = router;