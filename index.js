const express = require("express");
const { logReqRes } = require("./src/middlewares");
const { connectMongoDB } = require("./connect");
const urlRoutes = require('./src/routes/url');
const app = express();

const PORT = 8002;

//connection with mongodb
connectMongoDB("mongodb://localhost:27017/first-db").then(() =>
  console.log("MongoDB connected")
);

//middleware
app.use(express.json());
app.use(logReqRes("./log.txt"));
app.use('/api/url',urlRoutes);

app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`));
