var express = require('express');
var router = express.Router();

module.exports = function(passport){
// normal routes ===============================================================

	// show the home page (will also have our login links)
	router.get('/', function(req, res) {
		res.render('index', {title: 'Node Authentication'});
	});
/*	router.get('/about', function(req, res) {
  res.render('about', { title: 'about | Ariel Borochov' });
});
router.get('/contact', function(req, res) {
  res.render('contact', { title: 'contact | Ariel Borochov', myEmail: 'ariel.borochov@gmail.com' });

});
router.get('/portfolio', function(req, res) {
  res.render('portfolio', { title: 'portfolio | Ariel Borochov' });
});*/

	// PROFILE SECTION =========================
	router.get('/profile', isLoggedIn, function(req, res) {
		
		res.render('profile', {

			user : req.user,
			title: 'Profile'
		});
	});
	router.get('/home', isLoggedIn, function(req, res){

		res.render('home', {
			user: req.user,
			title: 'home'
		});
	});

	// LOGOUT ==============================
	router.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	// =============================================================================
// AUTHENTICATE (FIRST LOGIN) ==================================================
// =============================================================================

	// locally --------------------------------
		// LOGIN ===============================
		// show the login form
		router.get('/login', function(req, res) {
			res.render('login', { title: 'login' ,message: req.flash('loginMessage') });
		});

		// process the login form
		router.post('/login', passport.authenticate('local-login', {
			successRedirect : '/home', // redirect to the secure profile section
			failureRedirect : '/login', // redirect back to the signup page if there is an error
			failureFlash : true // allow flash messages
		}));

		// SIGNUP =================================
		// show the signup form
		router.get('/signup', function(req, res) {
			res.render('signup', { title: 'signup', message: req.flash('signupMessage') });
		});

		// process the signup form
		router.post('/signup', passport.authenticate('local-signup', {

			successRedirect : '/home', // redirect to the secure profile section
			failureRedirect : '/signup', // redirect back to the signup page if there is an error
			failureFlash : true // allow flash messages
		}));


 return router;
};


function isLoggedIn(req, res, next) {
	if (req.isAuthenticated())
		return next();
	
	res.redirect('/');
}
