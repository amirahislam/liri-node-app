require("dotenv").config();

var keys = require('./keys.js');
// console.log(keys);

var Spotify = require('node-spotify-api');
var Twitter = require('twitter');

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var action = process.argv[2];
// var value = process.argv[3];


var request = require('request');
var fs = require('fs');

var nodeArgs = process.argv;
var search = "";



if(action === "my-tweets") {
    myTweet(); 

}
//Spotify 
else if(action === "spotify-this-song"){ 
    spotifyThis(); 
}
//Movies
else if(action === "movie-this"){
    movieThis();
}

//Random call
else if(action === "do-what-it-says")
{
    fs.readFile("random.txt", "utf8", function(error, data){
        if(error)
        {
            return console.log(error);
        }
        else
        {
            console.log(process.argv);
            console.log(data)
            var showData = data.split(",");
            console.log(showData[1])

            if(showData[0] === "my-tweets") {
                myTweet(); 
            
            }
            //Spotify 
            else if(showData[0] === "spotify-this-song"){ 
                process.argv[3] = showData[1];
                spotifyThis(); 
            }
            //Movies
            else if(showData[0] === "movie-this"){
                process.argv[3] = showData[1];
                movieThis();
            }


        }
    })
}


//myTweet function
function myTweet() {
    var params = {screen_name: 'amirahayesha'};

    client.get("statuses/user_timeline", params, function(error, tweets, response) {
        if(!error){
            for(var i =0; i < tweets.length; i ++){
            console.log(tweets[i].text)
            // console.log(tweets);
            console.log('Created_at:' + tweets[i].created_at.substring(0, 19));
            console.log('')
            console.log('My Last 20 Tweets:');
            console.log('--------------------------');

            }
        } else {
            console.log(error);
        };
        console.log('my-tweets')
});
};

//Spotify function
function spotifyThis () {
    for(var i = 2; i < nodeArgs.length; i++)
    {
        if (i > 3 && i < nodeArgs.length)
        {
            search = process.argv[3] + " " + nodeArgs[i];
        }
        else
        {
            search = process.argv[3]
        }
    }
    spotify.search({ type: 'track', query: search }, function(error, data) {
        if (error) 
        {
            console.log('Error occurred: ' + error);
            return;
        }
        else
        {
            for(var i = 0; i < 5; i++)
            {
                console.log(search)
                var song = data.tracks.items[i];
                console.log("----------------------------------");
                console.log("Artist: " + song.artists[0].name);
                console.log("Song: " + song.name);
                console.log("Preview URL: " + song.preview_url);
                console.log("Album: " + song.album.name);
            }
        }
    });
};

function movieThis() {
    for(var i = 2; i < nodeArgs.length; i++)
    {
        if (i > 3 && i < nodeArgs.length)
        {
            search = process.argv[3] + "+" + nodeArgs[i];
        }
        else
        {
            search = process.argv[3]
        }
    }
    request("http://www.omdbapi.com/?t=" + search + "&y=&plot=short&apikey=trilogy", function(error, response, body)
    {
        if(!error && response.statusCode === 200)
        {
            var body = JSON.parse(body);
            console.log("");
            console.log("Title: " + body.Title);
            console.log("");
            console.log("Year: " + body.Year);
            console.log("");
            console.log("IMDB rating: " + body.Ratings[0].Value);
            console.log("");
            console.log("Rotten Tomatoes Rating: " + body.Ratings[1].Value);
            console.log("");
            console.log("Country: " + body.Country);
            console.log("");
            console.log("Language: " + body.Language);
            console.log("");
            console.log("Plot: " + body.Plot);
            console.log("");
            console.log("Actors: " + body.Actors);
            console.log("");
        }
        else
        {
            console.log(error);
        }
    });
};