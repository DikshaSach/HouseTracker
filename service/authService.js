const jwt = require('jsonwebtoken');
const config = require('../config');

function AuthService(){
    this.createAuthToken = function(user){
        return jwt.sign({user}, config.JWT_SECRET, {
            subject: user.username,
            expiresIn: config.JWT_EXPIRY,
            algorithm: 'HS256'
        });
    }
    this.decodeAuthToken = function(token){
        return jwt.verify(token, config.JWT_SECRET);
    }
}

module.exports = new AuthService();