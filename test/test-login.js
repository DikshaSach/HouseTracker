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


describe('Auth endpoints', function(){
    const username = 'exampleUser@test.com';
    const password = 'examplePass';
    before(function(){
        return runServer(TEST_DATABASE_URL);
    });
    after(function(){
        return closeServer();

    });
    beforeEach(function(){
        return User.hashPassword(password).then(password =>
        User.create({
            username, 
            password
        }));
    });
    afterEach(function(){
        return User.remove({});
    });

    describe('/api/auth/login', function(){
        it('should reject request with no credentials', function(){
            return chai.request(app)
            .post('/api/auth/login')
            .then(()=>
                expect.fail(null, null, 'request shouldnt succeed')
        )
        .catch(err =>{
            if(err instanceof chai.AssertionError){
                throw err;
                
            }
            const res = err.response;
            expect(res).to.have.status(400);
        });
        });
        it('should return valid auth token', function(){
            return chai.request(app)
            .post('/api/auth/login')
            .send({username, password})
            .then(res =>{
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                const token = res.body.authToken;
                expect(token).to.be.a('string');
             });
        });
        //
    });
});
 