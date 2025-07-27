let express = require("express");
const { register, login } = require("../controller/userController");
let router = express.Router();

router.post("/register", register);
router.post("/login", login);

module.exports = router;
