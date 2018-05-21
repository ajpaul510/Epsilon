var express = require('express');
var router = express.Router();


// Handle landing (index) page request
router.get('/', function(req, res) {

	var example_object = {username: 'FooBar', password: '123fadfkjadskl'}
	res.render('index', example_object)
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
	console.log(JSON.stringify(req.body))
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
	res.send('Hello world')
});

module.exports = router;
