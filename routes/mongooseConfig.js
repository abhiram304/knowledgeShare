var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/knowledgeshare');

var userSchema = new Schema({
	  name: String,
	  username: { type: String, required: true, unique: true },
	  password: { type: String, required: true },
	  admin: Boolean,
	  created_at: Date
	});
var User = mongoose.model('User', userSchema);

module.exports = User;