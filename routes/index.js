let Database = require('./../models/user');
let express = require('express');
let router = express.Router();
let passport = require('passport');
let LocalStrategy = require('passport-local').Strategy;

let fs = require('fs');
let path = require('path');

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
                      console.log(isMatch);
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
        pagenotfound: false,
        is_logged_in: req.isAuthenticated()
    });
});

// Handle sign-up get request
router.get('/signup', function(req, res){
	res.render('signup')
});


router.get('/shop', function(req, res){
    res.render('shop')
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

router.get('/forgotpassword', function(req, res){
  res.render('forgotpassword');
});

router.post('/forgotpassword', function(req, res){
    let username = req.body.username;
    let email = req.body.email;

    Database.get_password(username, email, function(isPassword, password, err){
      if (err) throw err;
      if (!isPassword){
          res.render('forgotpassword', {
          isPassword: false,
          password: "Couldn't find match. Try again."
        });
      }
      else {
        res.render('forgotpassword', {
          isPassword: true,
          password: password
        });
      }
    });
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

        Database.get_last_insert(function (err, user_id) {
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
router.post('/', function(req, res, next){
  passport.authenticate('local', function(err, user){
    if (err) {return next(err)}
    if (!user) {
      res.local("username", req.params('username'));
      return res.render('login', {error: true});
    }

    req.login(user, {}, function(err){
      if (err) {return next(err)};
      req.session.username = req.params('username');
      return res.redirect('/');
    });
  })(req, res, next);
  return;
}
);

router.post('/profile', function (req, res) {

});
// Handle logout
router.get('/logout', function (req, res) {
    req.session.destroy(); // remove session data
    req.logout(); // delete cookie
    res.redirect('/')
});


passport.serializeUser(function(user_id, done) {
    done(null, user_id);
});

passport.deserializeUser(function(user_id, done) {
    done(null, user_id);

});


router.post('/profile', function(req, res){
  var files = req.files;
  var file_obj = files.file;
  var data = file_obj.data;
  var name = file_obj.name;

  fs.writeFile(`./public/img/${name}`, data, function(err){
    if (err) throw err;
    console.log("File was saved!");
  });
  console.log(req.session.username);
  res.redirect('/');
});


router.get('*', function(req, res){
  // res.status(404).redirect();
  res.status(404);
  res.render('index', {pagenotfound:true});
});

module.exports = router;
