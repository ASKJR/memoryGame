 $(function(){

    $( "#selectCardQuantity" ).change(function() {
		var numberOfCards = $(this).val();
		memoryGameInit(numberOfCards);
	});

});


/*****************************GAME LOGIC*****************************/
function pickCard(card)
{
	var backCard  = $(card).parent();
	var frontCard = backCard.next();

	frontCard.addClass('active');
	var numActiveCards = $('.active');

	cardHide(backCard);
	cardShow(frontCard);

	if (numActiveCards.length == 2) {
		numActiveCards.eq(0).removeClass('active');
		numActiveCards.eq(1).removeClass('active');
		
		if (numActiveCards.eq(0).attr('name') === numActiveCards.eq(1).attr('name')) {
			alert('Its a match');
		}
		else {
			//back
			//front
			backCard1 = numActiveCards.eq(0).prev();
			backCard2 = numActiveCards.eq(1).prev();
			cardHide(numActiveCards.eq(0));
			cardHide(numActiveCards.eq(1));
			cardShow(backCard1);
			cardShow(backCard2);
			
			alert('you fail');
		}
	}
}

function cardHide(card)
{
	card.hide();
}

function cardShow(card)
{
	card.show();
}

function hideAllFrontCards()
{
	$(".frontCard").hide();
}



/**************************BUILD GAME BOARD (GRID)*******************/

function memoryGameInit(numberOfCards)
{
  	var frontCardsImgs = selectedImgsForGrid(numberOfCards);
  	var backCardImg    = getCardBackImg();
  	var grid           = buildGrid(numberOfCards,frontCardsImgs,backCardImg);

  	$('#memoryGameGrid').html(grid);
  	hideAllFrontCards();
}

function buildGrid(numberOfCards,frontCardsImgs,backCardImg)
{
	var grid = '';
	var frontCardImg;
	for (var i = 0 ; i < numberOfCards ; i++) {
  		frontCardImg = frontCardsImgs[i];
  		grid += '<div class="col-lg-2 col-sm-3 col-xs-4">' 
  						+'<div class="backCard">'+
             				'<img src="'+ backCardImg +'" class="thumbnail" onclick="pickCard(this);"> '
        				+'</div>' 
  				
  			        	+'<div class="frontCard" name="'+ frontCardImg  +'" >'+
             				'<img src="'+ frontCardImg +'"  class="thumbnail">'
        				+'</div>' 	
   	 			+'</div>';
  	}

  	return grid;
}


function getCardsFrontImgs()
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

function getCardBackImg()
{
	return "http://thecraftchop.com/files/others/Pokeball.svg";
}

function selectedImgsForGrid(numberOfCards)
{
	var cards = numberOfCards/2;
	var photos = getCardsFrontImgs();
	var selectedPhotos = [];
	var i;

	
	for (i = 0 ; i < cards ; i++) {
		selectedPhotos.push(photos[i]);
		selectedPhotos.push(photos[i]);	
	}

	shuffle(selectedPhotos);

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

