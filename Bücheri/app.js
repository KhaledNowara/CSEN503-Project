
// initiating dependencies
//--------------------------------------------------------------------------
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser') // import cookie parser module to use cookies for maintaining user sessions
// npm install cookie-parser
const fs = require('fs');
const app = express();
// khaled says: changed vars to consts because 

//One time files creations, should only be run once in the servers life time to create the files 
//fs.writeFileSync("users.json", JSON.stringify([]));
// fs.writeFileSync("Cookies")



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser()); // to make the server instance parse cookies from incoming requests 

function cookieValidator (req,res,next){
  var { cookies } = req
  console.log("first");
    //check out for cookie validity 
    // if not valid go to home page
    // var usersList = readCreate("users.json");

    // var cookie = usersList.find(element => element.cookies.find(cook =>cook === cookeis )) // search for the cookie in all cookies assigned for each user 
    if("session.id" in cookies){
      console.log(cookies)
      console.log("here")
      next();
    }
    else{ 
    res.redirect('/login');
    res.end();
    console.log("Hello World");
  
    
    
    }
}


// make the home page the main page
// call the cookieValidator function before performing the request
app.get('/',cookieValidator,function(req,res){
  res.render('home.ejs');
});


  app.get('/fiction',cookieValidator,function(req,res){
  res.render('fiction.ejs');
});

app.get('/dune',cookieValidator,function(req,res){
  res.render('dune.ejs');
});

app.get('/mockingbird',cookieValidator,function(req,res){
  res.render('mockingbird.ejs');
});

app.get('/novel',cookieValidator,function(req,res){
  res.render('novel.ejs');
});

app.get('/flies',cookieValidator,function(req,res){
  res.render('flies.ejs');
});

app.get('/grapes',cookieValidator,function(req,res){
  res.render('grapes.ejs');
});

app.get('/poetry',cookieValidator,function(req,res){
  res.render('poetry.ejs');
});

app.get('/sun',cookieValidator,function(req,res){
  res.render('sun.ejs');
});

app.get('/leaves',cookieValidator,function(req,res){
  res.render('leaves.ejs');
});
app.get('/registration',function(req,res){
  res.render('registration.ejs');
});

app.get('/login',function(req,res){
  res.render('login.ejs');
});


app.post('/login',function(req, res){
var username = req.body.username;
var password = req.body.password;
var usersList = readCreate("users.json");
var user = usersList.find(element => element.username  === username && password == element.password)
if (user){
  res.redirect('/');
  res.end();
}

});

app.post('/register', (req, res) => {
  var username = req.body.username;
  var password = req.body.password;
  var cookie = makeid();
  // read json files
  var usersList = readCreate("users.json");
  let newUser = {
  "username": username,
  "password": password,
  "Cookies": [cookie]
  }

  var user = usersList.find(element => element.username  === username)
  //Checking if user already exists,  
  if (user)
     throw 'Username Already Registered!';
    // handle existing users
  
    usersList.push(newUser);
    fs.writeFileSync("users.json", JSON.stringify(usersList));
    res.cookie("session.id",cookie)
    console.log(cookie);
    res.redirect('/');
    res.end();
  
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
    json_result = {"No Results Found": "/"};
  }
  else {
    for (var key of result){
      json_result[key] = booksList[key];
    }
  }
  res.render('searchresults.ejs', {results: json_result});
  
});

//Helper functions 
// ---------------------------------------------------------------------------------
//read and parse json files, creates a new file if empty
function readCreate (file_name){
  try{
    var file = fs.readFileSync(file_name);
    }
  catch(err){
      fs.writeFileSync(file_name, JSON.stringify([]));
      var file = fs.readFileSync(file_name);
  }
  finally{
    return JSON.parse(file);
  }
}

//cookie id generator
function makeid() {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=?><:~|';
  var charactersLength = characters.length;
  for ( var i = 0; i < 15; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
 }
 return result;
}
//  
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

app.listen(3000);
