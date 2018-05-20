var Database = require('./../models/user');
var express = require('express');
var router = express.Router();

var db = new Database();

// Handle landing (index) page request
router.get('/', function(req, res) {

	var example_object = {username: 'FooBar', password: '123fadfkjadskl'}
	res.render('index', example_object)
})


// Handle sign-up get request
router.get('/signup', function(req, res){
	res.render('signup')
});


// Handle sign-up submission
router.post('/signup', function (req, res) {

	var user_info = req.body;

	db.insert(user_info);
	res.redirect('/');
});


// Handle login submission
router.post('/',function(req, res){
	/*

		Validate data and check username and password on
		database they are the same
	*/
	res.send('Hello world')
});

module.exports = router;
