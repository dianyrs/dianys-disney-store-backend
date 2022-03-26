require("dotenv").config();

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const express = require("express");
const viewEngine = require('express-json-views');
const mongoose = require("mongoose");


const app = express();
const cors = require("cors");
const homeRoute = require('./routes/home');
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
app.use(
    cors({
        credentials: true,
        origin: process.env.ORIGIN || 'http://localhost:3000'
    })
);

//Mongoose
mongoose
    .connect(process.env.MONGODB_URI)
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
app.use('/api/home', homeRoute);
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/checkout", paymentRoute);

// TODO: REMOVE THIS!!!

// const products = {
//     'Kids Clothing': [
//         {
//             id: 1,
//             img: "https://cdn-ssl.s7.disneystore.com/is/image/DisneyShopping/5622045537871?fmt=webp&qlt=70&wid=1304&hei=1304",
//             title: "Mickey Mouse Ringer T-Shirt for Kids",
//         },
//         {
//             id: 2,
//             img: "https://cdn-ssl.s7.disneystore.com/is/image/DisneyShopping/3921059192069?fmt=webp&qlt=70&wid=1304&hei=1304",
//             title: "Mickey Mouse Swim Trunks for Boys",
//         },
//         {
//             id: 3,
//             img: "https://cdn-ssl.s7.disneystore.com/is/image/DisneyShopping/5813057430012?fmt=webp&qlt=70&wid=1304&hei=1304",
//             title: "Mickey Mouse Varsity Jacket for Kids",
//         },
//         {
//             id: 4,
//             img: "https://cdn-ssl.s7.disneystore.com/is/image/DisneyShopping/4903057392998?fmt=webp&qlt=70&wid=1304&hei=1304",
//             title: "Mickey Mouse Pajamas for Kids",
//         },
//         {
//             id: 5,
//             img: "https://cdn-ssl.s7.disneystore.com/is/image/DisneyShopping/5815057344664?fmt=webp&qlt=70&wid=156&hei=156",
//             title: "Minnie Mouse Tutu Dress for Girls",
//         },
//         {
//             id: 6,
//             img: "https://cdn-ssl.s7.disneystore.com/is/image/DisneyShopping/5813057534665?fmt=webp&qlt=70&wid=1304&hei=1304",
//             title: "Minnie Mouse Denim Jacket for Girls",
//         },
//     ],
//     'Clothing': [
//         {
//             id: 1,
//             img: "https://cdn-ssl.s7.disneystore.com/is/image/DisneyShopping/2140105824129?fmt=webp&qlt=70&wid=1304&hei=1304",
//             title: "Tiana Dress for Women – The Princess and the Frog",
//         },
//         {
//             id: 2,
//             img: "https://cdn-ssl.s7.disneystore.com/is/image/DisneyShopping/2140107004235?fmt=webp&qlt=70&wid=1304&hei=1304",
//             title: "Mickey Mouse and Friends Woven Dress for Adults by Tommy Bahama",
//         },
//         {
//             id: 3,
//             img: "https://cdn-ssl.s7.disneystore.com/is/image/DisneyShopping/5620045537997?fmt=webp&qlt=70&wid=1304&hei=1304",
//             title: "Daisy Duck Tie-Dye T-Shirt for Women",
//         },
//         {
//             id: 4,
//             img: "https://cdn-ssl.s7.disneystore.com/is/image/DisneyShopping/2140058384193?fmt=webp&qlt=70&wid=1304&hei=1304",
//             title: "Pocahontas Denim Jacket for Women by Spirit Jersey",
//         },
//         {
//             id: 5,
//             img: "https://cdn-ssl.s7.disneystore.com/is/image/DisneyShopping/5620057437835?fmt=webp&qlt=70&wid=1304&hei=1304",
//             title: "Mickey Mouse Classic Long Sleeve T-Shirt ",
//         },
//         {
//             id: 6,
//             img: "https://cdn-ssl.s7.disneystore.com/is/image/DisneyShopping/4901057392975?fmt=webp&qlt=70&wid=1304&hei=1304",
//             title: "Pluto Pajama Shorts for Men",
//         },
//     ],
//     Accessories: [
//         {
//             id: 1,
//             img: "https://cdn-ssl.s7.disneystore.com/is/image/DisneyShopping/2021059550376?fmt=webp&qlt=70&wid=1304&hei=1304",
//             title: "Tomorrowland Minnie Mouse Ear Headband for Adults",
//         },
//         {
//             id: 2,
//             img: "https://cdn-ssl.s7.disneystore.com/is/image/DisneyShopping/2014105714510?fmt=webp&qlt=70&wid=1304&hei=1304",
//             title: "Minnie Mouse Flower Loungefly Mini Backpack",
//         },
//         {
//             id: 3,
//             img: "https://cdn-ssl.s7.disneystore.com/is/image/DisneyShopping/3922057542078?fmt=webp&qlt=70&wid=1304&hei=1304",
//             title: "Minnie Mouse Slides for Kids\n",
//         },
//         {
//             id: 4,
//             img: "https://cdn-ssl.s7.disneystore.com/is/image/DisneyShopping/6730058013239?fmt=webp&qlt=70&wid=1304&hei=1304",
//             title: "Minnie Mouse Heart Pendant Necklace",
//         },
//         {
//             id: 5,
//             img: "https://cdn-ssl.s7.disneystore.com/is/image/DisneyShopping/6730055371506?fmt=webp&qlt=70&wid=1304&hei=1304",
//             title: "Ariel Two-Tone Alloy Watch for Women",
//         },
//         {
//             id: 6,
//             img: "https://cdn-ssl.s7.disneystore.com/is/image/DisneyShopping/7401057016947?fmt=webp&qlt=70&wid=1304&hei=1304",
//             title: "Minnie Mouse Icon Pearl Earrings by CRISLU",
//         },
//     ],
//     Toys: [
//         {
//             id: 1,
//             img: "https://cdn-ssl.s7.disneystore.com/is/image/DisneyShopping/6103047093862?fmt=webp&qlt=70&wid=1304&hei=1304",
//             title: "LEGO Marvel Studios – Limited Edition",
//         },
//         {
//             id: 2,
//             img: "https://cdn-ssl.s7.disneystore.com/is/image/DisneyShopping/6101047622837?fmt=webp&qlt=70&wid=1304&hei=1304",
//             title: "Buzz Lightyear Interactive Talking Action Figure",
//         },
//         {
//             id: 3,
//             img: "https://cdn-ssl.s7.disneystore.com/is/image/DisneyShopping/6002059731814?fmt=webp&qlt=70&wid=1304&hei=1304",
//             title: "Mirabel Singing Doll – Encanto",
//         },
//         {
//             id: 4,
//             img: "https://cdn-ssl.s7.disneystore.com/is/image/DisneyShopping/1231047442584?fmt=webp&qlt=70&wid=1304&hei=1304",
//             title: "Stitch Plush",
//         },
//         {
//             id: 5,
//             img: "https://cdn-ssl.s7.disneystore.com/is/image/DisneyShopping/6005047091879?fmt=webp&qlt=70&wid=1304&hei=1304",
//             title: "LEGO Ariel's Underwater Palace",
//         },
//         {
//             id: 6,
//             img: "https://cdn-ssl.s7.disneystore.com/is/image/DisneyShopping/1234041283583-1?fmt=webp&qlt=70&wid=1304&hei=1304",
//             title: "Pua Weighted Plush – Moana",
//         },
//     ],
//     Costumes: [
//         {
//             id: 1,
//             img: "https://cdn-ssl.s7.disneystore.com/is/image/DisneyShopping/2841041618183?fmt=webp&qlt=70&wid=453&hei=453",
//             title: "Disney's Frozen Elsa Costume",
//         },
//         {
//             id: 2,
//             img: "https://cdn-ssl.s7.disneystore.com/is/image/DisneyShopping/4903057392482-1?fmt=webp&qlt=70&wid=1304&hei=1304",
//             title: "Buzz Lightyear Costume PJ PALS for Boys",
//         },
//         {
//             id: 3,
//             img: "https://cdn-ssl.s7.disneystore.com/is/image/DisneyShopping/4902055252638?fmt=webp&qlt=70&wid=1304&hei=1304",
//             title: "Anna Sleep Gown for Girls – Frozen 2",
//         },
//         {
//             id: 4,
//             img: "https://cdn-ssl.s7.disneystore.com/is/image/DisneyShopping/4903057392494?fmt=webp&qlt=70&wid=1304&hei=1304",
//             title: "Woody Costume PJ PALS for Boys",
//         },
//         {
//             id: 5,
//             img: "https://cdn-ssl.s7.disneystore.com/is/image/DisneyShopping/2841041618561-1?fmt=webp&qlt=70&wid=1304&hei=1304",
//             title: "Raya Costume for Kids – Disney Raya and the Last Dragon",
//         },
//         {
//             id: 6,
//             img: "https://cdn-ssl.s7.disneystore.com/is/image/DisneyShopping/4903057390822?fmt=webp&qlt=70&wid=1304&hei=1304",
//             title: "Hulk Costume PJ PALS for Boys",
//         },
//     ]
// }
//
// const Product = require("./models/Product");
//
// for (let category in products) {
//     for (let i = 0; i < products[category].length; i++) {
//         new Product({
//             title: products[category][i].title,
//             price: Math.floor(Math.random() * 15) + 5,
//             count: Math.floor(Math.random() * 15) + 5,
//             typeOfProduct: category,
//             gender: ['Male', 'Female'][Math.round(Math.random())],
//             size: ['XS', 'S', 'M', 'L', 'XL'][Math.round(Math.random() * 4)],
//             image: products[category][i].img
//         }).save();
//     }
// }

module.exports = app;