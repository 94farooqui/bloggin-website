const express = require("express");
const { setUser } = require("../middleware/auth");
const { getUserDetails } = require("../controllers/userController");
const router = express.Router();

router.get("/",setUser, getUserDetails);

module.exports = router;