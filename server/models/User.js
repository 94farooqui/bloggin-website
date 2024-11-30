const mongoose = require("mongoose");
const bcrypt = require("bcrypt")

 const userSchema = new mongoose.Schema({
  fullname: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  profilePicture: { type: String }, // URL for the user's profile picture
  bio: { type: String }, // Short bio about the user
  socialLinks: {
    twitter: { type: String },
    linkedin: { type: String },
  }, // Optional social media links
  blogs: [{ type: mongoose.Schema.ObjectId, ref : "BlogPost"}],
  createdAt: { type: Date, default: Date.now }
});

// Method to hash password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
