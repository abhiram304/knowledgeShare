var User = require('../DB/user');
var bCrypt = require('bcrypt-nodejs');


var isValidPassword = function(user, password){
	return bCrypt.compareSync(password, user.password);
};