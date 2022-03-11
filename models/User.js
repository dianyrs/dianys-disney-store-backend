const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        username: {
            type: String,
            required:true,
            unique:true,
            trim: true
        },
        email: {
            type: String,
            lowercase: true,
            required:true,
            unique:true,
            trim: true
        },
        password: {
            type: String,
            unique:true
        },
        isAdmin: {
            type: Boolean,
            default: false
        },
    },
    {
        timestamps: true
    }
);

const User = model("User", userSchema);

module.exports = User;