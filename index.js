//import required modules
const express = require("express");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config(); 
const ip = require("./modules/ip/api");
const spotify = require("./modules/spotify/api");
//set up Express object and port
const app = express();
const port = process.env.PORT || 8888;

//define important folders
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
//setup public folder
app.use(express.static(path.join(__dirname, "public")));

//PAGE ROUTES
app.get("/", async (request, response) => {
    let country = await ip.getIP();
    let artist = await spotify.getPopularArtists(country.country_code);
    let playlist = await spotify.getPlaylists(country.country_code,country.country_name);
    //  console.log('api:'+ country.country_code);
    //  console.log('name:'+ country.country_name);
    // console.log('playlist:'+ playlist[0].name);
    //response.status(200).send(country);
    response.render("index", { title: "Country Code", code:country ,artists:artist, list:playlist});
  });

  app.get("/artist/:id", async (request, response) => {
    let artists = await spotify.getArtist(request.params.id);
    let songs = await spotify.getArtistSongs(request.params.id);
    // console.log(request.params.id);
    // console.log(songs[0].name);
    response.render("artist", { title: "Artists' Top Songs", song:songs, artist:artists});
  });

  app.get("/about", async (request,response) => {
     response.render("about", {title: "About Us"});
   });
   app.get("/contact", async (request,response) => {
    response.render("contact", {title: "Contact"});
  });
//set up server listening
app.listen(port, () => {
 console.log(`Listening on http://localhost:${port}`);
});