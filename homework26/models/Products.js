const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true, min:0},
    stock:{type: Number, required: true, min:0, default:0},
    category: {type: String, required: true},
    createdAt: {type: Date, default: Date.now},
})

productSchema.pre('save', async function (next) {
    if(!this.isModified('title')) return next();
    try {
        const product = await this.constructor.findOne({_id:{$ne: this._id},title: this.title});
        if(product) return next(new Error('Product already exists'));
        return next();
    }
    catch (error) {
        next(error);
    }
})

module.exports = mongoose.model('Product', productSchema);