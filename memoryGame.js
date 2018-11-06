 $(function(){

    $( "#selectCardQuantity" ).change(function() {
		var numberOfCards = $(this).val();
		memoryGameInit(numberOfCards);
	});
});


/*****************************GAME LOGIC*****************************/

/**
 * pickCard: show frontCard and hide backCard, in case two frontCards active, call checkCardsCompability. 
 * @param  {Img} backcard
 * @return {Void}      
 */
function pickCard(backcard)
{
	var backCard  = $(backcard).parent();
	var frontCard = backCard.next();

	frontCard.addClass('active');
	var activeCards = $('.active');

	cardHide(backCard);
	cardShow(frontCard);

	if (activeCards.length == 2) {
		checkCardsCompability(activeCards);
		incrementNumberOfTries();
	}
}

/**
 * checkCardsCompability verifies if pairOfCards have the same img
 * @param  {Array} pairOfCards
 * @return {Void}
 */
function checkCardsCompability(pairOfCards)
{
	frontCard1 = pairOfCards.eq(0);
	frontCard2 = pairOfCards.eq(1);

	frontCard1.removeClass('active');
	frontCard2.removeClass('active');
	
	//pair of cards match
	if (frontCard1.attr('name') === frontCard2.attr('name')) {
		incrementNumberOfMatchedPairs();
		cardsAreCompatibleMsg();
		decrementNumberOfPairs();
		if (hasUserWon()) {
			userWonMsg();
		}

	}
	//pair of cards don't match
	else {
		setTimeout(function() {
			backCard1 = frontCard1.prev();
			backCard2 = frontCard2.prev();
			cardsAreNotCompatibleMsg();
			cardHide(frontCard1);
			cardHide(frontCard2);
			cardShow(backCard1);
			cardShow(backCard2);
		}, 1);
	}
}

/**
 * cardHide
 * @param  {Div} card
 * @return {Void}
 */
function cardHide(card)
{
	card.hide();
}

/**
 * cardShow
 * @param  {Div} card
 * @return {Void}
 */
function cardShow(card)
{
	card.show();
}

/**
 * hideAllFrontCards
 * @return {Void}
 */
function hideAllFrontCards()
{
	$(".frontCard").hide();
}

/**
 * incrementNumberOfTries
 * @return {Void}                  
 */
function incrementNumberOfTries()
{
	var numberOfTries = Number($('#numberOfTries').text());
	numberOfTries++;
	$('#numberOfTries').text(numberOfTries);	
}

/**
 * incrementNumberOfMatchedPairs
 * @return {Void}
 */
function incrementNumberOfMatchedPairs()
{
	var numberOfMatchedPairs = Number($('#numberOfMatchedPairs').text());
	numberOfMatchedPairs++;
	$('#numberOfMatchedPairs').text(numberOfMatchedPairs);	
}

/**
 * decrementNumberOfPairs
 * @return {Void}
 */
function decrementNumberOfPairs()
{
	var numberOfPairs = Number($('#numberOfPairs').text());
	numberOfPairs--;
	$('#numberOfPairs').text(numberOfPairs);		
}

/**
 * initializeNumberOfTries
 * @return {Void}
 */
function initializeNumberOfTries()
{
	$('#numberOfTries').text('0');
}
/**
 * initializeNumberOfMatchedPairs
 * @return {Void}
 */
function initializeNumberOfMatchedPairs()
{
	$('#numberOfMatchedPairs').text('0');
}

/**
 * initializeNumberOfPairs
 * @return {Void}
 */
function initializeNumberOfPairs(numberOfCards)
{
	$('#numberOfPairs').text(numberOfCards/2);
}

/**
 * getNumberOfHiddenPairs
 * @return {Int}
 */
function getNumberOfHiddenPairs()
{
	return Number($('#numberOfPairs').text());	
}

/**
 * hasUserWon
 * @return {Boolean}
 */
function hasUserWon()
{
	if (getNumberOfHiddenPairs()===0) {
		return true;
	}
	return false;
}
/*************************GAME MESSAGES******************************/
/**
 * cardsAreCompatibleMsg
 * @return {Void}
 */
function cardsAreCompatibleMsg()
{
	alert("Congratulations. You've just matched a pair of cards. :)");
}

/**
 * cardsAreNotCompatibleMsg
 * @return {Void}
 */
