const Products = require('../models/productModel');

const getProducts = async (req, res) => {
    try{
        const products = await Products.find();
        res.status(200).json(products);
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
}

const getProduct = async (req, res) => {
    try{
        const foundedProduct = await Products.findById(req.params.id);
        if (!foundedProduct) res.status(404).json({message: 'Product not found'});
        res.json(foundedProduct);
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
}
const updateProduct = async (req, res) => {
    try{
        const updatedProduct = await Products.findByIdAndUpdate(req.params.id, req.body);
        if(!updatedProduct) res.status(404).json({message: 'Product not found'});
        res.json(updatedProduct);
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
}
const createProduct = async (req, res) => {
    try{
        const {name,price, category,stock} = req.body;
        const newProduct = new Products({name, price, category, stock});
        await newProduct.save();
        res.status(201).json(newProduct);
    }
    catch(err){
        res.status(400).json({message: err.message});
    }
}
const deleteProduct = async (req, res) => {
    try{
        const deletedProduct = await Products.findByIdAndDelete(req.params.id);
        if(!deletedProduct) res.status(404).json({message: 'Product not found'});
        res.json({message: 'Product deleted'});
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
}

module.exports = {deleteProduct,createProduct,updateProduct,getProducts,getProduct};