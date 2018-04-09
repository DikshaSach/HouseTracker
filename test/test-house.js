'use strict';

const mongoose = require('mongoose');
const {HouseLog} = require('../houses/models');

const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const should = chai.should();

const {app, runServer, closeServer} = require('../server');
const {TEST_DATABASE_URL} = require('../config');

chai.use(chaiHttp);

function tearDownDb() {
    console.warn('Deleting database!');
    return mongoose.connection.db.dropDatabase();
}

const createPost = {
    name: "Test",
    price: '$1',
    details: "Testing details",
    location: "123 abc st NY, 11415",
    garage: "Yes",
    cooling: "central",
    heating: "central",
    bedroom: "1",
    bathroom: "1",
    pool: "Yes",
    creator: "41224d776a326fb40f000001"
}
const updatePost = {
    name: "TestEdit",
    price: '$1Edit',
    details: "Testing details Edit",
    location: "123 abc st NY, 11415Edit",
    garage: "YesEdit",
    cooling: "centralEdit",
    heating: "centralEdit",
    bedroom: "1Edit",
    bathroom: "1Edit",
    pool: "YesEdit",
    creator: "41224d776a326fb40f000001"
}
function tearDownDb() {
    console.warn('Deleting database!');
    return mongoose.connection.db.dropDatabase();
}