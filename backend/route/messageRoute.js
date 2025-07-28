let express = require("express");
const { sendMessage, getMessage } = require("../controller/messageController");
const isLogin = require("../middleware/isLogin");
let router = express.Router();

router.post("/send/:id", isLogin, sendMessage);
router.post("/:id", isLogin, getMessage);

module.exports = router;
