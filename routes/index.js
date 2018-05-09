var express = require('express');
var router = express.Router();


router.get('/', function(req, res) {

	var example_object = {username: 'FooBar2', password: '123fadfkjadskl'}
	res.render('index', example_object)
})


// Mysql database init
// var connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'Ajaypal1',
//     database: 'website'
// });

// // Test connection to database
// connection.connect(function(error){

//     if (!!error) {
//         console.log('ERROR now database called website found!');
//     }else{
//         console.log('Worked');
//     }
// });


module.exports = router;
