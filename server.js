// /*

// 	Main server and router for applicaiton

// 	TODO:
// 		Write error pages (404, 500)

// */
let validator = require('express-validator');
let cookieParser = require('cookie-parser');
let exphbs = require('express-handlebars');
let session = require('express-session');
let bodyParser = require('body-parser');
let routes = require('./routes/index');
let flash = require('connect-flash');
let express = require('express');
let mysql = require('mysql');
let path = require('path');
let opn = require('opn');
let app = express();

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;



module.exports = app;

app.engine('handlebars', exphbs({ defaultLayout: 'base' }));
app.set('view engine', 'handlebars');


// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', routes);

app.use(cookieParser());
// Use Public directory for static files
app.use(express.static(path.join(__dirname, 'public')));


app.use(validator({
	errorFormatter: function(param, msg,value){
		var namespace = param.split('.')
		, root = namespace.shift()
		, formParam = root;

		while(namespace.length){
			formParam += '[' + namespace.shift() + ']';
		}

		return {
			param : formParam,
			msg   : msg,
			value : value
		};

	}

}));

app.use(flash());


app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

// Passport init
app.use(passport.initialize());
app.use(passport.session());

// Error functions
app.use(function (req, res, next) {
  res.status(404).send("Sorry can't find that!")
  // res.render('404-error-page')
})


app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
  // res.render('500-Something broke!-page')
})

// Global Vars
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});


// opn('http://localhost:5000/');
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Listening on 127.0.0.1:${ PORT }`))
