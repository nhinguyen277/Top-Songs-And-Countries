const spotify='https://api.spotify.com';
// const fetch = require('node-fetch');
/*
Function for spotify API request
*/

async function getAccessToken() {
        const response = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + Buffer.from(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET).toString('base64')
        },
        body: 'grant_type=client_credentials'
    });

    const data = await response.json();
    return data.access_token;
}

//getAccessToken().then(token => console.log(token));

/*
Function to get an array of top artists in this country

*/
async function getPopularArtists(country){
const accessToken = await getAccessToken();
const reqUrl = `${spotify}/v1/search?q=artist&type=artist&market=${country}&limit=20`;
    const response = await fetch(reqUrl, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });
    const data = await response.json();
    // Filter artists by popularity (greater than 50)
    return data.artists.items.filter(artist => artist.popularity > 20)
  };
 //getPopularArtists('CA').then(artists=> console.log(artists));

// function to get an array of playlists in a country

async function getPlaylists(code,country_name){
    const accessToken = await getAccessToken();
    const reqUrl = `${spotify}/v1/search?q=top%2520songs%2520-%2520${country_name}&type=playlist&market=${code}&limit=1`
    const options={
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    };
    const response= await fetch(
        reqUrl,
        options
    );
    const data = await response.json();
    return data.playlists.items;
}
//getPlaylists('CA','Canada').then(playlists=> console.log(playlists));

async function getArtistSongs(artistId){
const accessToken = await getAccessToken();
const reqUrl = `${spotify}/v1/artists/${artistId}/top-tracks`;
const options={
    method: 'GET',
    headers: {
        'Authorization': `Bearer ${accessToken}`
    }
}
const response = await fetch(
    reqUrl,
    options
);
const data = await response.json();
return data.tracks;
}
//getArtistSongs('3kYFawNQVZ00FQbgs4rVBe').then(artist=>console.log(artist));

async function getArtist(artistId){
    const accessToken = await getAccessToken();
    const reqUrl = `${spotify}/v1/artists/${artistId}`;
    const options={
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    }
    const response = await fetch(
        reqUrl,
        options
    );
    const data = await response.json();
    return data;
    }


module.exports={
    getAccessToken,
    getPopularArtists,
    getPlaylists,
    getArtistSongs,
    getArtist
}