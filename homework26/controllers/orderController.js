const Order = require('../models/Order.js');
const Product = require('../models/Products.js');

exports.makeOrder = async (req, res) => {
    try{
        const {user, items, status} = req.body;
        const productFromDB = await Product.findById(items.product)
        if(!productFromDB) return res.status(404).send('Not Found');
        const price = productFromDB.price
        const total = price * items.quantity
        if(Product.stock < 0) res.status(400).send({error: `Incorrect stock of the ${items.product}`});
        if(!user || !items || !total || !status){
            return res.status(400).send({error: 'Please enter an user or items or price or total or status'});
        }
        const order = new Order({user, items:{product: items.product,quantity: items.quantity,priceAtPurchase: price }, total, status})
        await order.save();
        return res.status(201).json(order)
    }
    catch(err){
        console.error(err);
        return res.status(500).send({message: 'Something went wrong'});
    }
}

exports.getMyOrders = async (req, res) => {
    try {
        const userId = req.user.id;
        const order = await Order.find({user:userId}).populate("items.product")
        if(!order) {
            return res.status(404).send({message: 'Not Found'});
        }
        return res.status(200).json(order)
    }
    catch(err){
        console.error(err);
        return res.status(500).send({message: 'Something went wrong'});
    }
}

exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({})
            .populate("items.product")
            .populate('user', 'email', 'name')
        if(!orders) {
            return res.status(404).send({message: 'Not Found'});
        }
        return res.status(200).json(orders)
    }
    catch(err){
        console.error(err);
        return res.status(500).send({message: 'Something went wrong'});
    }
}
exports.getMyOrdersById = async (req, res) => {
    try {
        const orderId = req.params.id;
        const order = await Order.findById(orderId)
            .populate("items.product")
            .populate('user', 'email', 'name')
        if(!order) {
            return res.status(404).send({message: 'Not Found'});
        }
        return res.status(200).json(order)
    }
    catch(err){
        console.error(err);
        return res.status(500).send({message: 'Something went wrong'});
    }
}
exports.getStatus = async (req, res) => {
    try{
        const orderId = req.params.id;
        const order = await Order.findById(orderId)
        if(!order) {
            return res.status(404).send({message: 'Not Found'});
        }
        return res.status(200).json({status: order.status})
    }
    catch(err){
        console.error(err);
        return res.status(500).send({message: 'Something went wrong'});
    }
}