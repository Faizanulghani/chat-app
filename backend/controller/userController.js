const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/jwt");

exports.register = async (req, res) => {
  try {
    const { fullname, username, password, email, gender, profilepic } =
      req.body;
    console.log(req.body);

    const user = await userModel.findOne({ username, email });

    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "Username or Email already exist" });
    }

    const passwordHash = bcrypt.hashSync(password, 10);
    const profileBoy =
      profilepic ||
      `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const profileGirl =
      profilepic ||
      `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const newUser = new userModel({
      fullname,
      username,
      password: passwordHash,
      email,
      gender,
      profilepic: gender === "male" ? profileBoy : profileGirl,
    });

    await newUser.save();
    generateToken(newUser._id, res);
    return res.status(200).json({ success: true, message: "User registered" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await userModel.findOne({ username });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }
    const passwordMatch = bcrypt.compareSync(password, user.password);
    if (!passwordMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Password not match" });
    }
    generateToken(user._id, res);
    return res.status(200).json({ success: true, message: "User logged in" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.logout = async (req, res) => {
  try {
    res.cookie("jwt", "", {
      maxAge: 0,
    });
    res.status(200).json({ success: true, message: "User logged out" });
  } catch (error) {}
};
