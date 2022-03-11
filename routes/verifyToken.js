const jwt = require("jsonwebtoken");


const verifyToken = (req,res,next) => {
    const authHeader = req.header.token
    if(authHeader) {
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if(err) res.status(403).json("Invalid Token");
            req.user = user;
            next();
        })
    }else{
        return res.status(401).json("Unauthorized")
    }
};

const verifyTokenAndAuth = (req,res,next) => {
    verifyToken(req,res,() => {
        if(req.user.id === req.params.id || req.user.isAdmin) {
            next();
        } else {
            res.status(403).json("You aren't allowed to do that");
        }
    })
}

module.exports = {verifyToken, verifyTokenAndAuth};