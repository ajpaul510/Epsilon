/*

	Main server and router for applicaiton

	TODO:
		Write error pages (404, 500)

*/
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let exphbs = require('express-handlebars');
let expressValidator = require('express-validator');
let flash = require('connect-flash');
let session = require('express-session');
let passport = require('passport');
let LocalStrategy = require('passport-local').Strategy;
let MySQLStore = require('express-mysql-session')(session);
let routes = require('./routes/index');
let opn = require('opn');
let fileUpload = require('express-fileupload');


// Init App
let app = express();


let options ={
    host: 'localhost',
    user: 'root',
    password: 'Wendtfam96',
    database: 'Epsilon',
    insecureAuth: true
};

let sessionStore = new MySQLStore(options);


// View Engine
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout:'base'}));
app.set('view engine', 'handlebars');

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Express Session
app.use(session({
    secret: 'secret',
    saveUninitialized: false,
    store: sessionStore,
    resave: false
}));

// Passport init
app.use(passport.initialize());
app.use(passport.session());


app.use(fileUpload());


// Express Validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

// Connect Flash
app.use(flash());

// Global Vars
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

app.use('/', routes);

// Set Port
app.set('port', (process.env.PORT || 5000));

// opn('http://localhost:5000/');

app.listen(app.get('port'), function(){
	console.log('Server started on port '+ app.get('port'));
});
