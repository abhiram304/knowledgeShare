var mongoose = require('mongoose');
mongoose.createConnection('mongodb://localhost/knowledgeshare');
var bcrypt   = require('bcrypt-nodejs');
var Schema = mongoose.Schema, ObjectId = Schema.ObjectId;


var userSchema = new Schema({
	  name: String,
	  username: { type: String, required: true, unique: true },
	  password: { type: String, required: true },
	  admin: Boolean,
	  created_at: Date
	});

//generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

var User = mongoose.model('User', userSchema);


module.exports = User;