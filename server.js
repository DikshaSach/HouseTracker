require ('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const HouseService = require('./service/houseService');
const authService = require('./service/authService');
const passport = require('passport');
//router desctructuring assignment with renaming two variables called router
const {router: usersRouter} = require('./users');
const session = require('express-session');
const houseRouter = require('./houses/router');
const {router: authRouter, localStrategy, jwtStrategy} = require('./auth');
const {PORT, DATABASE_URL} = require('./config');
var favicon = require('serve-favicon');
const app = express();


app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
  }));
  app.use(favicon(__dirname + '/public/images/favicon.ico'));

app.use(passport.initialize());
app.use(passport.session());
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
  
  // create user,pass
  app.use('/api/users', usersRouter);
  app.use('/api/auth', authRouter);
  

  const jwtAuth = passport.authenticate('jwt', {session:false});

  function isLoggedIn (req, res, next) {
    // if req.session.token exists then user is logged in.
    if (req.session.token) {
        let decoded = authService.decodeAuthToken(req.session.token)
        if (decoded === null){
            res.redirect('/signin');
        }
        req.user = decoded.user;
        return next();
    } else{
        return next();
    }
  }
  
 
  
  app.get('/', (req, res)=>{
    res.render(__dirname + '/views/index.ejs');
  });

app.set('view engine', 'ejs');

app.get('/signin', (req, res,) =>{
    res.render('signin.ejs');
  });
app.get('/house/:id', isLoggedIn, async (req, res)=>{
    let house = await HouseService.get(req.params.id);
    if(req.user === undefined){
        res.render('shareHouse.ejs', {house: house});
    }else if(req.user.id === house[0].creator.toString()){
        res.render('house.ejs', {house: house});
    } else{
        res.render('shareHouse.ejs', {house: house});
    }
});
app.get('/logOut', (req, res) =>{
req.logout()
res.clearCookie('connect.sid');
res.redirect('/');

})

app.get('/houseList/:id',  isLoggedIn, async (req, res)=>{
    let list = await HouseService.getList(req.params.id);
    url = req.params.id;
    if(req.user === undefined){
        res.render('shareList.ejs', {list: list});
    }
    else if(req.params.id === req.user.id || req.user.id === list[0].creator.toString())
    {
        res.render('houseList.ejs', {list: list,
            url});
        }
        else{
            res.render('shareList.ejs', {list: list, user: req.params.id});
        }

});
app.get('/hothouses', isLoggedIn, async(req,res)=>{
    let list = await HouseService.getHotHouses(req.params.id);
    res.render('hothouses.ejs', {list: list, url});
})
app.get('/about',  async (req, res)=>{
    url = req.params.id;
    res.render('about.ejs', url);
});

app.get('/register', (req, res) =>{
    res.render('register.ejs');
});
app.get('/browse', async (req, res)=>{
    let list= await HouseService.browseHouses();

    res.render('browseHouses.ejs',{list:list});
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