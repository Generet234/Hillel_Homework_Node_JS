require('dotenv').config();

module.exports = {
    port:process.env.PORT || 3000,
    mongoURI: process.env.MONGO_URI || 'mongodb://localhost:27017',
    jwtSecretAccess: process.env.JWT_SECRET_ACCESS || 'your_jwt_secret_access',
    jwtSecretRefresh: process.env.JWT_SECRET_REFRESH || 'your_jwt_secret_refresh',
    jwtExpiresInAccess: process.env.JWT_EXPIRES_IN || '1h',
    jwtExpiresInSecret: process.env.JWT_EXPIRES_IN_SECRET || '30d',
}