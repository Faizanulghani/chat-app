const userModel = require("../models/userModel");

exports.getUserBySearch = async (req, res) => {
  try {
    const search = req.query.search || "";
    const currentUserId = req.user._id;
    const users = await userModel
      .find({
        $and: [
          {
            $or: [
              { username: { $regex: ".*" + search + ".*", $options: "i" } },
              { fullname: { $regex: ".*" + search + ".*", $options: "i" } },
            ],
          },
          {
            _id: { $ne: currentUserId },
          },
        ],
      })
      .select("-password")
      .select("email");
    res.json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
