const Product = require('../models/Product');
const ProductAttribute = require('../models/ProductAttributes');

exports.createProduct = async (req, res) => {
    try {
        const { name, description, price } = req.body;
        if (!name || !description || !price) {
            return res.status(400).json({ message: 'Вкажіть заголовок та контент посту' });
        }

        const product = await Product.create({ name, description,price,owner_id: req.userId });
        return res.status(201).json(product);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Помилка сервера' });
    }
};
exports.getAttributesById = async (req, res) => {
    try {
        const productAttributes = await ProductAttribute.findAll({ where: { product_id: req.params.id } });
        return res.status(200).json(productAttributes);
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({message:' Помилка сервера'})
    }
}
exports.addAttributesById = async (req, res) => {
    try {
        const {attributeName, attributeValue} = req.body;
        if(!attributeName || !attributeValue) {
            return res.status(400).json({ message: 'Вкажіть ім`я атрибуту та значення атрибуту' });
        }
        const attributes = await ProductAttribute.create({ attributeName: attributeName, attributeValue: attributeValue, id: req.params.id } );
        return res.status(201).json(attributes);
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({message: 'Помилка сервера'})
    }
}
exports.getProducts = async (req, res) => {
    try {
        const products = await Product.findAll({ where: { owner_id: req.userId } });
        return res.status(200).json(products);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Помилка сервера' });
    }
};

exports.getProductById = async (req, res) => {
    try {
        // findOne with both the post id and the owner in "where" makes sure a user
        // can only fetch their own posts, not someone else's.
        const product = await Product.findOne({ where: { id: req.params.id, owner_id: req.userId } });
        if (!product) {
            return res.status(404).json({ message: 'Пост не знайдено' });
        }
        return res.status(200).json(product);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Помилка сервера' });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const { name, description, price } = req.body;

        // Sequelize has no direct "findOneAndUpdate" that returns the updated row,
        // so we fetch the post first, then change its fields, then save it.
        const product = await Product.findOne({ where: { id: req.params.id, owner_id: req.userId } });
        if (!product) {
            return res.status(404).json({ message: 'Пост не знайдено' });
        }

        // Only update fields that were actually provided in the request body,
        // same behavior as before (sending an empty title/content won't wipe the old value).
        if (name !== undefined) product.name = name;
        if (description !== undefined) product.description = description;
        if(price !== undefined) product.price = price;
        await product.save();

        return res.status(200).json(product);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Помилка сервера' });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findOne({ where: { id: req.params.id, owner_id: req.userId } });
        if (!product) {
            return res.status(404).json({ message: 'Пост не знайдено' });
        }
        // destroy() deletes this row from the database.
        await product.destroy();
        return res.status(200).json({ message: 'Пост успішно видалено' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Помилка сервера' });
    }
};
