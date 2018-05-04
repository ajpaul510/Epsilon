/*

	Main server and router for applicaiton

	TODO:
		When routes become complex port them to
		another file named 'Router.js'

*/
var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var routes = require('./routes/index')
var mysql = require('mysql');
var path = require('path');

var app = express();

app.engine('handlebars', exphbs({ defaultLayout: 'base' }));


app.set('view engine', 'handlebars');

// Use Public directory for static files
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);


// Bodyparser middleware
var urlencodedParser = bodyParser.urlencoded({ extended: false });



const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
