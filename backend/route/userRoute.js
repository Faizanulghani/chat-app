let express = require("express");
const isLogin = require("../middleware/isLogin");
const {
  getUserBySearch,
  getCurrentChatters,
} = require("../controller/userHandlerController");
let router = express.Router();

router.get("/search", isLogin, getUserBySearch);
router.get("/currentchatters", isLogin, getCurrentChatters);

module.exports = router;
