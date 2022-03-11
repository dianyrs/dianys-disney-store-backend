const router = require("express").Router();
const Product = require("../models/Product.model");
const fileUploader = require("../config/cloudinary.config");

/* GET home page */
router.get("/", (req, res, next) => {
    res.json({ message: "PRODUCTS" });
});

router.post("/upload-image", fileUploader.single("imageUrl"), (req, res) => {
    console.log("FILE", req.file);
    res.json(req.file);
});





module.exports = router;