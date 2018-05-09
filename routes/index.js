var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

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

// TODO send data from form to database

router.post('/signup', urlencodedParser, function (req, res) {

	let info = req.body
    var name = info.first,
        email = info.username,
        message = info.password;


    console.log(info)

    // connection.query('SELECT * FROM contact', function (error, results, fields) {
    //     if (error)throw error;
    //     console.log(results)
    // });
    // connection.end();

    res.redirect('/');
});

module.exports = router;
