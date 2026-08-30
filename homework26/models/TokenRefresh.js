const mongoose = require('mongoose')
const bcrypt = require("bcrypt");
const tokenSchema = new mongoose.Schema({
    token: { type: String,required: true },
    createdAt: { type: Date, default: Date.now },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true })

tokenSchema.pre('save', async function (next) {
    if(!this.isModified('accessToken')) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.accessToken = await bcrypt.hash(this.accessToken, salt);
        next();
    }
    catch (error) {
        next(error);
    }
})

module.exports = mongoose.model('Token',tokenSchema)