let express = require("express");
const isLogin = require("../middleware/isLogin");
const { getUserBySearch } = require("../controller/userHandlerController");
let router = express.Router();

router.get("/search",isLogin,getUserBySearch)

module.exports = router;