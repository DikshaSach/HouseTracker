const {HouseLog} = require('../houses/models');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

function verifyHouse(houseObj) {
    const requiredFields = ['name', 'creator', 'location', 'price', 'details', 'garage', 'heating', 'cooling', 'pool', 'rating', 'bedroom', 'bathroom'];
    for (let i = 0; i < requiredFields.length; i++) {
        const field = requiredFields[i];
        if (!(field in houseObj)) {
            return 'Missing \`${field}\` in request body';
        }
    }
}

function verifyIDS(paramid, bodyid) {
    if (!(paramid && bodyid === bodyid)) {
        return 'Request path id and request body id dont match';
    };

}

function HouseService() {
    this.create = function(houseObj) {
        return new Promise(async (resolve, reject) => {
            try {
                let valid = verifyHouse(houseObj);
                if (valid != null) {
                    reject(valid);
                    return;
                }
                let {
                    name,
                    price,
                    location,
                    creator,
                    details,
                    rating,
                    bedroom,
                    bathroom,
                    garage,
                    heating,
                    pool,
                    cooling,
                    image
                } = houseObj;

                let newHouse = await HouseLog
                    .create({
                        name,
                        price,
                        location,
                        creator,
                        details,
                        rating,
                        bedroom,
                        bathroom,
                        garage,
                        heating,
                        pool,
                        cooling,
                        image
                    });

                resolve(newHouse);
            } catch (err) {
                console.log('Error');
                reject('Mongoose Error');
            }
        });

    }
    this.remove = function(id) {
        return new Promise(async (resolve, reject) => {
            let deleteHouse = await HouseLog
                .findByIdAndRemove(id);
            resolve(deleteHouse);
        });

    }
    this.update = function(id, house) {
        return new Promise(async (resolve, reject) => {

            /// HOW TO DO CHECK?
            const updated = {};
            const updatableFields = ['name', 'price', 'location', 'details', 'image', 'garage', 'heating', 'cooling', 'pool', 'bedroom', 'bathroom', 'rating'];
            updatableFields.forEach(field => {
                if (field in house) {
                    updated[field] = house[field];
                }
            });

            let updatedHouse = HouseLog
                .findByIdAndUpdate(id, {
                    $set: updated
                }, {
                    new: true
                });
            resolve(updatedHouse);

        });
    }
    this.get = function(id){
        return new Promise(async (resolve,reject)=>{
            let houseId = HouseLog
            .find({_id: id})
            .exec();
            
            resolve(houseId);
        });
    }
    this.getList = function(id){
        return new Promise(async (resolve,reject)=>{  
            let list = HouseLog
            .find({creator: id})
            .exec();
            resolve(list);
            
    });

}
    this.getHotHouses = function(){
        return new Promise (async (resolve,reject)=>{
            let list = HouseLog
            .find()
            .limit(5)
            .exec();
            resolve(list);
        })
    }
}

module.exports = new HouseService();