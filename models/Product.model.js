const { Schema, model } = require("mongoose");
const productSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        price: Number,
        isInStock: {
            type: Boolean,
        },
        typeOfProduct: {
            type: String,
            enum: ["clothing", "accessories", "toys"],
        },
        image: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Product = model("Product", productSchema);

module.exports = Product;