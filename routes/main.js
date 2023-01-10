const express = require('express');
const router = express.Router();
const isLoggedIn = require("../utils/isLoggedIn");
const Recipe = require('../models/recipe')


router.get("/", async(req, res) => {
	try {
		const recipes = await Recipe.find().exec();
	res.render("recipes", {recipes});
	
	} catch (err) {
		console.log(err);
		res.send("you broke it");
	}
})

router.get("/account", isLoggedIn, (req, res) => {
	res.render("account");
})



module.exports = router;