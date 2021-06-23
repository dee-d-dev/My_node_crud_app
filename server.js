const express = require("express");
const app = express();
const dotenv = require("dotenv");
const morgan = require("morgan");
const bodyparser = require("body-parser");
const { urlencoded } = require("body-parser");
const path = require("path");
const router = require('./server/routes/router');
const connectDB = require('./server/database/connect')

dotenv.config({path: './config.env'});
let PORT = process.env.PORT || 8000;

//set view engine
app.set("view engine", "ejs");

//assets
app.use("/css", express.static(path.resolve(__dirname, "assets/css")));
app.use("/js", express.static(path.resolve(__dirname, "assets/js")));
app.use("/img", express.static(path.resolve(__dirname, "assets/img")));

//log requests with middleware
app.use(morgan("tiny"));

//mongodb connection
connectDB()

//body parser
app.use(bodyparser.urlencoded({ extended: true }));

//router
app.use('/', router)


//server
app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
