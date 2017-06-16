var User = require('../DB/user');
var bCrypt = require('bcrypt-nodejs');
// Generates hash using bCrypt
var createHash = function(password){
	return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
};

exports.signup = function(req, res){
	
	res.render('dashboard');
};