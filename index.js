const express = require("express");
const path = require('path');
const { logReqRes } = require("./src/middlewares");
const { connectMongoDB } = require("./connect");
const urlRoutes = require('./src/routes/url');
const staticRoute = require('./src/routes/staticRoute');

const app = express();

const PORT = 8002;

//connection with mongodb
connectMongoDB("mongodb://localhost:27017/first-db").then(() =>
  console.log("MongoDB connected")
);

//ejs
app.set('view engine', 'ejs');
app.set('views',path.resolve('./src/views'));

//middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(logReqRes("./log.txt"));

app.use('/api/url',urlRoutes);
app.use('/',staticRoute);

app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`));
