 $(function(){

    $( "#selectCardQuantity" ).change(function() {
  		var gridCell  = '';
  		var photos = selectedPhotosForGrid($(this).val()),photo;

  		for (var i = 0 ; i < $(this).val() ; i++) {
  			photo = photos[i];
  			gridCell += '<div class="col-lg-2 col-sm-3 col-xs-4">' 
  						+'<div class="fakePhoto">'+

             				'<img src=""  id="hi" class="thumbnail">'
        				+'</div>' 
  				
  			        	+'<div class="lala" >'+
             				'<img src="'+ photo +'"  class="thumbnail">'
        				+'</div>' 	
   	 			+'</div>';
  		}
  		$('#memoryGameGrid').html(gridCell);
  		$(".lala").hide();

	});

	$(".fakePhoto").click(function() {

  		console.log('Olá');
	});
});

function getPhotos()
{
 	var pokemons = [

 		"https://img.pokemondb.net/artwork/bulbasaur.jpg",
		"https://img.pokemondb.net/artwork/ivysaur.jpg",
		"https://img.pokemondb.net/artwork/venusaur.jpg",
		"https://img.pokemondb.net/artwork/charmander.jpg",
		"https://img.pokemondb.net/artwork/charmeleon.jpg",
		"https://img.pokemondb.net/artwork/charizard.jpg",
		"https://img.pokemondb.net/artwork/squirtle.jpg",
		"https://img.pokemondb.net/artwork/wartortle.jpg",
		"https://img.pokemondb.net/artwork/blastoise.jpg",
		"https://img.pokemondb.net/artwork/caterpie.jpg",
		"https://img.pokemondb.net/artwork/metapod.jpg",
		"https://img.pokemondb.net/artwork/butterfree.jpg",
		"https://img.pokemondb.net/artwork/pidgey.jpg",
		"https://img.pokemondb.net/artwork/pidgeotto.jpg",
		"https://img.pokemondb.net/artwork/pidgeot.jpg",
		"https://img.pokemondb.net/artwork/pikachu.jpg",
		"https://img.pokemondb.net/artwork/raichu.jpg",
		"https://img.pokemondb.net/artwork/psyduck.jpg",
		"https://img.pokemondb.net/artwork/golduck.jpg",
		"https://img.pokemondb.net/artwork/onix.jpg",
		"https://img.pokemondb.net/artwork/krabby.jpg",
		"https://img.pokemondb.net/artwork/kingler.jpg",
		"https://img.pokemondb.net/artwork/magikarp.jpg",
		"https://img.pokemondb.net/artwork/gyarados.jpg"
 	];

 	return pokemons;
}

function selectedPhotosForGrid(numberOfCards)
{
	var cards = numberOfCards/2;
	var photos = getPhotos();
	var selectedPhotos = [];
	var i;

	
	for (i = 0 ; i < cards ; i++) {
		selectedPhotos.push(photos[i]);
		selectedPhotos.push(photos[i]);	
	}

	shuffle(selectedPhotos);

	//console.log(selectedPhotos);

	return selectedPhotos;
}


//https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array) 
{
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

