// Sequelize model for the "User" table.
// This replaces the old Mongoose schema, but keeps the same field names
// (username, email, password) so the rest of the app doesn't need to change.

const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/db');

// sequelize.define(name, columns) tells Sequelize to create/manage a table
// called "Users" (pluralized automatically) with the columns below.
const User = sequelize.define('User', {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
});
// Note: Sequelize automatically adds an auto-incrementing integer "id"
// primary key column. In MongoDB this was an ObjectId (e.g. "507f1f77...");
// in MySQL it is now a plain integer (e.g. 1, 2, 3...).

// Hash the password before a new user is INSERTed.
// This is the Sequelize equivalent of Mongoose's userSchema.pre('save', ...).
User.beforeCreate(async (user) => {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
});

// Hash the password again if it gets changed during an UPDATE,
// but skip hashing if the password field wasn't touched
// (this mirrors Mongoose's "if (!this.isModified('password')) return next();").
User.beforeUpdate(async (user) => {
    if (user.changed('password')) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
    }
});

// Instance method to compare a plain-text password (from the login form)
// with the hashed password stored in the database.
// Usage is unchanged: user.comparePassword(candidatePassword)
User.prototype.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

module.exports = User;
