let jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const isLogin = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token)
      return res
        .status(401)
        .json({ success: false, message: "unauthorized user" });
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded)
      return res
        .status(401)
        .json({ success: false, message: "unauthorized user" });
    const user = await userModel.findById(decoded.userId).select("-password");
    if (!user)
      return res
        .status(401)
        .json({ success: false, message: "unauthorized user" });
    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = isLogin;