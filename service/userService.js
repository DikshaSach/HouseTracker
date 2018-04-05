const {User} = require('../users/models');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;


function UserService(){
    this.create = function(userObj){
        return new Promise(async (resolve,reject) => {
    let {username, password, firstName = '', lastName = ''} = userObj;
   
    // username and password come in pre-trimmed, otherwise an error is thrown
    let hash= await User.hashPassword(password);
    let newUser = await User
    .create({
        username,
        password: hash,
        firstName,
        lastName
    });
    resolve(newUser);
        });
    }
    this.isUserAvailable = function(username){
        return new Promise(async (resolve,reject) => {
        let userCount = await User
        .find({username})
        .count()
        .exec();
        if (userCount > 0) {
                resolve(false);
                return;
            }
            resolve(true);
            });
       

    }
}

module.exports = new UserService();
