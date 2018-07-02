const express = require('express');
const app = express();
const path = require('path');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ type: 'application/*+json' }));


var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";


app.set('view engine', "pug");
app.set("views", path.join(__dirname, "View"));
app.use("/static", express.static(path.join(__dirname, "Public")))



function insertRecipe(recipe) {
	insertIntoMongoDB(recipe, "bancancode", "recipes");
}

function insertIntoMongoDB(obj, dbName, collectionName) {
	MongoClient.connect(url, dbName, collectionName, obj, function(err, db) {
	  if (err) throw err;
	  var dbo = db.db(dbName);
	  dbo.collection(collectionName).insertOne(obj, function(err, res) {
	    if (err) throw err;
	    console.log("1 document inserted into db %s collection %s with ID %s", dbName, collectionName, res.id);
	    db.close();
	  });
	});	
}



app.get('/getAllRecipes', function(request, response) {
	let recipes = [
		{
			name: "cioppino", 
			ingredients: [
				{name:"Clam", quantity:"1 lbs"}, 
				{name: "Shrimp", quantity:"1 lbs"}, 
				{name: "Crab", quantity: "1 lbs"}, 
				{name: "Salmon", quantity: "1 lbs"}, 
				{name: "Tomatto", quantity: "28 ounce diced"}], 
			direction: "Heat the oil in a very large pot over medium heat. Add the fennel, onion, shallots, and salt and saute until the onion is translucent, about 10 minutes. Add the garlic and 3/4 teaspoon of red pepper flakes, and saute 2 minutes. Stir in the tomato paste. Add tomatoes with their juices, wine, fish stock and bay leaf. Cover and bring to a simmer. Reduce the heat to medium-low. Cover and simmer until the flavors blend, about 30 minutes.\nAdd the clams and mussels to the cooking liquid. Cover and cook until the clams and mussels begin to open, about 5 minutes. Add the shrimp and fish. Simmer gently until the fish and shrimp are just cooked through, and the clams are completely open, stirring gently, about 5 minutes longer (discard any clams and mussels that do not open). Season the soup, to taste, with more salt and red pepper flakes.\nLadle the soup into bowls and serve.",
			images: ["/static/cioppino.jpg"]

			},
			{
			name: "Skirt Steak Tacos", 
			ingredients: [
				{name:"Skirt steak", quantity:"1 lbs"}, 
				{name: "Coarsely chopped cilantro", quantity:"1/2 cup"}, 
				{name: "Avocado, sliced", quantity: "1/2 medium"}, 
				{name: "Fresh lime juice", quantity: "1/4 cup"}, 
				{name: "Olive oil", quantity: "1/4 cup"}], 
			direction: "Combine jalapeño, garlic, cilantro, lime juice, oil, salt, pepper, and cumin in a large resealable bag or bowl. Add steak and toss to coat; if using bowl, wrap with plastic. Marinate at least 30 minutes at room temperature or chill up to overnight in refrigerator, tossing occasionally.\nLet steak sit at room temperature 30 minutes before cooking if chilled. Prepare a grill or grill pan for medium-high heat. Remove steak from marinade, scraping off any bits that cling to meat; discard marinade. Grill steak 2–3 minutes per side for medium rare. Let rest 10 minutes before thinly slicing against the grain.\nAssemble the tacos:\nWarm tortillas in a microwave, oven, or over a gas flame. Divide steak among tortillas, then top with salsa, avocado, sour cream, queso fresco, if using, cilantro, and onion. Serve with lime wedges alongside.",
			images: ["/static/taco.jpg"]

			},
			{
			name: "Bruschetta", 
			ingredients: [
				{name:"Sun-dried tomatoes, packed in oil", quantity:"1/2 cup"}, 
				{name: "Tomatoes, chopped", quantity:"6 medium"}, 
				{name: "Fresh basil, stems removed", quantity: "1/4 cup"}, 
				{name: "Shredded mozzarella cheese", quantity: "2 cups"}, 
				{name: "Olive oil", quantity: "1/4 cup"}, 
				{name: "French baguette", quantity: "1"}], 
			direction: "Preheat the oven on broiler setting.\nIn a large bowl, combine the roma tomatoes, sun-dried tomatoes, garlic, olive oil, vinegar, basil, salt, and pepper. Allow the mixture to sit for 10 minutes.\nCut the baguette into 3/4-inch slices. On a baking sheet, arrange the baguette slices in a single layer. Broil for 1 to 2 minutes, until slightly brown.\nDivide the tomato mixture evenly over the baguette slices. Top the slices with mozzarella cheese.\nBroil for 5 minutes, or until the cheese is melted.",				
			images: ["/static/bruschetta.jpg"]

			},
		];
	response.send(recipes);
});


app.get('/', (request, response) => {
	response.render("index", {message: "Ban Can Code"});
});

app.post('/createRecipe', (request, response) => {
	console.log(request.body);
	recipeName = request.body["recipe[0][value]"];
	ingredients = request.body["recipe[1][value]"];
	images = request.body["recipe[2][value]"];
	direction = request.body["recipe[3][value]"];

 //  let recipeName = request.body.name;
 //  if (recipeName == null) {
	// response.statusCode = 500;
 //        return response.json({ error: "recipeName cannot be null!"});
 //  }
 //  if (ingredients == null) {
	// response.statusCode = 500;
 //        return response.json({ error: "ingredients cannot be null!"});
 //  }
 //  if (direction == null) {
	// response.statusCode = 500;
 //        return response.json({ error: "direction cannot be null!"});
 //  }
 //  if (images == null) {
	// response.statusCode = 500;
 //        return response.json({ error: "images cannot be null!"});
 //  }

  insertRecipe({name: recipeName, direction: direction, ingredients: ingredients, images: images});

  let message = {message: "Saved one recipe into database, give it a try and look things up!"};
  response.send(message);
});

app.listen(3000, function() {
	console.log('Node Server is up and listening to incoming requests on port 3000');
});
