
const mongoose = require('mongoose');
const {DATABASE_URL} = require('../config');
const {HouseLog} = require('../models/houses');

const logSeed = require('../db/houses.json');

mongoose.connect(DATABASE_URL)
    .then(function() {
        return mongoose.connection.db.dropDatabase();
    }).then(function() {
        return HouseLog.insertMany(logSeed);
    }).then(function() {
        return mongoose.disconnect();
    }).catch(err => {
        console.error(err.message);
    });