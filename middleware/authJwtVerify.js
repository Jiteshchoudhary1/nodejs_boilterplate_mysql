const httpStatus = require("http-status");
const jwt = require("jsonwebtoken");
const { verifyToken } = require("../helper/jwtHelper");

module.exports.authMiddleware = async (req, res, next) => {
    try {
        let token = req.headers.authorization;
        if (!token) {
            return res.status(httpStatus.BAD_REQUEST).json({
                success: false,
                data: null,
                message: "Token missing from header"
            })
        }
        else {
            token = token.split(' ')[1];
            let decodeToken = verifyToken(token);
            req.user = decodeToken;
            next();
        }

    } catch (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            data: null,
            message: error.message
        })
    }
}