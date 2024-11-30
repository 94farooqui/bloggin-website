const User = require("../models/User");

exports.getUserDetails = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate({
      path: "blogs",
      select: "title summary createdAt",
    });

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
