'use strict'
const mongoose = require('mongoose');

const houseSchema = mongoose.Schema ({
    name: {type: String, required: true},
    price: {type: String},
    location: {type: String},  
    details: {type: String},
    creator: {type: mongoose.Schema.ObjectId, required: true},
    image: {
        type: String,
        
      }
});

houseSchema.methods.serialize = function(){
    return { 
        name: this.name,
        price: this.price,
        location: this.location,
        details: this.details,
        creator: this.creator,
        image: this.image
    }
}

const HouseLog = mongoose.model('HouseLog', houseSchema);
module.exports = {HouseLog};