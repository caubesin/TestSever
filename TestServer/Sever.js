//Tạo sever nodejs
var express = require('express');

var app = express();

var home_router = require('./action_page');

var bodyParser = require('body-parser');

var path = require('path');

app.set("view engine", "ejs");

app.set("views", path.resolve(__dirname, "views"));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.get('/home',(req,res) => {
    res.render('../home');
});
app.use("/home",home_router);

app.listen(3000 || process.env.PORT);