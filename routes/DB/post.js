var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/knowledgeshare');
var Schema = mongoose.Schema, ObjectId = Schema.ObjectId;
var postSchema = new Schema({
	title: String,
	category: String,
	tags: [{ type : String}],
	text: String,
	user: [{ type : ObjectId, ref: 'User' }],
	createdAt: Date,
	updatedAt : Date
});
postSchema.pre('save', function(next) {
	// get the current date
	var currentDate = new Date();

	// change the updatedAt field to current date
	this.updatedAt = currentDate;

	// if createdAt doesn't exist, add to that field
	if (!this.createdAt)
		this.createdAt = currentDate;

	next();
});
var Post = mongoose.model('Post', postSchema);

module.exports = Post;