const jwt = require("jsonwebtoken");

const setUser = async (req, res, next) => {
  //console.log(req.headers)
  const token = req.headers["authorization"].split(" ")[1];

  if (token) {
    console.log(token);
    const user = jwt.verify(token, process.env.JWT_SECRET);

    if(user){
        console.log(user)
        req.user = user
         next();
    }
   
  }
};

module.exports = { setUser };
