// Sequelize model for the "Post" table.
// This replaces the old Mongoose schema. The "owner" field used to be a
// MongoDB ObjectId reference to a User; here it becomes a proper SQL
// foreign key, set up via the association below.

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');

const Product = sequelize.define('Product', {
    name: {
        type: DataTypes.STRING, // short text, so a normal VARCHAR column is fine
        allowNull: false
    },
    description: {
        // Post content can be long (a full article), and MySQL's STRING
        // (VARCHAR) is limited to 255 characters by default, so we use
        // TEXT here instead to avoid silently truncating student data.
        type: DataTypes.TEXT,
        allowNull: false
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    owner_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'Users',
            key: 'id'
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
    }
    // "owner" is not listed here manually - it is created automatically
    // below by the belongsTo/hasMany association, and will be a foreign
    // key column pointing at Users.id.
}, {
    timestamps: true // adds createdAt and updatedAt columns, same as Mongoose's { timestamps: true }
});

// Associations: one User can own many Posts, and each Post belongs to one User.
// "foreignKey: 'owner'" keeps the column named "owner", just like the old
// Mongoose field, so queries elsewhere in the app (owner: req.userId) still work.
User.hasMany(Product, { foreignKey: 'owner_id' });
Product.belongsTo(User, { foreignKey: 'owner_id' });

module.exports = Product;
