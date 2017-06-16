var Post = require('../DB/post');

//Get create new post page
exports.getCreatePostPage = function(req, res){
	Post.find({}, function(err, posts) {
		if (err) throw err;

		// object of all the posts
		console.log(posts);
		res.render('./posts/createNewPost', {"posts":posts});
	});

};

//create a new post
exports.createNewPost = function(req, res){
	//Get a post parameters
	var category = req.body.category;
	var text = req.body.postText;
	var title = req.body.title;
	console.log("Post with Title: "+title+ ", Category: "+category+", text: "+text+" is being created..");
	//create a post in the database
	var newPost = new Post({
		title: title,
		category: category,
		text: text
	});
	//saving the post
	newPost.save(function(err) {
		if (err) throw err;
		console.log('Post saved successfully!');
		res.render('./posts/createNewPost');
	});

};