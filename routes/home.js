const express = require('express');
const Product = require("../models/Product");
const router = express.Router();

router.get('/', async (req, res) => {

    const categories = ["Clothing", "Accessories", "Toys"],
        categoryProducts = [],
        products = await Product.find().skip(Math.floor(Math.random() * (await Product.count() - 4))).limit(4);

    for (let i = 0; i < categories.length; i++) {
        const productsCount = await Product.where({typeOfProduct: {$in: [categories[i]]}}).count();

        if (productsCount > 0) {
            categoryProducts.push(
                await Product
                    .where({typeOfProduct: {$in: [categories[i]]}}).skip(Math.floor(Math.random() * productsCount))
                    .findOne()
            );
        }
    }

    res.status(200).json({categoryProducts, products});

});

module.exports = router;
