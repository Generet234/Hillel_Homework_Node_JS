const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true, minlength: [8, 'Password must be at least 8 characters']},
    name: {type: String, required: true, unique: true},
    role:{type: String}
})

userSchema.pre('save', async function (next) {
    if(!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    }
    catch (error) {
        next(error);
    }
})

userSchema.methods.comparePassword = async function (passwordToCompare) {
    return bcrypt.compare(passwordToCompare, this.password);
}
module.exports = mongoose.model('User', userSchema);