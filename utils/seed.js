const Recipe = require('../models/recipe')
const Comment = require('../models/comment')

const recipe_seeds = [
	{
	title: "A promised land",
	description: "Obama's life",
	author: "Barack Obama",
	publisher: "U.S. Reports",
	date: "2020-01-03",
	series: "POTUS",
	issue: 12,
	genre: "slice-of-life",
	color: true,
	image: "https://upload.wikimedia.org/wikipedia/en/5/50/A_Promised_Land_%28Barack_Obama%29.png"
	},
	
	{
	title: "Sorceror's Stone and Potter",
	description: "wizards and stuf",
	author: "JK Rowling",
	publisher: "idk",
	date: "1998-12-04",
	series: "Harry Potter",
	issue: 1,
	genre: "fantasy",
	color: false,
	image: 'https://upload.wikimedia.org/wikipedia/en/7/7a/Harry_Potter_and_the_Philosopher%27s_Stone_banner.jpg'
	},
	{
	title: "The lighting thief",
	description: "someone stole Zeus' bolt",
	author: "Rick Riordan",
	publisher: "Scholastic",
	date: "2004-04-12",
	series: "Percy Jackson",
	issue: 2,
	genre: "fantasy",
	color: true,
	image: "https://upload.wikimedia.org/wikipedia/en/e/eb/Percy_Jackson_%26_the_Olympians_The_Lightning_Thief_poster.jpg"
	}
 ]
	 

const seed = async () => {
	//delete current recipes and comments
	await Recipe.deleteMany();
	console.log("deleted all recipes");
	
	await Comment.deleteMany();
	console.log("deleted all comments");
	
	// create 3 new recipes
	// for (const recipe_seed of recipe_seeds) {
	// 	let recipe = await Recipe.create(recipe_seed);
	// 	console.log("created recipe: ", recipe.title);
	// 	await Comment.create({
			
	// 		text: "I loved this place!",
	// 		user: "Reveille",
	// 		recipeId: recipe._id
	// 	})
	// 	console.log("created comment: ");
	// }
	
	// create new comment
}

module.exports = seed;