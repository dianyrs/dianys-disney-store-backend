const express = require('express');
const router = express.Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

//registration
router.post("/register", async (req, res) => {
    const user = await User.findOne({username: req.body.username});

    if (user) return res.status(400).json("The username has been taken");

    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SECRET).toString(),
    });

    try {
        const savedUser = await newUser.save();
        console.log(savedUser + " <= this user was saved as expected");

        res.status(200).json({
            id: savedUser._id,
            username: savedUser.username,
            email: savedUser.email,
            isAdmin: savedUser.isAdmin
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// LOGIN
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({username: req.body.username});

        if (!user) return res.status(401).json("Wrong Credentials");

        const hashedPassword = CryptoJS.AES.decrypt(
            user.password,
            process.env.PASS_SECRET
        );
        const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

        if (OriginalPassword !== req.body.password) return res.status(401).json("Wrong Credentials");

        const accessToken = jwt.sign({
                id: user._id, isAdmin: user.isAdmin,
            },
            process.env.JWT_SECRET,
            {expiresIn: "3d"}
        );

        const {password, ...others} = user._doc;
        return res.status(200).json({
            id: others._id,
            username: others.username,
            email: others.email,
            isAdmin: others.isAdmin,
            accessToken
        });
    } catch (err) {
        return res.status(500).json(err);
    }
});

module.exports = router;
