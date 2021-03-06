var express = require('express');
var fortune = require('./lib/fortune.js');

var app = express();

//set up hadelbars view engin
var handlebars = require ('express-handlebars').create({ defaultLayout: 'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);


app.use(express.static(__dirname + '/public'));


app.get('/', function(req, res){
	/*res.type('text/plain');
	res.send('Meadowlark Travel');*/
	res.render('home');
});

app.get('/about', function(req, res){
	/*res.type('text/plain');
	res.send('About Meadowlark Travel');*/
	/*res.render('about');*/
	res.render('about', {fortune: fortune.getFortune()})
});


/*// custom 404 page*/
//404 catch-all handler (middleware)
app.use(function(req, res){
	/*res.type('text/plain');*/
	res.status(404);
	/*res.send('404 - Not Found');*/
	res.render('404');
});

/*//custom 500 page*/
//500 error handler (middleware)
app.use(function(err, req, res, next){
	console.error(err.stack);
	/*res.type('text/plain');*/
	res.status(500);
	/*res.send('500 - server error');*/
	res.render('500');
});





app.listen(app.get('port'), function(){
	console.log('Express started on http://localhost:' + app.get('port') + '; press ctrl-c to terminate');
});
