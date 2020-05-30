var express = require('express');

var app = express();

var home_router = express.Router();

var bodyParser = require('body-parser');

var path = require('path');

app.set("view engine", "ejs");

app.set("views", path.resolve(__dirname, "views"));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

var mysql = require('mysql');

var conn = mysql.createConnection({
    host    : 'localhost',
    user    : 'root',
    password: '',
    database: 'test',
});
//Kết nối Database
conn.connect( (err) => {
    if (err) throw err;
    console.log("Connected !");
});
//Đăng ký
home_router.get('/dangky',(req, res) => {
    res.render("../dangky");
    //Kiểm tra đăng ký
});
home_router.post('/action', (req, res) => {
    var first_name = req.body.first_name;
    
    var name = req.body.name;

    var user_name = req.body.user_name;

    var passwd = req.body.passwd;
//Kiểm tra đăng ký
    var sql = "SELECT user_name,passwd FROM full_name";
    var temp = 0;
    conn.query(sql,(err,results) => {
        if (err) throw err;
        results.forEach((i) => {
            if ((user_name == i.user_name) || (passwd == i.passwd)) {
                res.send("Tên tài khoản hoặc mật khẩu đã đươc sử dụng !");
                return;
            }
//Hoàn thành đăng ký
            else temp++;
            if (temp == results.length) {
                res.send("Đăng ký thành công");
                var sql = "INSERT INTO full_name (Ho,Ten,user_name,passwd) VALUES (?,?,?,?);";
                var values = [first_name,name,user_name,passwd];
                conn.query(sql,values, function (err,results, fields) {
                if (err) throw err;
                console.log("Add Done !");
                });
            };
        });
    });
});
//Đăng nhập
home_router.get('/dangnhap',(req,res) => {
    res.render("../dangnhap");
});
//Kiểm tra đăng nhập
home_router.post("/action_1",(req,res) => {
    var user_name = req.body.user_name;
    var passwd = req.body.passwd;
    var sql = "SELECT user_name,passwd FROM full_name";
    var temp = 0;
    conn.query(sql,(err,results) => {
        if (err) throw err;
        results.forEach((i) => {
            if (i.user_name == user_name && i.passwd == passwd) {
                res.send("Bạn đang đăng nhập với tài khoản " + user_name);
                return;
            }
            else temp ++;
            if (temp == results.length) res.send("Đăng nhập thất bại");
        });
    });
});
module.exports = home_router;