const User = require("../models/user.js");

const followUser = async (followerId, userId) => {
    const userToFollow = await User.findById(userId);
    if (!userToFollow) {
        throw new Error("User not found");
    }
    if (followerId === userId) {
        throw new Error("You cannot follow yourself");
    }

    const updatedUser = await User.findByIdAndUpdate(
        followerId,
        { $addToSet: { following: userId } },
        { new: true }
    );
    await User.findByIdAndUpdate(
        userId,
        { $addToSet: { followers: followerId } },
        { new: true }
    );

    return updatedUser;
};

const unfollowUser = async (followerId, userId) => {
    const userToUnfollow = await User.findById(userId);
    if (!userToUnfollow) {
        throw new Error("User not found");
    }
    if (followerId === userId) {
        throw new Error("You cannot unfollow yourself");
    }

    const updatedUser = await User.findByIdAndUpdate(
        followerId,
        { $pull: { following: userId } },
        { new: true }
    );
    await User.findByIdAndUpdate(
        userId,
        { $pull: { followers: followerId } },
        { new: true }
    );

    return updatedUser;
};

const getFollowers = async (userId) => {
    const user = await User.findById(userId).populate("followers", "username");
    if (!user) {
        throw new Error("User not found");
    }
    return user.followers;
};

const getFollowing = async (userId) => {
    const user = await User.findById(userId).populate("following", "username");
    if (!user) {
        throw new Error("User not found");
    }
    return user.following;
};

const getBlockedUsers = async (userId) => {
    const user = await User.findById(userId).populate("blocked", "username");
    if (!user) {
        throw new Error("User not found");
    }
    return user.blocked;
};

module.exports = {
    followUser,
    unfollowUser,
    getFollowers,
    getFollowing,
    getBlockedUsers
};