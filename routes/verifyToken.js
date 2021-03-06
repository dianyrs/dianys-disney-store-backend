const jwt = require("jsonwebtoken");

const verifyToken = (req,res,next) => {
    const authHeader = req.headers.token
    if(authHeader) {
        jwt.verify(authHeader, process.env.JWT_SECRET, (err, user) => {
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

const verifyTokenAndAdmin = (req,res,next) => {
    verifyToken(req,res,() => {
        if(req.user.isAdmin) {
            next();
        } else {
            res.status(403).json("You are not allowed to do that");
        }
    })
}

module.exports = { verifyToken, verifyTokenAndAuth, verifyTokenAndAdmin };