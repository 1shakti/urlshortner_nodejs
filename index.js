const express = require("express");
const path = require("path");
const { logReqRes } = require("./src/middlewares");
const { connectMongoDB } = require("./connect");
const cookieParser = require("cookie-parser");
const { restrictToLoggedInuserOnly, checkAuth } = require("./src/middlewares/auth");
const app = express();
const PORT = 8002;

//routes import
const urlRoutes = require("./src/routes/url");
const staticRoute = require("./src/routes/staticRoute");
const usersRoute = require("./src/routes/users");

//connection with mongodb
connectMongoDB("mongodb://localhost:27017/first-db").then(() =>
  console.log("MongoDB connected")
);

//ejs
app.set("view engine", "ejs");
app.set("views", path.resolve("./src/views"));

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(logReqRes("./log.txt"));

app.use("/api/url", restrictToLoggedInuserOnly, urlRoutes);
app.use("/",checkAuth ,staticRoute);
app.use("/api/users", usersRoute);

app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`));
