const jwt = require('jsonwebtoken')
const config = require('../config/config.js')

module.exports = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if(!authHeader){
        return res.status(401).json({message: 'Token is not found'});
    }

    const parts = authHeader.split(' ');
    if(parts.length !== 2 || /^Bearer$/i.test(parts[0])){
        return res.status(401).json({message: 'Token is incorrect'});
    }
    const token = parts[1]
    jwt.verify(token, config.jwtSecretAccess, (err, decoded) => {
        if(err.name === 'TokenExpiredError'){
            return res.status(401).json({message: 'Token is expired'});
        }
        if(err.name === "JsonWebTokenError") {
            return res.status(401).json({message: 'Invalid token'});
        }
        if(err){
            return res.status(401).json({message: 'Invalid token'});
        }
        req.userId = decoded.id;
        next()
    })
}