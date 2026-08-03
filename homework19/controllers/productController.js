const Products = require('../models/productModel');
const mongoose = require('mongoose');

const getProducts = async (req, res,next) => {
        const products = await Products.find();
        let cacheTime = null
        let cacheDuration = 30 * 1000
        let cachedProducts = null
        const currentTime = Date.now();
        if(cachedProducts && cacheTime && (currentTime - cacheTime < cacheDuration)) {
            console.log('Дані повернуто з кешу')
            return res.status(200).json(cachedProducts);
        }
        if(!products || !products.length) {
            const error = new Error('Products not found');
            error.status = 404;
            return next(error)
        }
        cachedProducts = products;
        cacheTime = currentTime;
        res.status(200).json(products);
}

const getProduct = async (req, res,next) => {
        if(!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).send({message: 'Id is not valid'});
        const foundedProduct = await Products.findById(req.params.id);
        if (!foundedProduct) {
            const error = new Error('Product not found');
            error.status = 404;
            return next(error)
        }
        res.json(foundedProduct);
}
const updateProduct = async (req, res,next) => {
        if(!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).send({message: 'Id is not valid'});
        const updatedProduct = await Products.findByIdAndUpdate(req.params.id, req.body,{ new: true });
        if(!updatedProduct) {
            const error = new Error('Product not updated');
            error.status = 404;
            return next(error)
        }
        res.json(updatedProduct);
}
const createProduct = async (req, res,next) => {
        const {name,price, category,stock} = req.body;
        if(!name || !price || !category ) {
            const error = new Error('Product not created');
            error.status = 400;
            return next(error)
        }
        const newProduct = new Products({name, price, category, stock});
        await newProduct.save();
        res.status(201).json(newProduct);
}
const deleteProduct = async (req, res,next) => {
        if(!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).send({message: 'Id is not valid'});
        const deletedProduct = await Products.findByIdAndDelete(req.params.id,{ new: true });
        if(!deletedProduct){
            const error = new Error('Product not deleted');
            error.status = 404;
            return next(error)
        }
        res.json({message: 'Product deleted'});
}

module.exports = {deleteProduct,createProduct,updateProduct,getProducts,getProduct};