const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
	title: String,
	description: String,
	author: String,
	publisher: String,
	date: Date,
	series: String,
	issue: Number,
	genre: String,
	color: Boolean,
	image: String,
	owner: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String
	}
	
})

const Recipe = mongoose.model("recipe", recipeSchema);

recipeSchema.index({
	'$**': 'text'
})

module.exports = Recipe;