function cardsAreNotCompatibleMsg()
{
	alert("Whoops. Unfortunately, the pair of cards don't match. Try again!");	
}

/**
 * userWonMsg
 * @return {Void}
 */
function userWonMsg()
{
	swal({
  		title: "You win. :)",
  		text: "Congratulations! You got them all.",
  		imageUrl: "https://image.redbull.com/rbcom/010/2014-08-14/1331671338718_2/0010/1/800/533/1/pokemon-world-championships-trophy.jpg"
	});
}

/**************************BUILD GAME BOARD (GRID)*******************/
/**
 * memoryGameInit: Sets everything required to start the game
 * @param  {Int} numberOfCards
 * @return {Void}
 */
function memoryGameInit(numberOfCards)
{
  	var frontCardsImgs = selectedImgsForGrid(numberOfCards);
  	var backCardImg    = getBackCardImg();
  	var grid           = buildGrid(numberOfCards,frontCardsImgs,backCardImg);
  	
  	initializeNumberOfTries();
  	initializeNumberOfMatchedPairs();
  	initializeNumberOfPairs(numberOfCards);

  	
  	$('#memoryGameGrid').html(grid);
  	hideAllFrontCards();
}

/**
 * buildGrid
 * @param  {Int} numberOfCards
 * @param  {Array} frontCardsImgs
 * @param  {String} backCardImg
 * @return {String}
 */
function buildGrid(numberOfCards,frontCardsImgs,backCardImg)
{
	var grid = '';
	var frontCardImg;
	for (var i = 0 ; i < numberOfCards ; i++) {
  		frontCardImg = frontCardsImgs[i];
  		grid += '<div class="col-lg-2 col-sm-3 col-xs-4">' 
  						+'<div class="backCard">'+
             				'<img src="'+ backCardImg +'" class="thumbnail cardImg" onclick="pickCard(this);"> '
        				+'</div>' 
  				
  			        	+'<div class="frontCard" name="'+ frontCardImg  +'" >'+
             				'<img src="'+ frontCardImg +'"  class="thumbnail cardImg">'
        				+'</div>' 	
   	 			+'</div>';
  	}

  	return grid;
}

/**
 * getFrontCardsImgs
 * @return {Array}
 */
