import express from 'express';
import Helper from '../helperFunctions.js';
import Authenticator from '../authentication.js';
import { HOME_HEADER, RESULTS_HEADER, SONG_INFO_HEADER } from '../constants.js';
import FavoriteSongsDAO from '../DB/favoriteSongsDAO.js';

const router = express.Router();

// Shows the user a list of songs according to their search query
router.get("/song-search-results", async (req, res) => {
  const songName = req.query["song-name"];
  const artistName = req.query["artist-name"];
  if (!songName) {
    const randSuggestedArtists = await Helper.getRandomSuggestedArtists();
    return res.render("home", {
      artistSuggestions: randSuggestedArtists,
      headerText: HOME_HEADER,
      user: req.user,
    });
  }

  const songs = await Helper.getSongs(songName, artistName);
  // console.log(req.user);
  return res.render("song-results", {
    songs: songs,
    headerText: RESULTS_HEADER,
    user: req.user,
    inModal: false
  });
});

// Used when searching for a song to add into a playlist
router.get("/modal-song-search-results", async (req, res) => {
  const songName = req.query["song-name"];
  const artistName = req.query["artist-name"];
  const playlistId = req.query['playlistId'];
  // console.log(playlistId);
  if (!songName) {
    return res.status(400).send("No search parameters provided.");
  }

  const songs = await Helper.getSongs(songName, artistName);
  res.render("partials/song-list", {
    songs: songs,
    playlistId: playlistId,
    inModal: true,
    user: req.user
  });
});

// Displays the song itself, including lyrics and YouTube video
// Token verification is just for the favoriting functionality, users who are not logged in
// can still view this page, they just won't be able to add the song to any favorites list
router.get("/song-info", Authenticator.verifySoftToken, async (req, res) => {
  let { songTitle, artistName, youtubeId } = req.query;
  if (!songTitle) {
    const randSuggestedArtists = await Helper.getRandomSuggestedArtists(req);
    return res.render("home", {
      artistSuggestions: randSuggestedArtists,
      headerText: HOME_HEADER,
      user: req.user,
    });
  }
  // When coming from the album info path the YouTubeId will need to be retreived again
  if (!youtubeId) {
    const song = await Helper.getSongs(songTitle, artistName);
    youtubeId = song[0].youtubeId;
  }

  const musicInfoModule = await import("music-info");
  const musicInfo = musicInfoModule.default;
  let songInfo = null;
  try {
    songInfo = await musicInfo.searchSong(
      { title: songTitle, artist: artistName },
      1000,
    );
  } catch (err) {
    console.log(`SongInfo Error: ${err}`);
    return;
  }

  const formattedArtistName = Helper.formatStringForAPI(artistName);
  const formattedSongTitle = Helper.formatStringForAPI(songTitle);

  // API for lyrics
  const url = `https://api.lyrics.ovh/v1/${formattedArtistName}/${formattedSongTitle}`;
  const response = await fetch(url);
  const data = await response.json();

  let lyrics = null;
  if (data && data.lyrics) {
    lyrics = Helper.formatLyrics(data.lyrics);
  } else {
    console.log("Lyrics data is undefined.");
    lyrics = `${data.error} :(`;
  }

  // Check if the song exists in the user's favorites library
  let isFavorited = false;
  if (req.user) {
    const favoriteSongs = await FavoriteSongsDAO.getUsersFavoriteSongs(req.user.id);
    isFavorited = favoriteSongs.some(song => song.YoutubeID === youtubeId);
  }

  return res.render("song-info", {
    songInfo: songInfo,
    songLyrics: lyrics,
    youtubeId: youtubeId,
    headerText: SONG_INFO_HEADER,
    user: req.user,
    isFavorited,
  });
});

router.post('/song/add/favorite', Authenticator.verifySoftToken, async (req, res) => {
  if (!req.user) {
    return console.log('Must be signed in.');
  }

  const userID = req.user.id;
  const { youtubeId, title, artist, album, genre, releaseDate, artwork } = req.body;
  let time = req.body['time'];
  time = time / 1000; // Milliseconds to seconds

  try {
    await FavoriteSongsDAO.addFavoriteSong(userID, youtubeId, title, artist, album, genre, time, releaseDate, artwork);
    console.log("Song added to favorites")
    return res.status(200).json({ message: "Song successfully added to favories"});
  } catch (err) {
    console.log("Could not add song to favorites." + err)
    return res.status(500).send(`Could not add song to favorites: ${err}`);
  }
});

router.post('/song/remove/favorite', Authenticator.verifySoftToken, async (req, res) => {
  if (!req.user) {
    return console.log('Must be signed in.');
  }

  const userID = req.user.id;
  const title = req.body['title'];
  const artist = req.body['artist'];
  const songToRemove = await FavoriteSongsDAO.getSongByTitleAndArtist(userID, title, artist);
  if (songToRemove.length === 0) {
    console.log("Song is not favorited.");
    return;
  }
  console.log("Removing song from favorites.")
  try {
    console.log(songToRemove[0].SongID)
    await FavoriteSongsDAO.deleteFavoriteSong(userID, songToRemove[0].SongID);
    console.log("Song removed from favorites.")
    return res.status(200).json({ message: "Song successfully removed from favories"});
  } catch (err) {
    console.log("Could not remove song from favorites.")
    return res.status(500).send(`Could not remove song from favorites: ${err}`);
  }
});

export default router;