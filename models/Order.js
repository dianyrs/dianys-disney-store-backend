const { Schema, model } = require("mongoose");
const orderSchema = new Schema(
    {
        userId: {
            type: String

        },
        products: [
            {
                productId: {
                    type: String
                },
                quantity: {
                    type: Number,
                    default: 1,
                },
            },
        ],
        amount: {
            type: Number,
            required: true,
            default: 0
        },
        address: {
            type: Object
        },
        status: {
            type: String,
            default: "pending"
        },
    },
    {
        timestamps: true
    }
);

const Order = model("Order", orderSchema);

module.exports = Order;