var reqKeys = require("./keys.js")
var userInput = process.argv;
var inputArgument = 0;


//Twitter____=================================================================================

	var reqTwitter = require("twitter");
	var twitterHandle = "";

	function twitter() {
		var client = new Twitter({
				consumer_key: key.twitterKeys.consumer_key,
				consumer_secret: key.twitterKeys.consumer_secret,
				access_token_key: key.twitterKeys.access_token_key,
				access_token_secret: key.twitterKeys.access_token_secret
		});

			for (var i=3; i<userInput.length; i++){
				if(i>3 && i<userInput.length) {
					twitterHandle = twitterHandle + " " + userInput[i];
				} else {
					twitterHandle += userInput[i];
				};
			}
			if(process.argv[3] == null && inputArgument === 0) {
				twitterHandle = "foodtruckboy1";
			}
			console.log(twitterHandle);

		client.get("search/tweets", {q: twitterHandle, count: 20}, function(error, tweets, response) {
			for(var i=0; i<tweets.statuses.length; i++) {
				console.log("Tweet: " + tweets.statuses[i].text);
				console.log("Tweeted at: " + tweets.statuses[i].created_at);
				console.log("--------------------\n")
			}
		});
	};


//Spotify____=================================================================================
	inputSong = "";
	nameSong;
	nameArtist;
	nameAlbum;
	nameSongPreview;


	function spotifyThisSong() {
		var spotify =new Spotify ({
				id: key.spotifyKeys.id,
				secret: key.spotifyKeys.secret
		});

			for (var i=3; i<userInput.length; i++){
				if(i>3 && i<userInput.length) {
					inputSong = inputSong + " " + userInput[i];
				} else {
					inputSong += userInput[i];
				};
			}
			if(process.argv[3] == null && inputArgument === 0) {
				inputSong = "Weird Fishes/ Arpeggi";
			}
			console.log(inputSong);

		spotify.search({type: "track", query: inputSong}, function(err, response) {
			if(err) {
				return console.log("Error: " + err);
			}

			nameSong = JSON.stringify(response.tracks.items[0].name, null, 2);
			nameArtist = JSON.stringify(response.tracks.items[0].artists[0].name, null, 2);
			nameAlbum = JSON.stringify(response.tracks.items[0].album.name, null, 2);
			nameSongPreview = JSON.stringify(response.tracks.items[0].preview_url, null, 2);
			console.log("\n Song: " + nameSong);
			console.log("\n Artist: " + nameArtist);
			console.log("\n Album: " + nameAlbum);
			console.log("\n Preview: " + nameSongPreview);
			console.log("--------------------\n")
		});
	};


//I/OMDB____==================================================================================

	var nameMovie = "";
	var queryUrl;
	var reqOMDB = require("request");

	function movieThis() {
			for (var i=3; i<userInput.length; i++){
				if(i>3 && i<userInput.length) {
					nameMovie = nameMovie + " " + userInput[i];
				} else {
					nameMovie += userInput[i];
				};
			}
			if(process.argv[3] == null && inputArgument === 0) {
				nameMovie = "Girl with the Dragon Tattoo";
			}
			console.log(nameMovie);

		queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";

		request(queryUrl, function(error, response, body) {
			if (!error && response.statusCode === 200) {
				console.log("\n Movie: " + JSON.parse(body).Title);
				console.log("\n Year: " + JSON.parse(body).Year);
				console.log("\n Rated: " + JSON.parse(body).Rated);
				console.log("\n IMDB rating: " + JSON.parse(body).Ratings[0].Value);
				console.log("\n RT rating: " + JSON.parse(body).Ratings[1].Value);
				console.log("\n From: " + JSON.parse(body).Country);
				console.log("\n Language: " + JSON.parse(body).Language);
				console.log("\n Plot: " + JSON.parse(body).Plot);
				console.log("\n Actors: " + JSON.parse(body).Actors);
			};
		})
	};

//Do what it says____=========================================================================

	var fs = require("fs");

	function doWhatItSays() {
		fs.readFile("commands.txt", "utf8", function(error, data) {
			if(error) {
				return console.log(error);
			}
		inputArgument = data.split(", ");
		console.log(inputArgument)
			if(inputArgument[0] === "my-tweets") {
				twitterHandle = inputArgument[1];
				twitter();
			} else 
			if (inputArgument[0] === "spotify-this-song") {
				inputSong = inputArgument[1];
				spotifyThisSong();
			} else
			if (inputArgument[0] === "movie-this-") {
				nameMovie = inputArgument[1];
				movieThis();
			};
		});
	};


//Instigate____===============================================================================

	if (process.argv[2] === "my-tweets") {
		console.log("A selection of my tweets: ")
		twitter();
	} else
	if (process.argv[2] === "spotify-this-song") {
		console.log("A song by one of the best bands ever: ")
		spotifyThisSong();
	} else
	if (process.argv[2] === "movie-this") {
		console.log("Fantastic novel and film: ")
		movieThis();
	}

	else 
		if(process.argv[2] === "do-what-it-says") {
		console.log("calling doWhatItSays")
		doWhatItSays();
	}





