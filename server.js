/*

	Main server and router for applicaiton

	TODO:
		Write error pages (404, 500)

*/
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var routes = require('./routes/index')
var express = require('express');
var mysql = require('mysql');
var path = require('path');
var opn = require('opn');
var app = express();

app.engine('handlebars', exphbs({ defaultLayout: 'base' }));
app.set('view engine', 'handlebars');


// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', routes);


// Use Public directory for static files
app.use(express.static(path.join(__dirname, 'public')));


// Error functions
app.use(function (req, res, next) {
  res.status(404).send("Sorry can't find that!")
})


app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

opn('http://localhost:5000/');
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Listening on 127.0.0.1:${ PORT }`))
