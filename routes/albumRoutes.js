import express from 'express';
import Helper from '../helperFunctions.js';
import Authenticator from '../authentication.js';
import { HOME_HEADER, RESULTS_HEADER, SONG_INFO_HEADER } from '../constants.js';

import {
  searchMusics,
  searchAlbums,
  searchPlaylists,
  getSuggestions,
  listMusicsFromAlbum,
  listMusicsFromPlaylist,
  searchArtists,
  getArtist,
} from "node-youtube-music";

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

  const songs = await listMusicsFromAlbum(album.albumId);

  return res.render("album-info", {
    albumInfo: album,
    albumSongs: songs,
    headerText: albumTitle,
    user: req.user,
  });
});

export default router;