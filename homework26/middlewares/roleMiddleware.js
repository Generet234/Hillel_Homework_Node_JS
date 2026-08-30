const adminRole = 'admin'
const customerRole = 'customer'

function roleMiddleware(role) {
    return function(req, res, next) {
        if(!req.user) return res.status(404).json({message:'Not Found'})
        if (role !== adminRole) return res.status(403).json({message:'Not Found'})
        next()
    }
}

function customerMiddleware(role) {
    return function(req, res, next) {
        if(!req.user) return res.status(404).json({message:'Not Found'})
        if (role !== customerRole) return res.status(403).json({message:'Not Found'})
        next()
    }
}
module.exports = {roleMiddleware,customerMiddleware};