const express = require("express");
const router = express.Router();
const { getPosts, createPost, updatePost, deletePost, searchPosts } = require("../controllers/blogController");

router.get("/posts", getPosts);
router.post("/posts", createPost);
router.put("/posts/:id", updatePost);
router.delete("/posts/:id", deletePost);
router.get("/search", searchPosts);

module.exports = router;
