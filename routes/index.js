var express = require('express');
var router = express.Router();


router.get('/', function(req, res) {

	var example_object = {username: 'FooBar', password: '123fadfkjadskl'}
	res.render('index', example_object)
})

router.get('/signup', function(req, res){
	res.render('signup')
});


// Handle sign-up submission
router.post('/signup', function (req, res) {
	console.log(JSON.stringify(req.body))
	res.redirect('/');
});


// Handle login submission
router.post('/',function(req, res){

	res.send('Hello world')
});

module.exports = router;
