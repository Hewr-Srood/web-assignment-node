const express = require("express");
const { createUser, getUser } = require("../controllers/usersController");

const router = express.Router();

router.route("/signup").post(createUser);
router.route("/signin").post(getUser);

module.exports = router;
