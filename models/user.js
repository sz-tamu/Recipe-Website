const mongoose =  require('mongoose');
const pasportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
	email: {type: String, required: true, unique: true},
	username: {type: String, required: true, unique: true}
});

userSchema.plugin(pasportLocalMongoose);

module.exports = mongoose.model("user", userSchema);