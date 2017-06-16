exports.getJavaDashboard = function(req, res){
  res.render('javaPosts');
};

exports.postPage = function(req, res){
	//Get a post with id
	
	res.render('javaEachPost');
	};