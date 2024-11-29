const BlogPost = require("../models/BlogPost");

// Get all posts
exports.getPosts = async (req, res) => {
  try{
const posts = await BlogPost.find();

if (posts) {
  return res.status(200).json(posts);
} else {
  return res.status(204).json({ "message": "No data found" });
}
  }
  catch(error){
    return res.status(500).json({"message":"Error in fetching data"})
  }
  
  
};

//Get All Featured Posts

exports.getFeaturedPosts = async (req, res) => {
  try {
    const posts = await BlogPost.find();

    if (posts.data.length > 0) {
      return res.status(200).json(posts);
    } else {
      return res.status(204).json({ message: "No data found" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error in fetching data" });
  }
};

// Create a new post
exports.createPost = async (req, res) => {
  const { title, content, summary, tags } = req.body;
  const newBlogData = {
    title,
    content,
    summary,
    tags: tags.split(",").map((tag) => tag.trim()),
    author: req.user.id,

  };
  const newBlog = new BlogPost(newBlogData);
  console.log("New Blog",newBlog);
  await newBlog.save();
  res.status(201).json(newBlog);
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
