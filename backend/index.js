const express = require("express");
const app = express();
const dotenv = require("dotenv");
const connectDB = require("./config/connectDB");
const authRoute = require("./route/authRoute");
const userRoute = require("./route/userRoute");
const messageRoute = require("./route/messageRoute");
const cookieParser = require("cookie-parser");

dotenv.config();
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/message", messageRoute);
app.use("/api/user", userRoute);

let port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
