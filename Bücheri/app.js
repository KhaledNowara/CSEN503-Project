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

function predict_wrong_input(wrong_input, predictions) {
  var wrong_input_predictions = [];
  for (var key in predictions) {
    var intersection = 0;
    for (let a of (new Set(wrong_input))) {
      if ((new Set(key)).has(a)) {
        intersection++;
      }
    }
    var percentage = intersection / wrong_input.length;
    if (percentage > 0.6) {
      wrong_input_predictions.push(key);
    }
  }
  return wrong_input_predictions;
};

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

//implement logout post request
app.post('/logout', (req, res) => {
  res.render('login.ejs');
  //TODO: implement logout
});

//search for books post request and try to predict misspelled words then render the search results
app.post('/search', (req, res) => {
  var search = req.body.Search;
  var readBooks = fs.readFileSync("books.json");
  var booksList = JSON.parse(readBooks);
  var result = new Set();
  for (var key in booksList){
    if (key.toLowerCase().includes(search.toLowerCase())){
      result.add(key);
    }
  }
  var predictions = predict_wrong_input(search, booksList)
  for (var a of predictions){
    result.add(a);
  }
  var json_result = {};
  if (result.size == 0){
    json_result = {"No Results Found": "/home"};
  }
  else {
    for (var key of result){
      json_result[key] = booksList[key];
    }
  }
  res.render('searchresults.ejs', {results: json_result});
  
});

app.listen(3000);
