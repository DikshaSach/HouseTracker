'use strict';

const mongoose = require('mongoose');
const {User} = require('../users/models');

const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const should = chai.should();

const {app, runServer, closeServer} = require('../server');
const {TEST_DATABASE_URL} = require('../config');

chai.use(chaiHttp);

const createAccountCredentials = {
    "username": "Dikshas",
    "password": "Diksha12345"
}

const loginCredentials = {
    "username": "Dikshas",
    "password": "Diksha12345",
    "id": "41224d776a326fb40f000001"
}

function tearDownDb() {
    console.warn('Deleting database!');
    return mongoose.connection.db.dropDatabase();
}

describe('Create Account, Login and Check Token', function() {
    before(function() {
        return runServer(TEST_DATABASE_URL);
    });

    beforeEach(function() {
        return User.create(createAccountCredentials);
    });

    afterEach(function() {
        return tearDownDb();
    });

    after(function() {
        return closeServer();
    });
   
describe('/POST Create Account', function() {
    it('should create account, login, and check authToken', function() {
        chai.request(app)
        .post('/api/users')
        .send(createAccountCredentials)
        .then((err, res) => {
            res.should.have.status(201);
            expect(res.body.state).to.be.true;
           
        })
    })
});
    let authToken;
    describe('/POST Log in to account', function() {
         it('should log in and receive authToken', function() {
            chai.request(app)
            .post('/api/auth/login')
            .send(loginCredentials)
            .then((err, res) => {
                res.should.have.status(200);
                expect(res.body.state).to.be.true;
                res.body.should.have.property('authToken');
                authToken = res.body.authToken;
            })
        })
    });

    describe('/GET Access and use protected page', function() {
        it('should have access to protected page', function() {
            chai.request(app)
            .get('/api/protected')
            .set('Authorization', `Bearer ${ authToken }`)
            .then((err, res) => {
                res.should.have.status(200);
                expect(res.body.state).to.be.true;
                res.body.data.should.be.an('object');
            })
        })
    });

    describe('/POST To request new JWT', function() {
        it('should give new JWT with a later expiry date', function() {
            chai.request(app)
            .post('/api/auth/refresh')
            .set('Authorization', `Bearer ${ authToken }`)
            .then((err, res) => {
                res.should.have.status(200);
                expect(res.body.state).to.be.true;
                res.body.should.have.property('authToken'); 
            })
        })
    });
});