function getFrontCardsImgs()
{
 	var imageSource = [

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
		"https://img.pokemondb.net/artwork/weedle.jpg",
		"https://img.pokemondb.net/artwork/kakuna.jpg",
		"https://img.pokemondb.net/artwork/beedrill.jpg",
		"https://img.pokemondb.net/artwork/pidgey.jpg",
		"https://img.pokemondb.net/artwork/pidgeotto.jpg",
		"https://img.pokemondb.net/artwork/pidgeot.jpg",
		"https://img.pokemondb.net/artwork/rattata.jpg",
		"https://img.pokemondb.net/artwork/raticate.jpg",
		"https://img.pokemondb.net/artwork/spearow.jpg",
		"https://img.pokemondb.net/artwork/fearow.jpg",
		"https://img.pokemondb.net/artwork/ekans.jpg",
		"https://img.pokemondb.net/artwork/arbok.jpg",
		"https://img.pokemondb.net/artwork/pikachu.jpg",
		"https://img.pokemondb.net/artwork/raichu.jpg",
		"https://img.pokemondb.net/artwork/sandshrew.jpg",
		"https://img.pokemondb.net/artwork/sandslash.jpg",
		"https://img.pokemondb.net/artwork/nidoran-f.jpg",
		"https://img.pokemondb.net/artwork/nidorina.jpg",
		"https://img.pokemondb.net/artwork/nidoqueen.jpg",
		"https://img.pokemondb.net/artwork/nidoran-m.jpg",
		"https://img.pokemondb.net/artwork/nidorino.jpg",
		"https://img.pokemondb.net/artwork/nidoking.jpg",
		"https://img.pokemondb.net/artwork/clefairy.jpg",
		"https://img.pokemondb.net/artwork/clefable.jpg",
		"https://img.pokemondb.net/artwork/vulpix.jpg",
		"https://img.pokemondb.net/artwork/ninetales.jpg",
		"https://img.pokemondb.net/artwork/jigglypuff.jpg",
		"https://img.pokemondb.net/artwork/wigglytuff.jpg",
		"https://img.pokemondb.net/artwork/zubat.jpg",
		"https://img.pokemondb.net/artwork/golbat.jpg",
		"https://img.pokemondb.net/artwork/oddish.jpg",
		"https://img.pokemondb.net/artwork/gloom.jpg",
		"https://img.pokemondb.net/artwork/vileplume.jpg",
		"https://img.pokemondb.net/artwork/paras.jpg",
		"https://img.pokemondb.net/artwork/parasect.jpg",
		"https://img.pokemondb.net/artwork/venonat.jpg",
		"https://img.pokemondb.net/artwork/venomoth.jpg",
		"https://img.pokemondb.net/artwork/diglett.jpg",
		"https://img.pokemondb.net/artwork/dugtrio.jpg",
		"https://img.pokemondb.net/artwork/meowth.jpg",
		"https://img.pokemondb.net/artwork/persian.jpg",
		"https://img.pokemondb.net/artwork/psyduck.jpg",
		"https://img.pokemondb.net/artwork/golduck.jpg",
		"https://img.pokemondb.net/artwork/mankey.jpg",
		"https://img.pokemondb.net/artwork/primeape.jpg",
		"https://img.pokemondb.net/artwork/growlithe.jpg",
		"https://img.pokemondb.net/artwork/arcanine.jpg",
		"https://img.pokemondb.net/artwork/poliwag.jpg",
		"https://img.pokemondb.net/artwork/poliwhirl.jpg",
		"https://img.pokemondb.net/artwork/poliwrath.jpg",
		"https://img.pokemondb.net/artwork/abra.jpg",
		"https://img.pokemondb.net/artwork/kadabra.jpg",
		"https://img.pokemondb.net/artwork/alakazam.jpg",
		"https://img.pokemondb.net/artwork/machop.jpg",
		"https://img.pokemondb.net/artwork/machoke.jpg",
		"https://img.pokemondb.net/artwork/machamp.jpg",
		"https://img.pokemondb.net/artwork/bellsprout.jpg",
		"https://img.pokemondb.net/artwork/weepinbell.jpg",
		"https://img.pokemondb.net/artwork/victreebel.jpg",
		"https://img.pokemondb.net/artwork/tentacool.jpg",
		"https://img.pokemondb.net/artwork/tentacruel.jpg",
		"https://img.pokemondb.net/artwork/geodude.jpg",
		"https://img.pokemondb.net/artwork/graveler.jpg",
		"https://img.pokemondb.net/artwork/golem.jpg",
		"https://img.pokemondb.net/artwork/ponyta.jpg",
		"https://img.pokemondb.net/artwork/rapidash.jpg",
		"https://img.pokemondb.net/artwork/slowpoke.jpg",
		"https://img.pokemondb.net/artwork/slowbro.jpg",
		"https://img.pokemondb.net/artwork/magnemite.jpg",
		"https://img.pokemondb.net/artwork/magneton.jpg",
		"https://img.pokemondb.net/artwork/farfetchd.jpg",
		"https://img.pokemondb.net/artwork/doduo.jpg",
		"https://img.pokemondb.net/artwork/dodrio.jpg",
		"https://img.pokemondb.net/artwork/seel.jpg",
		"https://img.pokemondb.net/artwork/dewgong.jpg",
		"https://img.pokemondb.net/artwork/grimer.jpg",
		"https://img.pokemondb.net/artwork/muk.jpg",
		"https://img.pokemondb.net/artwork/shellder.jpg",
		"https://img.pokemondb.net/artwork/cloyster.jpg",
		"https://img.pokemondb.net/artwork/gastly.jpg",
		"https://img.pokemondb.net/artwork/haunter.jpg",
		"https://img.pokemondb.net/artwork/gengar.jpg",
		"https://img.pokemondb.net/artwork/onix.jpg",
		"https://img.pokemondb.net/artwork/drowzee.jpg",
		"https://img.pokemondb.net/artwork/hypno.jpg",
		"https://img.pokemondb.net/artwork/krabby.jpg",
		"https://img.pokemondb.net/artwork/kingler.jpg",
		"https://img.pokemondb.net/artwork/voltorb.jpg",
		"https://img.pokemondb.net/artwork/electrode.jpg",
		"https://img.pokemondb.net/artwork/exeggcute.jpg",
		"https://img.pokemondb.net/artwork/exeggutor.jpg",
		"https://img.pokemondb.net/artwork/cubone.jpg",
		"https://img.pokemondb.net/artwork/marowak.jpg",
		"https://img.pokemondb.net/artwork/hitmonlee.jpg",
		"https://img.pokemondb.net/artwork/hitmonchan.jpg",
		"https://img.pokemondb.net/artwork/lickitung.jpg",
		"https://img.pokemondb.net/artwork/koffing.jpg",
		"https://img.pokemondb.net/artwork/weezing.jpg",
		"https://img.pokemondb.net/artwork/rhyhorn.jpg",
		"https://img.pokemondb.net/artwork/rhydon.jpg",
		"https://img.pokemondb.net/artwork/chansey.jpg",
		"https://img.pokemondb.net/artwork/tangela.jpg",
		"https://img.pokemondb.net/artwork/kangaskhan.jpg",
		"https://img.pokemondb.net/artwork/horsea.jpg",
		"https://img.pokemondb.net/artwork/seadra.jpg",
		"https://img.pokemondb.net/artwork/goldeen.jpg",
		"https://img.pokemondb.net/artwork/seaking.jpg",
		"https://img.pokemondb.net/artwork/staryu.jpg",
		"https://img.pokemondb.net/artwork/starmie.jpg",
		"https://img.pokemondb.net/artwork/mr-mime.jpg",
		"https://img.pokemondb.net/artwork/scyther.jpg",
		"https://img.pokemondb.net/artwork/jynx.jpg",
		"https://img.pokemondb.net/artwork/electabuzz.jpg",
		"https://img.pokemondb.net/artwork/magmar.jpg",
		"https://img.pokemondb.net/artwork/pinsir.jpg",
		"https://img.pokemondb.net/artwork/tauros.jpg",
		"https://img.pokemondb.net/artwork/magikarp.jpg",
		"https://img.pokemondb.net/artwork/gyarados.jpg",
		"https://img.pokemondb.net/artwork/lapras.jpg",
		"https://img.pokemondb.net/artwork/ditto.jpg",
		"https://img.pokemondb.net/artwork/eevee.jpg",
		"https://img.pokemondb.net/artwork/vaporeon.jpg",
		"https://img.pokemondb.net/artwork/jolteon.jpg",
		"https://img.pokemondb.net/artwork/flareon.jpg",
		"https://img.pokemondb.net/artwork/porygon.jpg",
		"https://img.pokemondb.net/artwork/omanyte.jpg",
		"https://img.pokemondb.net/artwork/omastar.jpg",
		"https://img.pokemondb.net/artwork/kabuto.jpg",
		"https://img.pokemondb.net/artwork/kabutops.jpg",
		"https://img.pokemondb.net/artwork/aerodactyl.jpg",
		"https://img.pokemondb.net/artwork/snorlax.jpg",
		"https://img.pokemondb.net/artwork/articuno.jpg",
		"https://img.pokemondb.net/artwork/zapdos.jpg",
		"https://img.pokemondb.net/artwork/moltres.jpg",
		"https://img.pokemondb.net/artwork/dratini.jpg",
		"https://img.pokemondb.net/artwork/dragonair.jpg",
		"https://img.pokemondb.net/artwork/dragonite.jpg",
		"https://img.pokemondb.net/artwork/mewtwo.jpg",
		"https://img.pokemondb.net/artwork/mew.jpg"
 	];

 	return shuffle(imageSource);
}

/**
 * getCardBackImg
 * @return {String} 
 */
function getBackCardImg()
{
	return "http://thecraftchop.com/files/others/Pokeball.svg";
}

/**
 * selectedImgsForGrid:
 * @param  {Int} numberOfCards 
 * @return {Array} selectedImgs
 */
function selectedImgsForGrid(numberOfCards)
{
	var cards = numberOfCards/2;
	var photos = getFrontCardsImgs();
	var selectedImgs = [];
	var i;

	
	for (i = 0 ; i < cards ; i++) {
		selectedImgs.push(photos[i]);
		selectedImgs.push(photos[i]);	
	}

	shuffle(selectedImgs);

	return selectedImgs;
}



/**
 * shuffle Source: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
 * @param  {Array} array
 * @return {Array}
 */
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

