const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');

//sign up new 
router.get('/signup', (req, res) => {
	res.render('signup');
})

//sign up create
router.post('/signup', async (req, res) => {
	try {
		const newUser = await User.register(new User({
			username: req.body.username,
			email: req.body.email,
		}), req.body.password);
		
		console.log(newUser);
		
		passport.authenticate('local')(req, res, () => {
			res.redirect('/recipes');
		});
	} catch (err) {
		console.log(err);
		res.send(err);
	}
});

//login show form
router.get("/login", (req, res) => {
	res.render("login")
})

router.post("/login", passport.authenticate('local', {
	successRedirect: '/recipes',
	failureRedirect: '/login'
}));


router.get('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/recipes');
  });
});

module.exports = router;