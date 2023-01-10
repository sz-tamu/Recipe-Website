//=============
//IMPORTS
//=============

// npm imports
const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const methodOverride = require('method-override')
const morgan = require('morgan')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const expressSession = require('express-session');
const flash = require("connect-flash");

//config import
try {
	 config = require('./config');
} catch (e) {
	console.log("could not import config config. prob means not working locally")
	console.log(e);
}

//route import
const recipeRoutes = require('./routes/recipes');
const commentRoutes = require('./routes/comments');
const mainRoutes = require('./routes/main');
const authRoutes = require('./routes/auth');



//model import
const Recipe = require('./models/recipe');
const Comment = require('./models/comment');
const User = require('./models/user');

//Development
app.use(morgan('tiny'));

// // seed DB
// const seed = require("./utils/seed");
// seed();
//connect to DB
try {
	mongoose.connect(config.db.connection, { useNewUrlParser: true, useUnifiedTopology: true } );
} catch (err) {
	console.log("Could not connect using config. Prob means not working locally")
	mongoose.connect(process.env.DB_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true })
}

//use npm packages
app.set("view engine", "ejs");

app.use(express.static('public'));

app.use(expressSession({
	secret: process.env.ES_SECRET || config.expressSession.secret,
	resave: false,
	saveUninitialized: false
}))

app.use(bodyParser.urlencoded({extended: true}));

app.use(methodOverride('_method'))

//flash config

app.use(flash());
//pssport config
app.use(passport.initialize());
app.use(passport.session()); //allows persistent session
passport.serializeUser(User.serializeUser());// what data should be stored in session 
passport.deserializeUser(User.deserializeUser());
passport.use(new LocalStrategy(User.authenticate())); //use local strategy

//current user middleware config
app.use((req, res, next) => {
	res.locals.user = req.user;
	next();
})


//route config
app.use("/recipes", recipeRoutes);
app.use("/recipes/:id/comments", commentRoutes);
app.use("/", mainRoutes);
app.use("/", authRoutes)

// listen
app.listen(process.env.PORT || 3000, () => {
	console.log("yelp_app is running...")
})

