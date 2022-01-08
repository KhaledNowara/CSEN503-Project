var express = require('express');
var path = require('path');
var fs = require('fs');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/',function(req,res){
  res.render('login.ejs');
});

app.get('/fiction',function(req,res){
  res.render('fiction.ejs');
});

app.get('/dune',function(req,res){
  res.render('dune.ejs');
});

app.get('/mockingbird',function(req,res){
  res.render('mockingbird.ejs');
});

app.get('/novel',function(req,res){
  res.render('novel.ejs');
});

app.get('/flies',function(req,res){
  res.render('flies.ejs');
});

app.get('/grapes',function(req,res){
  res.render('grapes.ejs');
});

app.get('/poetry',function(req,res){
  res.render('poetry.ejs');
});

app.get('/sun',function(req,res){
  res.render('sun.ejs');
});

app.get('/leaves',function(req,res){
  res.render('leaves.ejs');
});

app.get('/registration',function(req,res){
  res.render('registration.ejs');
});

app.get('/home',function(req,res){
  res.render('home.ejs');
});

app.post('/',function(req, res){
var username = req.body.username;
var password = req.body.password;

});

app.post('/register', (req, res) => {
  var username = req.body.username;
  var password = req.body.password;
  let newUser = {
  "username": username,
  "password": password
  }
  var readUsers = fs.readFileSync("users.json");
  var checker = -1;
  //Checking if user already exists, Checking if users.json not empty so JSON.parse doesn't fail
  if (readUsers != ""){
    var usersList = JSON.parse(readUsers);
    checker = 0;
    for (var i=0; i < usersList.length ; i++){
      if (newUser.username ==usersList[i].username) {checker = 1;}}
  }
  //Writing to the users.json if it is not empty
  if(checker == 0){
    var usersList = JSON.parse(readUsers);
    usersList.push(newUser);
    fs.writeFileSync("users.json", JSON.stringify(usersList));
  }
  //Writing to the users.json if it is empty
  else if(checker ==-1) {fs.writeFileSync("users.json", JSON.stringify([newUser]))}
  //If User already exists (checker = 1)
  else throw 'Username Already Registered!';
});

app.listen(3000);
