const express = require('express');
const router = express.Router({mergeParams: true});
const Recipe = require('../models/recipe');
const isLoggedIn = require("../utils/isLoggedIn");
const Comment = require('../models/comment');
const checkCommentOwner = require("../utils/checkCommentOwner")

// new comment- show form
router.get("/new",isLoggedIn, (req, res) => {
	res.render("comments_new", {recipeId: req.params.id});
})

//create comment- updates database
router.post("/", isLoggedIn, async (req, res) => {
	
	try {
		const comment = await Comment.create({
		user: {
			id: req.user._id,
			username: req.user.username
		},
		text: req.body.text,
		recipeId: req.body.recipeId,
		
		})
		console.log(comment);
		res.redirect(`/recipes/${req.body.recipeId}`)
	}
	catch (err)  {
		console.log(err)
		res.send("broken.. post comments")
	}
});

/// edit comment show edit form
router.get("/:commentId/edit", checkCommentOwner, async (req, res) => {
	try {
		const recipe = await Recipe.findById(req.params.id).exec();
		const comment = await Comment.findById(req.params.commentId).exec();
		console.log("recipe:", recipe);
		console.log("comment:",comment);
		res.render("comments_edit", {recipe, comment});
	} catch (err) {
		console.log(err);
		res.send("broke comment edit GET");
	}
})

router.put("/:commentId", checkCommentOwner, async (req, res) => {
	try {
		const comment = await Comment.findByIdAndUpdate(req.params.commentId, {text: req.body.text}, {new: true});
		console.log(comment);
		res.redirect(`/recipes/${req.params.id}`);
	} catch (err) {
		console.log(err);
		res.send("broke commentPUT");
	}
})

router.delete("/:commentId", checkCommentOwner, async (req, res) => {
	try {
		const comment = await Comment.findByIdAndDelete(req.params.commentId);
		console.log(comment);
		res.redirect(`/recipes/${req.params.id}`)
	} catch (err) {
		console.log(err);
		res.send("broke comment delete");
	}
})




module.exports = router;