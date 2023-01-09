const express = require('express');
const router = express.Router();
const Recipe = require('../models/recipe')
const Comment = require("../models/comment");
const isLoggedIn = require("../utils/isLoggedIn");
const checkRecipeOwner = require("../utils/checkRecipeOwner");
//index
router.get("/", async (req, res) => {
	console.log(req.user)
	try {
		const recipes = await Recipe.find().exec();
	res.render("recipes", {recipes});
	
	} catch (err) {
		console.log(err);
		res.send("you broke it");
	}
	
})

//create
router.post("/", isLoggedIn, async (req, res) => {
	const genre = req.body.genre.toLowerCase();
	const newRecipe = {
		
		title: req.body.title,
		description: req.body.description,
		author: req.body.author,
		publisher: req.body.publisher,
		date: req.body.date,
		series: req.body.series,
		issue: req.body.issue,
		genre,
		color: !!req.body.color,
		image: req.body.image,
		owner: {
			id: req.user._id,
			username: req.user.username
		}
		
	} 
	try {
		const recipe = await Recipe.create(newRecipe);
		console.log(recipe);
		res.redirect("/recipes/" + recipe._id);
	} catch (err) {
		console.log(err);
		res.send("you broke it.../recipes POST");
	}
	
	
})


//new
router.get("/new", isLoggedIn, (req, res) => {
	res.render("recipes_new");
})

router.get("/search", async (req, res) => {
	try {
		const recipes = await Recipe.find({
			$text: {
				$search: req.query.term
			}
		})
		
		res.render("recipes", {recipes})
	} catch (err) {
		console.log(err);
		res.send("broken search")
	}
})

//show
router.get("/:id", async (req, res) => {
	try {
		const recipe = await Recipe.findById(req.params.id).exec();
		const comments = await Comment.find({recipeId: req.params.id});
		res.render("recipes_show", {recipe, comments});
	} catch (err) {
		console.log(err);
		res.send("you broke it.../recipes POST");
	}
	
})

//edit
router.get("/:id/edit", checkRecipeOwner, async (req, res) => {
	const recipe = await Recipe.findById(req.params.id).exec();
	res.render("recipes_edit", {recipe});
	
})

//update
router.put("/:id",checkRecipeOwner, async (req, res) => {
	const genre = req.body.genre.toLowerCase();
	const recipeBody = {
		
		title: req.body.title,
		description: req.body.description,
		author: req.body.author,
		publisher: req.body.publisher,
		date: req.body.date,
		series: req.body.series,
		issue: req.body.issue,
		genre,
		color: !!req.body.color,
		image: req.body.image
		
	} 
	try {
		const recipe = await Recipe.findByIdAndUpdate(req.params.id, recipeBody, {new: true}).exec();
		
		res.redirect(`/recipes/${req.params.id}`);
		console.log(recipe);
	} catch(err) {
		console.log(err);
		res.send("Error:", err);
	}
})

//delete
router.delete("/:id", checkRecipeOwner, async (req, res) => {
	
	
	 try {
		 const recipe = Recipe.findByIdAndDelete(req.params.id).exec();
		console.log("Deleted:", recipe);
		res.redirect("/recipes")
	} catch (err)  {
		console.log(err);
		res.send("Error deleting:", err);
	}
})


module.exports = router;