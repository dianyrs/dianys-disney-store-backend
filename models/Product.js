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
        count: {
            type: Number,
            required: true,
            default: 0
        },
        typeOfProduct: {
            type: String,
            required: true,
            enum: ["Kids Clothing", "Clothing", "Accessories", "Toys", "Costumes"]
        },
        gender: {
            type: String,
            enum: ["Male", "Female"]
        },
        size: {
            type: String
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