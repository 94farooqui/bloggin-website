const BlogPost = require("../models/BlogPost");
const Comment = require("../models/Comment");
const User = require("../models/User");

// Get all posts
exports.getPosts = async (req, res) => {
  try {
    const posts = await BlogPost.find();

    if (posts) {
      return res.status(200).json(posts);
    } else {
      return res.status(204).json({ message: "No data found" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error in fetching data" });
  }
};

//Get All Featured Posts

exports.getFeaturedPosts = async (req, res) => {
  try {
    //console.log("Request received")
    const posts = await BlogPost.find({ featured: true }).populate("author");

    if (posts) {
      //console.log(posts)
      if (posts.length > 0) {
        return res.status(200).json(posts);
      } else {
        return res.status(204).json({ message: "No data found" });
      }
    }
  } catch (error) {
    return res.status(500).json({ message: "Error in fetching data" });
  }
};

exports.getLatestBlogs = async (req, res) => {
  try {
    //console.log("Request received");
    const posts = await BlogPost.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .populate("author");

    if (posts) {
      //console.log(posts);
      if (posts.length > 0) {
        return res.status(200).json(posts);
      } else {
        return res.status(204).json({ message: "No data found" });
      }
    }
  } catch (error) {
    return res.status(500).json({ message: "Error in fetching data" });
  }
};

//get Blog details
exports.getBlogDetails = async (req, res) => {
  const blogId = req.params.id;
  try {
    const blog = await BlogPost.findById(blogId).populate("author").populate({
      path: "comments.user",
      select: "fullname _id",
    });

    if (blog) {
      return res.status(200).json(blog);
    } else {
      return res.status(204).json({ message: "No data found" });
    }
  } catch (error) {
    //console.log(error)
    return res.status(500).json({ message: "Error in fetching data" });
  }
};

//get Filtered Blogs
exports.getFilteredBlogs = async (req, res) => {
  const keyword = req.params.keyword;
  try {
    const blogs = await BlogPost.find({ tags: { $in: [keyword] } });

    if (blogs) {
      return res.status(200).json(blogs);
    } else {
      return res.status(204).json({ message: "No data found" });
    }
  } catch (error) {
    //console.log(error);
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
  try {
    const newBlog = new BlogPost(newBlogData);
    //console.log("New Blog",newBlog);
    const blogAdded = await newBlog.save();
    if (blogAdded) {
      const user = await User.findById(req.user.id);
      if (user) {
        user.blogs.push(blogAdded._id);
        await user.save();
        res.status(201).json(newBlog);
      } else return res.status(401).json();
    }
    return res.status(400).json({ message: "Bad request" });
  } catch (error) {
    return res.status(500).json({ message: "something went wrong" });
  }
};

// Update a post
exports.updatePost = async (req, res) => {
  console.log(req.body)
  const updatedPost = await BlogPost.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
   res.status(201).json(updatedPost);
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

exports.addComment = async (req, res) => {
  const { blogId } = req.params;
  const { user, message } = req.body;
  console.log("comment", req.body, "Blog", blogId);
  const foundBlog = await BlogPost.findById(blogId);
  if (!foundBlog) {
    return res.status(400).json({ message: "Unable to add comment" });
  }
  console.log(foundBlog);
  const newComment = new Comment(req.body);
  foundBlog.comments.push({ user, message });
  const added = await foundBlog.save();

  if (!added) {
    return res.status(400).json({ message: "Unable to add comment" });
  }
  return res.status(200).json(newComment);
};
