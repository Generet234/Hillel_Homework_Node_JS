const email = process.env.ADMIN_EMAIL
const password = process.env.ADMIN_PASSWORD
const name = process.env.ADMIN_NAME
const role = process.env.ADMIN_ROLE
const User = require('../models/User');

async function createAdminFunction(req, res, next) {
    if (!email || !password) {
        return res.status(400).send({message: 'Email and password is required'})
    }
    try{
        const existingAdmin = await User.findOne({email:email})

        if(existingAdmin){
            return next()
        }
        const newAdmin = new User({
            email: email,
            name: name,
            role: role,
            password: password,
        })
        await newAdmin.save()
        return next()
    }
    catch(err){
        return res.status(500).json({message: 'Something went wrong'})
    }
}

module.exports = createAdminFunction