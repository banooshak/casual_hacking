$(document).ready(
	function(){
		var url = "/getAllRecipes";
	    url = encodeURI(url);	
	    //callByAjax(url);
	    //callByGet(url);
	    //callByGetJSON(url);
	    callByAjaxPromise(url);

		$("form#createRecipe").submit(function(e){
			e.preventDefault();
			createRecipe();
		});	

	}
);


//////////////////////////Post
function createRecipe(){
	console.log("heee");
	var bodyData = $("form#createRecipe").serializeArray();
	console.log(bodyData);
	var urlAction = $("form#createRecipe").attr("action");
	// createByAjaxPost(urlAction, bodyData);
	createByPromisPost(urlAction, bodyData);
}

function createByAjaxPost(url,bodyData){
	$.ajax({
		url:url,
		type: "post",
		data: bodyData,
		success: function(data){
			console.info(data);
			// renderMessage("/getAllRecipes");
		},
		dataType: "json"
	});
}

function createByPromisPost(url, bodyData){
	$.ajax({url: url, data:bodyData, type: "post"}).done(function(data){
		console.info(data);
	}).fail(function(e) {
			console.error(e);
  	});
}

function renderMessage(url){
	callByAjax(url);
}

//////////////////////////Get
function callByAjax(url){
	$.ajax({
		url: url,
		type: "get",
		success: renderRecipes,
		dataType: "json"
	});
}


function callByGet(url){
	$.get(url, renderRecipes, "json");
}

function callByGetJSON(url){
	$.getJSON(url, renderRecipes);
}

function callByAjaxPromise(url){
	$.ajax(url).done(renderRecipes).fail(function(e) {
			console.error(e);
  		});
}

function renderRecipes(data){
	console.info(data);

	for(var i=0; i<data.length; i++){
		$("div#main").append("<div id=\"container"+[i+1]+ "\" class=\"container\"></div>");
		$("div#container"+[i+1]).append("<div class=\"image\"></div>");
		$.each(data[i].images , function(j,image) {
			$("div#container"+[i+1] + " div.image").append("<img src=\"" + image + "\" />");
		});

		$("div#container"+[i+1]).append("<h2>" + data[i].name + "</h2>");

		$("div#container"+[i+1]).append("<h3>Ingredients: </h3>");

		$("div#container"+[i+1]).append("<div class=\"ingredients\"></div>");
		$.each(data[i].ingredients , function(j,ingredient) {
			$("div#container"+[i+1]+ " div.ingredients").append("<p>"+ingredient.quantity+" of "+ingredient.name+"</p>");
		});

		$("div#container"+[i+1]).append("<h3>Direction: </h3>");

		$("div#container"+[i+1]).append("<div class=\"direction\"></div>");
		
		$("div#container"+[i+1]+ " div.direction").append("<p>"+data[i].direction+"</p>");
		
		
	}
	
	
}