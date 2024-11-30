const mongoose = require("mongoose");

const blogPostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  summary: { type: String, required: true },
  author: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
  featured: { type: Boolean, default : false},
  tags: {
    type: [String],
    default: [],
  },
  likes: {
    type: [mongoose.Schema.Types.ObjectId], // Array of user IDs who liked the blog
    ref: "User",
    default: [],
  },
  comments: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    message: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  }],
});

module.exports = mongoose.model("BlogPost", blogPostSchema);
