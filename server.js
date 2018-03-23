require ('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const passport = require('passport');
//router desctructuring assignment with renaming two variables called router
const {router: usersRouter} = require('./users');
const houseRouter = require('./routes/houses');
const {router: authRouter, localStrategy, jwtStrategy} = require('./auth');
const {PORT, DATABASE_URL} = require('./config');
const app = express();

// whatfolder we use where our css files are
app.use(express.static('public'));
app.use('/api/houses', houseRouter);
//CORS
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
    if (req.method === 'OPTIONS') {
      return res.send(204);
    }
    next();
  });

  passport.use(localStrategy);
  passport.use(jwtStrategy);

  // create user,pass
  app.use('/api/users', usersRouter);
  app.use('/api/auth', authRouter);

  const jwtAuth = passport.authenticate('jwt', {session:false});

  app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/public/index.html');
  });

  let server;

  function runServer(databaseUrl, port=PORT) {
      return new Promise((resolve, reject)=> {
          mongoose.connect(databaseUrl, err => {
            if(err){
                return reject(err); 
          }
          server = app.listen(port, ()=>{
              console.log(`Your appis listening on port ${port} `);
              resolve();
              
          })
          .on('error', err =>{
              mongoose.disconnect();
              reject(err);

          });
        });
    });    
  }

  function closeServer(){
      return mongoose.disconnect().then(()=>{
          return new Promise((resolve, reject)=>{
              console.log('Closing server');
              server.close(err =>{
                  if(err){
                      return reject(err);
                  }
                  resolve();
              });
          });
      });
  }

  if(require.main === module){
      runServer(DATABASE_URL).catch(err => console.error(err));
  }
 
  module.exports = {app, runServer, closeServer};