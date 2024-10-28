const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const connectDB = require("./config/db.js");

const user_routes = require("./routes/users_routes.js");
const feed_routes = require("./routes/feed_routes.js");
const posts_routes = require("./routes/posts_routes.js");
const comments_routes = require("./routes/comments_routes.js");
const followers_routes = require("./routes/followers_routes.js");
const blocked_users_routes = require("./routes/blocked_users_routes.js");
const notifications_routes = require("./routes/notifications_routes.js");
const chat_messaging_routes = require("./routes/chat_messaging_routes.js");
const media_upload_routes = require("./routes/media_upload_routes.js");
const search_routes = require("./routes/search_routes.js");
const settings_routes = require("./routes/settings_routes.js");

dotenv.config();
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

connectDB();

// app.get("/", (req, res) => {
//     res.send("Social Media API is running...");
// });

// Добавила я
app.use("/api/users", user_routes);
app.use("/api/feed", feed_routes);
app.use("/api/posts", posts_routes);
app.use("/api/posts/:postId/comments", comments_routes);
app.use("/api/users/:userId", followers_routes);
app.use("/api/users/:userId", blocked_users_routes);
app.use("/api/notifications", notifications_routes);
app.use("/api/chat", chat_messaging_routes);
app.use("/api/uploads", media_upload_routes);
app.use("/api/search", search_routes);
app.use("/api/settings", settings_routes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

