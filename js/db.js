// Initialize Firebase
var config = {
	apiKey: "AIzaSyAMay11Ym3Q_EMkwvILpAnGBms77zfA7H8",
	authDomain: "pok-memory-game.firebaseapp.com",
	databaseURL: "https://pok-memory-game.firebaseio.com",
	projectId: "pok-memory-game",
	storageBucket: "pok-memory-game.appspot.com",
	messagingSenderId: "517490861863"
};

firebase.initializeApp(config);

var database = firebase.database();
var ref = database.ref('scores/');


function saveScore(data)
{
	ref.push(data);
}

function getScores()
{
	var scores;

	ref.orderByChild('tries').on('value', function(data) { 
		scores = data.val();
		out = [];
		var keys = Object.keys(scores);
		
		for(let i = 0 ; i < keys.length ; i++) {
			k = keys[i];
			if (scores[k].difficulty == $( "#selectCardQuantity option:selected" ).text()){
				out.push(scores[k]);
			}
		}

		out.sort(function(a,b){
			if(a.tries === b.tries) {
				return a.timing > b.timing ? 1 : -1;
			}
			return a.tries > b.tries ? 1 : -1;
		});

		let html = "<table class='scoreTable'>";

		for(let i = 0; i < out.length; i++) {
			
			html += "<tr>";
			html += "<td>" + (i+1) + ".</td>";
			html += "<td>" + out[i].name + "</td>";
			html += "<td>" + out[i].tries + " attempts</td>";
			html += "<td>" + out[i].timing + "</td>";
			html += "</tr>";
		}

		html += "</table>";

		swal({
			imageUrl: 'images/ranking.png',
			imageAlt: 'ranking image',
			animation: false,
			customClass: 'animated bounceInUp',
			html: html
		})
	});
}