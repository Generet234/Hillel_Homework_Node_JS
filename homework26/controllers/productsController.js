const Product = require('../models/Products.js');
const mongoose = require('mongoose');

exports.createProduct = async (req, res) => {
    try{
        const {title, description, price, stock, category} = req.body;
        if(!title || !description || !price || !stock || !category){
            return res.status(400).send({error: 'Please enter a title or description or price or category or stock'});
        }
        const product = new Product({title, description, price, stock, category})
        await product.save();
        return res.status(201).json(product)
    }
    catch(err){
        console.error(err);
        return res.status(500).send({message: 'Something went wrong'});
    }
}

exports.getProducts = async (req, res) => {
    try {
        const page = req.query.page
        const limit = req.query.limit
        let filter = {}
        const category = req.query.category
        if(category){
            filter.category = category
        }
        const offset = (page - 1) * limit
        const products = await Product.find(filter).skip(offset).limit(limit)
        return res.status(200).json(products);
    }
    catch(err){
        console.error(err);
        return res.status(500).send({message: 'Something went wrong'});
    }
}

exports.getProductById = async (req, res) => {
    try{
        if(!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).send({error: 'Please enter a valid id'});
        const product = await Product.findOne({_id:req.params.id});
        if(!product){
            return res.status(404).send({message: 'Not Found'});
        }
        return res.status(200).json(product);
    }
    catch(err){
        console.error(err);
        return res.status(500).send({message: 'Something went wrong'});
    }
}
exports.updateProduct = async (req, res) => {
    try{
        const {title, description, price, stock, category} = req.body;
        if(!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).send({error: 'Please enter a valid id'});
        const product = await Product.findOneAndUpdate({_id:req.params.id},{title, description, price, stock, category}, {new: true});
        if(!product){
            return res.status(404).send({message: 'Not updated'});
        }
        return res.status(200).json(product);
    }
    catch(err){
        console.error(err);
        return res.status(500).send({message: 'Something went wrong'});
    }
}
exports.deleteProduct = async (req, res) => {
    try{
        if(!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).send({error: 'Please enter a valid id'});
        const deletedProduct = await Product.findByIdAndDelete(req.params.id, {new: true});
        if(!deletedProduct){
            return res.status(404).send({message: 'Not Found'});
        }
        return res.status(200).json(deletedProduct);
    }
    catch(err){
        console.error(err);
        return res.status(500).send({message: 'Something went wrong'});
    }
}