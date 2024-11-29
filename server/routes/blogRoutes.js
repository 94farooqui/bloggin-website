const express = require("express");
const router = express.Router();
const {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  searchPosts,
  getFeaturedPosts,
  getLatestBlogs,
  getBlogDetails,
  getFilteredBlogs,
} = require("../controllers/blogController");
const { setUser } = require("../middleware/auth");

router.get("/posts", getPosts);
router.get("/posts/featured", getFeaturedPosts);
router.get("/posts/latest", getLatestBlogs);
router.get("/posts/filter/:keyword", getFilteredBlogs);
router.get("/posts/:id", getBlogDetails);
router.post("/posts", setUser,createPost);
router.put("/posts/:id", updatePost);
router.delete("/posts/:id", deletePost);
router.get("/search", searchPosts);

module.exports = router;
