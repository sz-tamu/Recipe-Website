const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
	title: String,
	directions: String,
	servings: String,
	time: String,
	ingredients: String,
	cuisine: String,
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