const express = require('express');
const app = express();
const server = app.listen(1337);
const io = require('socket.io')(server);
var path = require("path");
var bodyparser = require("body-parser");
var session = require('express-session');
app.use(session({secret: 'hackmebro',resave: false,saveUninitialized: true,cookie: { maxAge: 60000 }}))
app.use(express.static(__dirname + "/public"));
app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')
var users = {};

app.get('/', function(req,res){
    res.render('index');
});
io.on('connection', function (client) { 
    
    client.on('new_user', function(req){
        req.session = req.name;
    client.broadcast.emit('user_name', {name: users});
    client.emit('user_data', {name: users})
    });
    
    client.on('post_message', function(message){
        client.emit('show_message', message);
        client.broadcast.emit('show_message', message);
  });
  
    
});