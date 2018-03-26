'use strict';

const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const config = require('../config');
const router = express.Router();
// create our JWT and including info about user in payload
const createAuthToken = user => {
    // create a signed JWT
    //first object contains info on user
    return jwt.sign({user}, config.JWT_SECRET, {
        subject: user.username,
        expiresIn: config.JWT_EXPIRY,
        algorithm: 'HS256'
    });
};
// using strategy created in endpoint
// this returns a middleware function and sores ref to middleware function in a variable and passes it to 
// sessions to false to stop passport from adding session cookies
// instead user supplies JWT request in header
const localAuth = passport.authenticate('local', {session: false});
router.use(bodyParser.json());
router.post('/login', localAuth, (req, res) => {
    const authToken = createAuthToken(req.user.serialize());
    req.session.token = authToken;
    res.json({authToken, userID: req.user._id});
});

const jwtAuth = passport.authenticate('jwt', {session: false});

router.post('/refresh', jwtAuth, (req, res) => {
    const authToken = createAuthToken(req.user);
    res.json({authToken, userID: req.user._id});
});

module.exports = {router};