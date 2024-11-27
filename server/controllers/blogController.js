const BlogPost = require("../models/BlogPost");

// Get all posts
exports.getPosts = async (req, res) => {
  const posts = await BlogPost.find();
  res.json(posts);
};

// Create a new post
exports.createPost = async (req, res) => {
  const newPost = new BlogPost(req.body);
  await newPost.save();
  res.status(201).json(newPost);
};

// Update a post
exports.updatePost = async (req, res) => {
  const updatedPost = await BlogPost.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedPost);
};

// Delete a post
exports.deletePost = async (req, res) => {
  await BlogPost.findByIdAndDelete(req.params.id);
  res.status(204).send();
};

// Search posts
exports.searchPosts = async (req, res) => {
  const { query } = req.query;
  const results = await BlogPost.find({ $text: { $search: query } });
  res.json(results);
};
