 $(function(){

    $( "#selectCardQuantity" ).change(function() {
		var numberOfCards = $(this).val();
		memoryGameInit(numberOfCards);
	});
});




/*****************************GLOBAL VARIABLES***********************/
var facedUpCards = 0, userName = '', 
	startTime = null, endTime = null;

/*****************************GAME LOGIC*****************************/
/**
 * pickCard: show frontCard and hide backCard, in case two frontCards active, call checkCardsCompability. 
 * @param  {Img} backcard
 * @return {Void}      
 */
function pickCard(backcard)
{	
	facedUpCards++;
	var backCard  = $(backcard).parent();
	var frontCard = backCard.next();
	var activeCards = $('.active');
	
	if (activeCards.length < 2) {
		frontCard.addClass('active');
		cardHide(backCard);
		cardShow(frontCard);

	}

	activeCards = $('.active');

	if (activeCards.length == 2 && facedUpCards == 2) {
		setTimeout(function() { checkCardsCompability(activeCards);}, 2000);
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
			stopTimer();
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
	facedUpCards = 0;
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
	return getNumberOfHiddenPairs() === 0;
}

/**
 * getUserScoreData
 *
 * @return  {Object}
 */
function getUserScoreData()
{
	return {
		name: userName,
		difficulty: $( "#selectCardQuantity option:selected" ).text(),
		tries: parseInt($('#numberOfTries').text()),
		timing: getUserTimer(endTime-startTime)
	}
}
/*************************TIMER**************************************/


/**
 * startTimer : set Initial gaming time
 *
 * @return  {Void}
 */
function startTimer()
{
	startTime = getTimer();
}

/**
 * stopTimer : set game final time (When user beats the game). 
 *
 * @return  {Void}
 */
function stopTimer()
{
	endTime = getTimer();
}

/**
 * getTimer return timing in milliseconds.
 *
 * @return  {DOMHighResTimeStamp}
 */
function getTimer()
{
	return performance.now();
}

/**
 * getUserTimer 
 * source: https://stackoverflow.com/questions/19700283/how-to-convert-time-milliseconds-to-hours-min-sec-format-in-javascript
 *
 * @param   {int}  millisec 
 *
 * @return  {timestamp}
 */
function getUserTimer(millisec) {

	var seconds = (millisec / 1000).toFixed(0);
	var minutes = Math.floor(seconds / 60);
	var hours = "";
	if (minutes > 59) {
		hours = Math.floor(minutes / 60);
		hours = (hours >= 10) ? hours : "0" + hours;
		minutes = minutes - (hours * 60);
		minutes = (minutes >= 10) ? minutes : "0" + minutes;
	}

	seconds = Math.floor(seconds % 60);
	seconds = (seconds >= 10) ? seconds : "0" + seconds;
	if (hours != "") {
		return hours + ":" + minutes + ":" + seconds;
	}
	return minutes + ":" + seconds;
}

/*************************MESSAGES AND SAVE RECORD********************/
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
	Swal.fire({
  		title: "You win. :)",
  		text: "Congratulations! You got them all.",
  		imageUrl: "https://image.redbull.com/rbcom/010/2014-08-14/1331671338718_2/0010/1/800/533/1/pokemon-world-championships-trophy.jpg"
	}).then(()=> {
		saveRecord();
	})
}

/**
 * savingRecord
 *
 * @return  {Void}
 */
function saveRecord()
{
	Swal.fire({
		title: "Type you nickname to save your record.",
		input: "text",
		inputValidator: (value) => {
			if (!value) {
				return !value && 'You need to write something!';
			}
			if (value.length > 25) {
				return value.length > 25 && 'Max of 25 characters are allowed for nicknames.';
			}
		}
  	}).then((data) => {
		//setting global userName variable
		userName = data.value;
		saveScore(getUserScoreData());
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
	if (numberOfCards) {
		$('#rankingDiv').show();
	}
	else {
		$('#rankingDiv').hide();
	}
  	$('#memoryGameGrid').html(grid);
	hideAllFrontCards();
	startTimer();  
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
  		grid += '<div class="col-md-2 col-sm-4 col-xs-6">' 
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
	return "images/Pokeball.svg";
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

