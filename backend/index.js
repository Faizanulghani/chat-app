const express = require("express");
const app = express();
const dotenv = require("dotenv");
const connectDB = require("./config/connectDB");
const userRoute = require("./route/userRoute");

dotenv.config();
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/auth", userRoute);

let port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
