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

describe('/api/users', function(){
    const username = 'exampleUser';
    const password = 'examplePass';

    before(function() {
        return runServer(TEST_DATABASE_URL);
      });
    
      after(function() {
        return closeServer();
      });
    
      beforeEach(function() {});
    
      afterEach(function() {
        return User.remove({});
      });
      describe('/api/users', function(){
          describe('POST', function(){
            
          it('should create a  new user', function(){
              return chai.request(app)
              .post('/api/users')
              .send({
                  username,
                  password
              })
              .then(res =>{
                  expect(res).to.have.status(201);
                  expect(res.body).to.be.an('object');
                  return User.findOne({
                      username
                  });
              });
            
          });
        });
    });
});