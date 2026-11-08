const User = require('../models/User');
const UserSettings = require('../models/UserSettings');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

exports.register = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Вкажіть ім’я користувача, email та пароль' });
        }
        // Check whether a user with this email OR username already exists.
        // Sequelize's Op.or is the equivalent of Mongoose's $or operator.
        const existingUser = await User.findOne({
            where:{email}
        });
        if (existingUser) {
            return res.status(400).json({ message: 'Користувач з такими даними вже існує' });
        }

        // User.create() inserts a new row and runs the beforeCreate hook,
        // which hashes the password (see models/User.js).
        const user = await User.create({ email, password });

        // Generate a JWT token. Sequelize uses "id" (an integer) instead of
        // Mongoose's "_id" (an ObjectId), but the rest of the token logic is unchanged.
        const token = jwt.sign({ id: user.id }, config.jwtSecret, { expiresIn: '1h' });
        return res.status(201).json({ token, user: { id: user.id, email } });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Помилка сервера' });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Вкажіть email та пароль' });
        }
        // Look up the user by email. "where" is how Sequelize filters rows,
        // similar to passing a filter object directly to Mongoose's findOne.
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ message: 'Невірні дані для входу' });
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Невірні дані для входу' });
        }

        const token = jwt.sign({ id: user.id }, config.jwtSecret, { expiresIn: '1h' });
        return res.status(200).json({ token, user: { id: user.id, email: user.email } });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Помилка сервера' });
    }
};


exports.getUserById = async (req, res) => {
    try {
        // findOne with both the post id and the owner in "where" makes sure a user
        // can only fetch their own posts, not someone else's.
        const user = await User.findOne({ where: { id: req.params.id, owner_id: req.userId } });
        if (!user) {
            return res.status(404).json({ message: 'Пост не знайдено' });
        }
        return res.status(200).json(user);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Помилка сервера' });
    }
};

exports.getSettingsById = async (req, res) => {
    try {
        const userSettings = await UserSettings.findAll({ where: { user_id: req.params.id } });
        return res.status(200).json(userSettings);
    }
    catch (err) {
            console.error('ПОДРОБНАЯ ОШИБКА:', err);
            res.status(500).json({ message: "Помилка сервера", details: err.message });

    }
}
exports.addSettingsById = async (req, res) => {
    try {
        const {attributes, settingsName} = req.body;
        if(!attributes || !settingsName) {
            return res.status(400).json({ message: 'Вкажіть ім`я атрибуту та значення атрибуту' });
        }
        const newSettings = await UserSettings.create( { attributes: attributes, settingsName: settingsName, user_id: req.params.id } );
        return res.status(201).json(newSettings);
    }
    catch (err) {
        console.error('ПОДРОБНАЯ ОШИБКА:', err);
        res.status(500).json({ message: "Помилка сервера", details: err.message });
    }
}

