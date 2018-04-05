const {HouseLog} = require('../houses/models');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
function verifyHouse(houseObj){
    const requiredFields = ['name', 'creator', 'location', 'price', 'details', 'garage', 'heating', 'cooling', 'pool'];
    for (let i=0; i<requiredFields.length; i++) {
        const field = requiredFields[i];
        if (!(field in houseObj)) {
           return 'Missing \`${field}\` in request body';
        }
    }
}
function verifyIDS(paramid, bodyid){
    if(!(paramid && bodyid === bodyid)){
        return 'Request path id and request body id dont match';
    };

}

function HouseService(){
    this.create = function(houseObj){
        return new Promise(async (resolve,reject) => {
            let valid = verifyHouse(houseObj);
            if(valid != null){
                reject(valid);
                return;
            }
            let{name, price, location, creator, details, bedroom, bathroom, garage, heating, pool, cooling, image} = houseObj;
            
            let newHouse = await HouseLog
            .create({
                name,
                price,
                location,
                creator,
                details,
                bedroom,
                bathroom,
                garage,
                heating,
                pool,
                cooling,
                image
            });
            resolve(newHouse);
        });
    }
this.remove = function(id){
    return new Promise(async (resolve,reject) => {
    let deleteHouse = await HouseLog
    .findByIdAndRemove(id);
    resolve(deleteHouse);
    });
    
}
this.update = function(id, house){
    return new Promise(async (resolve,reject) => {
        
        /// HOW TO DO CHECK?
    const updated = {};
    const updatableFields = ['name', 'price', 'location', 'details', 'image', 'garage', 'heating', 'cooling', 'pool', 'bedroom', 'bathroom'];
    updatableFields.forEach(field => {
        if (field in house) {
            updated[field] = house[field];
        }
    });
    
    let updatedHouse = HouseLog
    .findByIdAndUpdate(id,  {$set: updated}, {new: true});
    resolve(updatedHouse);

});
}
}

module.exports = new HouseService();