const Post = require("../models/posts.js");

const createPost = async (userId, postData) => {
    const newPost = new Post({
        content: postData.content,
        author: userId,
    });
    await newPost.save();
    return newPost;
};

const getAllPosts = async () => {
    const posts = await Post.find().populate("author", "username");
    return posts;
};

const getPostById = async (postId) => {
    const post = await Post.findById(postId).populate("author", "username");
    if (!post) {
        throw new Error("Post not found");
    };
    return post;
};

const updatePost = async (userId, postId, updateData) => {
    const post = await Post.findById(postId);
    if (!post) {
        throw new Error("Post not found");
    };
    if (post.author.toString() !== userId) {
        throw new Error("Not authorized to update this post");
    };
    post.content = updateData.content || post.content;
    await post.save();
    return post;
};

const deletePost = async (userId, postId) => {
    const post = await Post.findById(postId);
    if (!post) {
        throw new Error("Post not found");
    };
    if (post.author.toString() !== userId) {
        throw new Error("Not authorized to delete this post");
    };
    await post.remove();
};

const likePost = async (userId, postId) => {
    const post = await Post.findById(postId);
    if (!post) {
        throw new Error("Post not found");
    };
    if (post.likes.includes(userId)) {
        post.likes = post.likes.filter(like => like.toString() !== userId);
    } else {
        post.likes.push(userId);
    };
    await post.save();
    return post;
};

module.exports = {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost,
    likePost,
};