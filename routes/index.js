let Database = require('./../models/user');
let express = require('express');
let router = express.Router();
let passport = require('passport');
let LocalStrategy = require('passport-local').Strategy;
let fs = require('file-system');


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

                    if (isMatch){// username and password are matched correctly
                        // Any function that calls passport.auth will return (null, true/false)
                        // if the database has found it
                        return done(null, true);
                    }
                    else{
                        return done(null, false); // password doesn't match
                    }
                })
            }
        });
    }
));

function get_card_data(user_sess_id, callback){
    Database.get_user_pictures(user_sess_id, function (err, results) {
        if (err) throw err;

        let data = [];

        // loop through SQL query results and append to data list
        for (let i in results) {
            data.push({img_path : results[i].image_path, username : 'sample', caption : "sample again"});
        }
        callback(data)
    })
}


// Handle landing (index) page request
router.get('/', function(req, res) {

    res.render('index', {
        is_logged_in: req.isAuthenticated(),
        cards: [
            {img_path : "img/derp.jpg", username: "bob", caption : "This is the comment"},
            {img_path : "user_images/operator.png", username: "joe", caption : "this is working"},
            {img_path : "user_images/screen.png", username: "blow", caption: "Not dynamic"}
        ]})
});

// Handle sign-up get request
router.get('/signup', function(req, res){
	res.render('signup')
});


router.get('/shop', function(req, res){
    res.render('shop')
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


/*
    By default this function will get a post request
    from '/' and passport.authenticate will pass both
    (username and password) to the local strategy.

    If local strategy returns user == True

        Then Database will get user_id of username
        and save it to the session using "req.login(user_id)"


     Example session object:

        Session {
             cookie:
            { path: '/',
                _expires: null,
                originalMaxAge: null,
                httpOnly: true },
                passport: { user: 1 } }
 */

router.post('/', function(req, res, next){
  passport.authenticate('local', function(err, user){
    if (err) {return next(err)}
    if (!user) {
      return res.redirect('/forgotpassword');
    }

    Database.get_id_by_username(req.body.username, function (err, user_id) {
        if (err) throw err;

        req.login(user_id[0].user_id, function(err){ // pass user_id to serializer function
            if (err) {return next(err)}
            return res.redirect('/');
        });
    })
  })(req, res, next);
}
);

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


/*
    When user request /profile we have to query the database
    and find all pictures related to that user.

        Once pictures are found: Sort them (most recent - oldest) using timestamp

        Then send them through as an array of objects ( [ {object}, {object} ] )
*/

router.get('/profile', function(req, res){
    let is_logged_in = req.isAuthenticated();

    if (!is_logged_in){
        res.redirect('/')
    }
    else {
        let user_sess_id = req.session.passport.user;
        get_card_data(user_sess_id, function (data) {
            res.render('profile', {
                is_logged_in :is_logged_in,  //base.handlebars needs this
                signedin: is_logged_in, // profile.handlebars needs this
                cards : data // for dynamic card generation (Feed)
            });
        });
    }
});






router.post('/profile', function(req, res){
  var files = req.files;
  var file_obj = files.file;
  var data = file_obj.data;
  var name = file_obj.name;
  var user_sess_id = req.session.passport.user;

  var saving_image_path = `./public/user_images/${name}`;
  var db_image_path = `user_images/${name}`;

  fs.writeFile(saving_image_path, data, function(err) {
      if (err) throw err;
      console.log("File was saved!");

      Database.insert_into_user_post(user_sess_id, db_image_path, function (err) {
          if (err) throw err;

          get_card_data(user_sess_id, function (data) {
              res.render('profile', {
                  is_logged_in :req.isAuthenticated(),  //base.handlebars needs this
                  signedin: req.isAuthenticated(), // profile.handlebars needs this
                  cards : data // for dynamic card generation (Feed)
              })
          });
      });
      });
  });



router.get('*', function(req, res){
  // res.status(404).redirect();
  res.status(404);
  res.render('index', {pagenotfound:true});
});

module.exports = router;
