'use strict'
const mongoose = require('mongoose');

const houseSchema = mongoose.Schema ({
    name: {type: String, required: true},
    price: {type: String},
    location: {type: String},  
    creator: {type: mongoose.Schema.ObjectId, required: true}
});

houseSchema.methods.serialize = function(){
    return { 
        name: this.name,
        price: this.price,
        location: this.location,
        creator: this.creator 
    }
}

const HouseLog = mongoose.model('HouseLog', houseSchema);
module.exports = {HouseLog};