const User = require('../models/User.js');
const jwt = require('jsonwebtoken');
const config = require('../config/config.js');
const TokenModel = require('../models/TokenRefresh.js');

exports.register = async (req, res) => {
    try {
        const {name, email, password, role} = req.body;
        if(!name || !email || !password) {
            return res.status(400).json({message: 'Please enter a valid email, email, password'});
        }
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(409).json({message: 'Conflict'});
        }
        const user = new User({name, email, password, role});
        await user.save();
        const accessPayload ={
            id: user._id,
            role: user.role,
        }
        const accessToken = jwt.sign(accessPayload, config.jwtSecretAccess, {expiresIn: config.jwtExpiresInAccess});
        const refreshToken = jwt.sign({id: user._id}, config.jwtSecretRefresh, {expiresIn: config.jwtExpiresInSecret});
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 30 * 24 * 60 * 60 * 1000
        })
        return res.status(201).json({accessToken, user:{id: user._id, name, email}});
    }
    catch(err){
        console.error(err);
        return res.status(500).json({message: 'Something went wrong'});
    }
}

exports.getInfoFromBase = async (req, res,next) => {
    const authHeader = req.headers['authorization'];
    if(!authHeader){
        return res.status(401).json({message: 'Token is not found'});
    }

    const token = authHeader.split(' ')[1];
    try{
        const decoded = jwt.verify(token, config.jwtSecret);
        const user = await User.findById(decoded.id).select('-password');

        if(!user){
            return res.status(404).json({message: 'User not found'});
        }
        return res.status(200).json({user})
    }
    catch(err){
        if(err.name === 'TokenExpiredError'){
            return res.status(401).json({message: 'Token is expired'});
        }
        if(err.name === "JsonWebTokenError") {
            return res.status(401).json({message: 'Invalid token'});
        }
        console.error(err);
        return res.status(500).json({message: 'Something went wrong'});
    }
}

exports.removingRefreshTokenAndCookie = async (req, res,next) => {

}

exports.checkingRefreshTokenAndUpdatingIt = async (req, res, next) => {
    try{
        const {refreshToken} = req.cookie;
        if(!refreshToken) res.status(401).json({message: 'Token is expired or invalid'});
        let userData;
        try {
            userData = jwt.verify(refreshToken, config.jwtSecretRefresh);
        }
        catch(err){
            console.error(err);
        }
        const tokenFromDB = await TokenModel.findOne({token: refreshToken})
        if(!tokenFromDB){
            await TokenModel.deleteMany({userId: userData.id})
            return res.status(403).json({message: 'Token is not found'});
        }

        const newAccessToken = jwt.sign({ id: userData.id }, config.jwtSecretAccess);
        const newRefreshToken = jwt.sign({id: userData.id}, config.jwtSecretRefresh);
        tokenFromDB.token = newAccessToken;
        await tokenFromDB.save()

        res.cookie('refreshToken', newRefreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 30 * 24 * 60 * 60 * 1000
        })
        return res.json({accessToken: newAccessToken})
    }
    catch(err){
        console.error(err);
        return res.status(500).json({message: 'Something went wrong'});
    }
}

exports.login = async (req, res) => {
    try {
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({message: 'Please enter a valid email, password'});
        }
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message: 'Invalid credentials'});
        }
        const isMatch = await user.comparePassword(password);
        if(!isMatch){
            return res.status(400).json({message: 'Invalid credentials'});
        }

        const token = jwt.sign({id: user._id, role: user.role}, config.jwtSecret, {expiresIn: config.jwtExpiresIn})
        return res.status(200).json({token, user:{id: user._id, name: user.name, email: user.email}});
    }
    catch(err){
        console.error(err);
        return res.status(500).json({message: 'Something went wrong'});
    }
}
