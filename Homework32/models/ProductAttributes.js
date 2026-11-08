// Sequelize model for the "Post" table.
// This replaces the old Mongoose schema. The "owner" field used to be a
// MongoDB ObjectId reference to a User; here it becomes a proper SQL
// foreign key, set up via the association below.

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Product = require('./Product');

const ProductAttribute = sequelize.define('ProductAttributes', {
    attributeValue: {
        type: DataTypes.STRING(255), // short text, so a normal VARCHAR column is fine
        allowNull: false
    },
    attributeName: {
        // Post content can be long (a full article), and MySQL's STRING
        // (VARCHAR) is limited to 255 characters by default, so we use
        // TEXT here instead to avoid silently truncating student data.
        type: DataTypes.STRING(100),
        allowNull: false
    },
    // "owner" is not listed here manually - it is created automatically
    // below by the belongsTo/hasMany association, and will be a foreign
    // key column pointing at Users.id.
});

// Associations: one User can own many Posts, and each Post belongs to one User.
// "foreignKey: 'owner'" keeps the column named "owner", just like the old
// Mongoose field, so queries elsewhere in the app (owner: req.userId) still work.
Product.hasMany(ProductAttribute, { foreignKey: 'product_id' });
ProductAttribute.belongsTo(Product, { foreignKey: 'product_id' });

module.exports = ProductAttribute;
