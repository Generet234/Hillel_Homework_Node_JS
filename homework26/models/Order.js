const mongoose = require('mongoose')

const orderItemsSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Product',
        required:true
    },
    quantity: {type: Number, required: true},
    priceAtPurchase: {type: Number, required: true},
})

const orderSchema = new mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId, ref:'User', required:true},
    items: [orderItemsSchema],
    total:{type:Number,required:true},
    status: {type: String,enum: ['pending','paid','shipped','cancelled'],default:'pending',required:true},
    createdAt: {type: Date, default: Date.now},
})

orderSchema.pre('save', async function (next) {
    if(!this.isModified('user')) return next();
    try {
        const order = await this.constructor.findOne({user:this.user});
        if(order) return next(new Error('Order already exists'));
        return next();
    }
    catch (error) {
        next(error);
    }
})

module.exports = mongoose.model('Order', orderSchema);