
// initiating dependencies
//--------------------------------------------------------------------------
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser') // import cookie parser module to use cookies for maintaining user sessions
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

app.listen(3000);
