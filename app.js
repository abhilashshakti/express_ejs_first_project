var express = require('express');
var session = require('cookie-session'); // Loading the session module
var bodyParser = require('body-parser'); // Loading the body-parser module

var urlencodedParser = bodyParser.urlencoded({
    extended: false
});

var app = express();

// Using sessions
app.use(session({secret: 'todotopsecret'}));

//var list = [];
//app.get('/', function (req, res) {
//
//    var newItem = req.query.listItem;
//    if (newItem != undefined && newItem != "")
//        list.push(newItem);
//    res.render('list.ejs', {
//        myListItems: list
//    });
//});

// Create an empty list (using an array here)
app.use(function(req, res, next) {
    if(typeof(req.session.todolist) == 'undefined') {
        req.session.todolist = [];
    }
    next();
});

// Display the todo list
app.get('/todo', function(req, res) {
   res.render('list.ejs', {todolist: req.session.todolist});
});

// Adding a new item to the todolist
app.post('/todo/add/', urlencodedParser, function(req, res) {
    if(req.body.newtodo != '') {
        req.session.todolist.push(req.body.newtodo);
    }
    res.redirect('/todo');
});

// Deletes an item from the todo list
app.get('/todo/delete/:id', function(req, res) {
    if(req.params.id != '') {
        req.session.todolist.splice(req.params.id, 1);
    }
    res.redirect('/todo');
});

// Redirects to the todo page if the page requested is not found
app.use(function(req, res) {
    res.redirect('/todo');
})

app.listen(8080);

console.log('Server running at http://127.0.0.1:8080/');
