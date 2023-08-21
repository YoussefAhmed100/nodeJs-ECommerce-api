const jwt = require("jsonwebtoken");
const router = require("./auth");
const User = require("../models/User");

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token;
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.JWT.SEC, (err, user) => {
            if (err) res.status(403).json("token is not valid");
            req.user = user;
            next();
        });
    } else {
        return res.status(401).json("you are not authenticated");
    }
};
const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(res, req, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next();
        } else {
            res.status(403).json("you are not allowed to do that");
        }
    });
};

const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(res, req, () => {
        if (req.user.isAdmin) {
            next();
        } else {
            res.status(403).json("you are not allowed to do that");
        }
    });
};


module.exports = {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
};
