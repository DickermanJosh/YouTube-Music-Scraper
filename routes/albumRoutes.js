import express from 'express';
import Helper from '../helperFunctions.js';
import Authenticator from '../authentication.js';
import { HOME_HEADER, RESULTS_HEADER, SONG_INFO_HEADER } from '../constants.js';

// Using Helper class for YouTube Music API calls
const { searchMusics, searchAlbums, searchPlaylists, searchArtists, getArtist, listMusicsFromAlbum } = Helper;

const router = express.Router();

router.get("/album-info", Authenticator.verifySoftToken, async (req, res) => {
  const { albumTitle, artistName } = req.query;
  const albums = await searchAlbums(albumTitle);
  let album = null;
  for (let a of albums) {
    if (a.artist.toUpperCase() == artistName.toUpperCase()) {
      album = a;
      break;
    }
  }

  if (!album) {
    // const randSuggestedArtists = await Helper.getRandomSuggestedArtists(req);
    return Helper.renderHomeRoute(req, res);
    // return res.render("home", {
    //   artistSuggestions: randSuggestedArtists,
    //   headerText: HOME_HEADER,
    //   user: req.user,
    // });
  }

  const albumData = await listMusicsFromAlbum(album.albumId);

  // Combine album info with additional details from API
  const combinedAlbumInfo = {
    ...album,
    year: albumData ? albumData.year : 'Unknown'
  };

  const albumSongs = albumData && albumData.songs && Array.isArray(albumData.songs) ? albumData.songs : [];

  return res.render("album-info", {
    albumInfo: combinedAlbumInfo,
    albumSongs: albumSongs,
    headerText: albumTitle,
    user: req.user,
  });
});

export default router;