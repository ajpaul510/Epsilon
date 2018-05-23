var Database = require('./../models/user');
var express = require('express');
var router = express.Router();

var db = new Database();

// Handle landing (index) page request
router.get('/', function(req, res) {
	res.render('index')
})


// Handle sign-up get request
router.get('/signup', function(req, res){
	res.render('signup')
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

	// console.log(req.body);


	// // Validation
	// req.checkBody('name', 'Name is required').notEmpty();
	// req.checkBody('email', 'Email is required').notEmpty();
	// req.checkBody('email', 'Email is not valid').isEmail();
	// req.checkBody('username', 'Username is required').notEmpty();
	// req.checkBody('password', 'Password is required').notEmpty();
	// req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

	// var errors = req.validationErrors();

	// if (errors) {
	// 	// res.render('signup', {errors: errors});
	// 	console.log("ERRORS ");
	// }
	// else{
	// 	// db.insert(user_info);
	// 	console.log('NO ERROR');


	// }


	db.insert(user_info);
	res.redirect('/');

});

/*
router.post('/profile', function(req, res){
	console.log(req);
	res.redirect('/profile');
});
*/

// Handle login submission
router.post('/',function(req, res){
	/*

		Validate data and check username and password on
		database they are the same
	*/
	var user_info = req.body;


});

module.exports = router;
