const { Schema, model } = require("mongoose");
const productSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        typeOfProduct: {
            type: String,
            required: true,
            enum: ["clothing", "accessories", "toys"]
        },
        image: {
            type: String,
            required: true
        },
    },
    {
        timestamps: true
    }
);

const Product = model("Product", productSchema);

module.exports = Product;