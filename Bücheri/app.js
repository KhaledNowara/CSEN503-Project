
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
// fs.writeFileSync("users.json", JSON.stringify({}));
// fs.writeFileSync("usersCookies.json",JSON.stringify({}));
 fs.writeFileSync("usersReads.json",JSON.stringify({}))



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser()); // to make the server instance parse cookies from incoming requests 
app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store')
  next()
})// disables getting back to login or registration
//middelware functions
//-------------------------------------
function cookieValidator (req,res,next){
  var { cookies } = req
    //check out for cookie validity 
    // // if not valid go to home page
    // console.log(cookiesList)
    // console.log(cookies.sessionid);
    // console.log(cookiesList[cookies.sessionid]);
    var cookiesList = readCreate("usersCookies.json");
    if(cookiesList[cookies.sessionid]){
      console.log(cookies)
      next();
    }
    else{ 
    res.redirect('/login');
    res.end(); 
    }
}
function cookieGenerator (req,res,next){
  var { cookies } = req;
  console.log("cookieGenerator");
  console.log(cookies);
  if(!("sessionid" in cookies)){
    console.log("making new cookies");
    var cookie = makeid();
    res.cookie("sessionid",cookie)
  }
  next();
}

// make the home page the main page
// call the cookieValidator function before performing the request
{
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
}

app.get('/registration', cookieGenerator,function(req,res){
  var { cookies } = req;
  var cookiesList = readCreate("usersCookies.json");
  console.log(cookies.sessionid);
  if(cookiesList[cookies.sessionid])
  res.redirect('/');
  else{
  res.render('registration.ejs');
  }
});

app.get('/login', cookieGenerator,function(req,res){
  var { cookies } = req;
  var cookiesList = readCreate("usersCookies.json");
  console.log(cookies.sessionid);
  if(cookiesList[cookies.sessionid]){
  res.redirect('/');
  console.log("redirect")
  }
  else{
  res.render('login.ejs');
  }
});


// wish list book requests 
app.post('/flies',function(req,res){
  var {cookies} =  req;
  var cookiesList = readCreate("usersCookies.json");
  var usersList = readCreate("usersReads.json");
  console.log(cookiesList[cookies.sessionid].username);
  if (usersList[cookiesList[cookies.sessionid].username]){
    console.log("by7awel tany");
    usersList[cookiesList[cookies.sessionid].username].push('flies')
    console.log("msh first book added");
  }
  else {
    usersList[cookiesList[cookies.sessionid].username] = ['flies']
    console.log("first book added");
  }
  fs.writeFileSync("usersReads.json",JSON.stringify(usersList))
  res.end();
  
});
app.post('/leaves',function(req,res){
  var {cookies} =  req;
  var cookiesList = readCreate("usersCookies.json");
  var usersList = readCreate("usersReads.json");
  console.log(cookiesList[cookies.sessionid].username);
  if (usersList[cookiesList[cookies.sessionid].username]){
    console.log("by7awel tany");
    usersList[cookiesList[cookies.sessionid].username].push('leaves')
    console.log("msh first book added");
  }
  else {
    usersList[cookiesList[cookies.sessionid].username] = ['leaves']
    console.log("first book added");
  }
  fs.writeFileSync("usersReads.json",JSON.stringify(usersList))
  res.end();
  
});
app.post('/dune',function(req,res){
  var {cookies} =  req;
  var cookiesList = readCreate("usersCookies.json");
  var usersList = readCreate("usersReads.json");
  console.log(cookiesList[cookies.sessionid].username);
  if (usersList[cookiesList[cookies.sessionid].username]){
    console.log("by7awel tany");
    usersList[cookiesList[cookies.sessionid].username].push('dune')
    console.log("msh first book added");
  }
  else {
    usersList[cookiesList[cookies.sessionid].username] = ['dune']
    console.log("first book added");
  }
  fs.writeFileSync("usersReads.json",JSON.stringify(usersList))
  res.end();
  
});
app.post('/grapes',function(req,res){
  var {cookies} =  req;
  var cookiesList = readCreate("usersCookies.json");
  var usersList = readCreate("usersReads.json");
  console.log(cookiesList[cookies.sessionid].username);
  if (usersList[cookiesList[cookies.sessionid].username]){
    console.log("by7awel tany");
    usersList[cookiesList[cookies.sessionid].username].push('grapes')
    console.log("msh first book added");
  }
  else {
    usersList[cookiesList[cookies.sessionid].username] = ['grapes']
    console.log("first book added");
  }
  fs.writeFileSync("usersReads.json",JSON.stringify(usersList))
  res.end();
  
});
app.post('/sun',function(req,res){
  var {cookies} =  req;
  var cookiesList = readCreate("usersCookies.json");
  var usersList = readCreate("usersReads.json");
  console.log(cookiesList[cookies.sessionid].username);
  if (usersList[cookiesList[cookies.sessionid].username]){
    console.log("by7awel tany");
    usersList[cookiesList[cookies.sessionid].username].push('sun')
    console.log("msh first book added");
  }
  else {
    usersList[cookiesList[cookies.sessionid].username] = ['sun']
    console.log("first book added");
  }
  fs.writeFileSync("usersReads.json",JSON.stringify(usersList))
  res.end();
  
});
app.post('/mockingbird',function(req,res){
  var {cookies} =  req;
  var cookiesList = readCreate("usersCookies.json");
  var usersList = readCreate("usersReads.json");
  console.log(cookiesList[cookies.sessionid].username);
  if (usersList[cookiesList[cookies.sessionid].username]){
    console.log("by7awel tany");
    usersList[cookiesList[cookies.sessionid].username].push('mockingbird')
    console.log("msh first book added");
  }
  else {
    usersList[cookiesList[cookies.sessionid].username] = ['mockingbird']
    console.log("first book added");
  }
  fs.writeFileSync("usersReads.json",JSON.stringify(usersList))
  res.end();
  
});
app.post('/login',function(req, res){
var {cookies} =  req;
var{username,password} = req.body;
var usersList = readCreate("users.json");
var cookieList = readCreate("usersCookies.json");
var user = usersList [username]
if (user){
  if (user["password"] === password){
  cookieList[cookies.sessionid] = {"username":username};
  fs.writeFileSync("usersCookies.json",JSON.stringify(cookieList))
  res.redirect('/');
  res.end();
  
  }
}

});


app.post('/register', (req, res) => {
  var { cookies } = req;
  var {username,password} = req.body;
  // read json files
  var usersList = readCreate("users.json");
  var cookieList = readCreate("usersCookies.json");
  
  
  //Checking if user already exists,  
  if (usersList[username])
     throw 'Username Already Registered!';
    // handle existing users
  
    usersList[username]={ "password": password};
    cookieList[cookies.sessionid] = {"username":username};
    fs.writeFileSync("users.json", JSON.stringify(usersList));
    fs.writeFileSync("usersCookies.json",JSON.stringify(cookieList));
    
    
    
    res.redirect('/');
    res.end();
  
});
//implement logout post request
app.get('/logout', (req, res) => {
  var {cookies } =  req;
  var cookieList = readCreate("usersCookies.json");
  delete cookieList[cookies.sessionid];
  fs.writeFileSync("usersCookies.json",JSON.stringify(cookieList));
  
  
  res.redirect('/login');
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
