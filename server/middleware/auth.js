const jwt = require("jsonwebtoken");

const setUser = async (req, res, next) => {
  //console.log(req.headers)
  try {
    const token = req.headers["authorization"].split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    console.log("Token received", token);
    const user = jwt.verify(token, process.env.JWT_SECRET);

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    console.log(user);
    req.user = user;
    next();
  } catch (error) {
    console.log("expired token")
    return res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = { setUser };
