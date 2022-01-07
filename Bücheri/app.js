var express = require('express');
var path = require('path');



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
app.listen(3000);
