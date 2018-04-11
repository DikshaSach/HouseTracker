'use strict';
require('dotenv').config();
const mongoose = require('mongoose');
const {HouseLog} = require('../houses/models');
const jwt = require('jsonwebtoken');
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const should = chai.should();
const config = require('../config');
const {app, runServer, closeServer} = require('../server');
const {TEST_DATABASE_URL} = require('../config');
const testData = require('../testdata.json')
chai.use(chaiHttp);

function tearDownDb() {
    console.warn('Deleting database!');
    return mongoose.connection.db.dropDatabase();
}
/*
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
*/
function tearDownDb() {
    console.warn('Deleting database!');
    return mongoose.connection.db.dropDatabase();
}
const createAuthToken = user => {
    return jwt.sign({user}, config.JWT_SECRET, {
        subject: user.username,
        expiresIn: config.JWT_EXPIRY,
        algorithm: 'HS256'
    });
};
const testing_user = {
    "username": "testing",
    "password": "1234567890",
    "id": "5abc46efa9b3151a74b374cc"
}
const user_token = createAuthToken(testing_user);
describe('HouseLogs', function(){
    before(function(){
        return runServer(TEST_DATABASE_URL);
    });
    beforeEach(function (){
        return HouseLog.insertMany(testData);
    });
    afterEach(function(){
        return tearDownDb();
    });
    after(function(){
        return closeServer();
    });

describe('get endpoint', function(){
    it('should return all house posts', function(){
        let res;
        return chai.request(app)
        .get('/api/houses')
        .set('Authorization', 'Bearer ${user_token}')
        .then(function(_res){
            res = _res;
            expect(res).to.be.status(200);
            expect(res).to.be.json;
            expect(res.body).to.be.a('array');
            expect(res.body).to.have.lengthOf.at.least(1);
        })
    });
    describe('POST endpoint', function() {
        it('should add a new House post', function(done) {
            
        const newPost = {
            "name": "house99",
            "price": "$900,0000",
            "location": "1 Crown Ave Huntington, NY 1174dfsdf3",
            "creator": "5abc46efa9b3151a74b374cc",
            "details": "Trains.",
            "garage": "Yes",
            "heating": "Central",
            "pool": "Yes",
            "cooling": "Other",
           "rating": "5",
            "bathroom": "3",
            "bedroom": "3"
        }

        return chai.request(app)
            .post('/api/houses')
            .set('Authorization', 'Bearer ${user_token}')
            .send(newPost)
            .then(function(res) {
                expect(res).to.be.status(201);
                expect(res).to.be.json;
                expect(res.body).to.be.a('object');
                expect(res.body.name).to.equal(newPost.name);
                expect(res.body.creator).to.equal(newPost.creator);
                expect(res.body.location).to.equal(newPost.location);
                expect(res.body.price).to.equal(newPost.price);
                expect(res.body.details).to.equal(newPost.details);
                expect(res.body.garage).to.equal(newPost.garage);
                expect(res.body.heating).to.equal(newPost.heating);
                expect(res.body.cooling).to.equal(newPost.cooling);
                expect(res.body.pool).to.equal(newPost.pool);
                expect(res.body.rating).to.equal(newPost.rating);
                expect(res.body.bedroom).to.equal(newPost.bedroom);
                expect(res.body.bathroom).to.equal(newPost.bathroom);
               return HouseLog.findById(res.body._id);
            })

    // we retrieve new post from the db and compare its data to the data we sent over
        .then(function(post) {
            expect(post.creator.toString()).to.equal(newPost.creator);
            expect(post.details).to.equal(newPost.details);
            expect(post.name).to.equal(newPost.name);
            expect(post.price).to.equal(newPost.price);
            expect(post.bedroom).to.equal(newPost.bedroom);
            expect(post.bathroom).to.equal(newPost.bathroom);
            expect(post.location).to.equal(newPost.location);
            expect(post.garage).to.equal(newPost.garage);
            expect(post.heating).to.equal(newPost.heating);
            expect(post.cooling).to.equal(newPost.cooling);
            expect(post.pool).to.equal(newPost.pool);
            expect(post.rating).to.equal(newPost.rating);
            
            });
            
        });
    });
    describe('DELETE endpoint', function() {
        it('should delete a sleep log post', function() {
            let log;
            return HouseLog
                .findOne()
                .then(function(_log) {
                    log = _log;
                    return chai.request(app)
                    .delete(`/api/houses/${log._id}`)
                    .set('Authorization', `Bearer ${ user_token }`)
                })
                .then(function(res) {
                    expect(res).to.have.status(204);
                    return HouseLog.findById(log._id);
                })
                .then(function(_log) {
                    expect(_log).to.be.null;

                });
        });
        describe('PUT endpoint', function() {
            it('should update the fields you send over', function() {
                const toUpdate = {
                    details: 'This house is nice.',
                    location: '123 abcst'
                }
    
            return HouseLog
                .findOne()
                .then(post => {
                    toUpdate._id = post._id;
            
            return chai.request(app)
                .put(`/api/houses/${post._id}`)
                .set('Authorization', `Bearer ${ user_token }`)
                .send(toUpdate);
            })
            .then(res => {
                expect(res).to.have.status(204);
                return HouseLog.findById(toUpdate._id);
            }) 
    
        // we retrieve the update post from db and prove the post in db is equal to the updated values we sent over   
            .then(post => {
                expect(toUpdate.details).to.equal(post.details);
                expect(toUpdate.location).to.equal(post.location);
            });
            });
        });
        
    
    
});
});

});