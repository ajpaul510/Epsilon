var Database = require('./../models/user');
var express = require('express');
var router = express.Router();
var mysql = require('mysql');


var db = new Database();



// Handle landing (index) page request
router.get('/', function(req, res) {
	res.render('index');
})


// Handle sign-up get request
router.get('/signup', function(req, res){
	res.render('signup')
});


// going back to main page
router.get('/index', function(req, res){
	res.render('index')
});

router.get('/profile', function(req, res){
	res.render('profile', {
		signedin: true,
		followers: 10,
		following: 100
	});
});


// Handle sign-up submission
router.post('/signup', function (req, res) {

	var user_info = req.body;

	var account = {
		user_id: null,
		username: user_info.userName,
		password: user_info.pwd
	};

	var info = {
		user_id: null,
		first_name: user_info.fname,
		last_name: user_info.lname,
		email: user_info.email,
		phone: user_info.phone,
		image_path: null
	};


	// console.log(account, info)

	db.insert(account, info)

	res.redirect('/');
});


// Handle login submission
router.post('/',function(req, res){
	var login_info = req.body;
	// connection.query('SELECT * FROM User_Accounts WHERE username = ? AND password = ?', [login_info.username, login_info.password], function(err, result){
	// 	if (err) throw err;
	// 	if (result.length == 0){
	// 		res.send("Unsuccessful login");
	// 	}
	// 	else {
	// 		res.send("Successful login");
	// 	}
	// });
});

module.exports = router;
