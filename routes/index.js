let Database = require('./../models/user');
let express = require('express');
let router = express.Router();
let passport = require('passport');
let LocalStrategy = require('passport-local').Strategy;
let fs = require('fs');

// Handle login user name and password validation
passport.use(new LocalStrategy(
    function(username, password, done) {

        Database.check_user(username, function (results, err) {
            if (err){ done(err)}

            if (results.length === 0){ // Username not found
                return done(null, false);
            }
            else{
                Database.check_password(username, password, function (isMatch, err) {
                    if (err){done(err)}

                    if (isMatch){
                        return done(null, true); // username and password are matched correctly
                    }
                    else{
                        return done(null, false); // password doesn't match
                    }

                })
            }

        });
    }
));

// Handle landing (index) page request
router.get('/', function(req, res) {
    res.render('index', {
        pagenotfound:false,
        is_logged_in: req.isAuthenticated()
    });
});

// Handle sign-up get request
router.get('/signup', function(req, res){
	res.render('signup')
});


router.get('/profile', function(req, res){

    if (req.isAuthenticated()){
        res.render('profile',
            { is_logged_in : true,
              followers : 10,
              following : 100});
    }
    else{
        req.flash('info', 'Flash is back!');
        res.redirect('/');

    }
});

// Handle sign-up submission
router.post('/signup', function (req, res) {

    let user_info = req.body;


    let account = {
        user_id: null,
        username: user_info.userName,
        password: user_info.pwd
    };

    let info = {
        user_id: null,
        first_name: user_info.fname,
        last_name: user_info.lname,
        email: user_info.email,
        phone: user_info.phone,
        image_path: null
    };

    // Validation
	req.checkBody('fname', 'First name is required').notEmpty();
	req.checkBody('lname', 'Last name is required').notEmpty();
	req.checkBody('email', 'Email is not valid').isEmail();
	req.checkBody('userName', 'Username is required').notEmpty();
	req.checkBody('pwd', 'Password is required').notEmpty();
	req.checkBody('pwd-rpt', 'Passwords do not match').equals(user_info.pwd);

	let errors = req.validationErrors();

    if (errors) {
        res.render('signup', {
            errors: errors
        });
    }
    else {

        Database.insert(account, info);

        Database.get_last_inseret(function (err, user_id) {
            if (err) throw err;
            info.user_id = user_id[0].user_id;

            req.login(info.user_id, function (err) {
                if (err) throw err;
                res.redirect('/');
            });
        });
    }
});

// Handle login submission
router.post(':/',
    passport.authenticate('local', { successRedirect: '/',
        failureRedirect: '/signup',
        failureFlash: true })
);

// Handle logout
router.get('/logout', function (req, res) {
    req.session.destroy(); // remove session data
    req.logout(); // delete cookie
    res.redirect('/')
});


router.get('*', function(req, res){
  // res.status(404).redirect();
  res.status(404);
  res.render('index', {pagenotfound:true});
});

passport.serializeUser(function(user_id, done) {
    done(null, user_id);
});

passport.deserializeUser(function(user_id, done) {
    done(null, user_id);

});

module.exports = router;
