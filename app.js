require("dotenv").config();

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const express = require("express");
const viewEngine = require('express-json-views');
const mongoose = require("mongoose");


const app = express();
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const paymentRoute = require("./routes/payment");


// Middleware Setup
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.use(express.json());

// CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//Mongoose
mongoose
    .connect("mongodb+srv://disar:disar@cluster0.tgxey.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
    .then(() => {
        console.log("Connected to Mongo!");
    })
    .catch((err) => {
        console.error("Error connecting to mongo", err);
    });

app.engine('json', viewEngine({
    helpers: require('./views/helpers')
}));
app.set('views', __dirname + '/views');
app.set('view engine', 'json');

// ROUTES
const home = require('./routes/home');


// Home
app.use('/', home);
app.use("/api/auth", authRoute);
app.use("/api/user" , userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/checkout", paymentRoute);

module.exports = app;