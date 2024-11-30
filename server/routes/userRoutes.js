const express = require("express");
const { setUser } = require("../middleware/auth");
const { getUserDetails,getUserShortDetails } = require("../controllers/userController");
const router = express.Router();

router.get("/",setUser, getUserDetails);
router.get("/:token",setUser, getUserShortDetails);

module.exports = router;