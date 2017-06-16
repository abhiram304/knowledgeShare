
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');
var passport = require('passport');
var flash    = require('connect-flash');
var session      = require('express-session');
var cookieParser = require('cookie-parser');
var localStrategy = require('passport-local').Strategy;

var app = express();
var javaPointer = require('./routes/java');
var postPointer = require('./routes/posts/createNewPost');
var signupPointer = require('./routes/loginSignup/signup');
//require('./routes')(app, passport);

var morgan       = require('morgan');
// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
	
	

//Express sessions
app.use(session({
	secret: 'secret',
	saveUninitialized: true,
	resave: true
}));

//Connect-Flash Middleware
app.use(flash());
app.use(function(req,res,next){
	res.locals.messages = require('express-messages')(req,res);
	next();
});


app.get('*',function(req,res,next){
	res.locals.user = req.user || {name:'User'};
	next();
});




//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());


app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//Define Routes
app.get('/users', user.list);
app.get('/java', javaPointer.getJavaDashboard);
app.get('/post/createNewPost', postPointer.getCreatePostPage);
app.post('/post/createNewPost', postPointer.createNewPost);
app.get('/signup', function(req, res){
	res.render('./loginSignup/signup');
});
app.get('/', function(req, res) {
	// Display the Login page with any flash message, if any
	res.render('./loginSignup/login');
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
