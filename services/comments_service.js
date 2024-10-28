const Comment = require("../models/comments.js");
const Post = require("../models/posts.js");

const addComment = async (userId, postId, commentData) => {
    const post = await Post.findById(postId);
    if (!post) {
        throw new Error("Post not found");
    };

    const newComment = new Comment({
        content: commentData.content,
        author: userId,
        post: postId,
    });

    await newComment.save();
    return newComment;
};

const getAllComments = async (postId) => {
    const comments = await Comment.find({ post: postId }).populate("author", "username");
    return comments;
};

const updateComment = async (userId, postId, commentId, updateData) => {
    const comment = await Comment.findById(commentId);
    if (!comment) {
        throw new Error("Comment not found");
    };
    if (comment.author.toString() !== userId) {
        throw new Error("Not authorized to update this comment");
    };
    comment.content = updateData.content || comment.content;
    await comment.save();
    return comment;
};

const deleteComment = async (userId, postId, commentId) => {
    const comment = await Comment.findById(commentId);
    if (!comment) {
        throw new Error("Comment not found");
    };
    if (comment.author.toString() !== userId) {
        throw new Error("Not authorized to delete this comment");
    };
    await comment.remove();
};

module.exports = {
    addComment,
    getAllComments,
    updateComment,
    deleteComment,
}