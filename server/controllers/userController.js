const User = require("../models/User");

exports.getUserDetails = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password').populate({
      path: "blogs",
      select: "title summary createdAt",
    });

    if(!user){
      return res.status(204).json({ message: "No user found" });
    }
      console.log("Found User ",user);
      return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: "Error in fetching data" });
  }
};


exports.getUserShortDetails = async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select("fullname email role profilePicture");
  
      if (user) {
        console.log(user);
        return res.status(200).json(user);
      } else {
        return res.status(204).json({ message: "No data found" });
      }
    } catch (error) {
      return res.status(500).json({ message: "Error in fetching data" });
    }
  };

  exports.getUserBlogs = async (req,res) => {
    
  }