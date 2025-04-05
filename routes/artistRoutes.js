import express from "express";
import Authenticator from "../authentication.js";
import Helper from "../helperFunctions.js";
import FavoriteArtistsDAO from "../DB/favoriteArtistDAO.js";
import { HOME_HEADER, RESULTS_HEADER, SONG_INFO_HEADER } from "../constants.js";

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

router.get("/artist-search-results", async (req, res) => {
  const artistName = req.query["artist-name"];
  const artists = await searchArtists(artistName);

  return res.render("artist-results", {
    artists: artists,
    headerText: RESULTS_HEADER,
    user: req.user,
  });
});

router.get("/artist-info", Authenticator.verifySoftToken, async (req, res) => {
  const { artist: artistName } = req.query;
  if (!artistName) {
    const randSuggestedArtists = await Helper.getRandomSuggestedArtists();
    return res.render("home", {
      artistSuggestions: randSuggestedArtists,
      headerText: HOME_HEADER,
      user: req.user,
    });
  }

  const artists = await searchArtists(artistName);
  const artistInfo = await getArtist(artists[0].artistId);
  console.log(artistInfo);

  let isFavorited = false;
  if (req.user) {
    const favoriteArtists = await FavoriteArtistsDAO.getUsersFavoriteArtists(req.user.id);
    isFavorited = favoriteArtists.some(artist => artist.API_ID === artists[0].artistId);
  }

  return res.render("artist-info", {
    thumbnail: artists[0].thumbnailUrl,
    artistInfo: artistInfo,
    headerText: artistName,
    user: req.user,
    isFavorited,
  });
});

router.post(
  "/artist/add/favorite",
  Authenticator.verifySoftToken,
  async (req, res) => {
    if (!req.user) {
      return console.log("Must be signed in.");
    }

    const userID = req.user.id;
    const { name, api_id, bio, artwork } = req.body;

    try {
      await FavoriteArtistsDAO.addFavoriteArtist(
        userID,
        name,
        api_id,
        bio,
        artwork
      );
      console.log("Artist added to favorites");
      return res
        .status(200)
        .json({ message: "Artist successfully added to favories" });
    } catch (err) {
      console.log("Could not add artist to favorites." + err);
      return res.status(500).send(`Could not add artist to favorites: ${err}`);
    }
  },
);

router.post(
  "/artist/remove/favorite",
  Authenticator.verifySoftToken,
  async (req, res) => {
    if (!req.user) {
      return console.log("Must be signed in.");
    }

    const userID = req.user.id;
    const api_id = req.body['api_id'];
    const artistToRemove = await FavoriteArtistsDAO.getFavoriteArtistByAPI_ID(
      userID,
      api_id
    );
    if (artistToRemove.length === 0) {
      console.log("Artist is not favorited.");
      return;
    }
    console.log("Removing artist from favorites.");
    try {
      // console.log(artistToRemove[0].ArtistID);
      await FavoriteArtistsDAO.deleteFavoriteArtist(userID, artistToRemove[0].ArtistID);
      console.log("Artist removed from favorites.");
      return res
        .status(200)
        .json({ message: "Artist successfully removed from favories" });
    } catch (err) {
      console.log("Could not remove artist from favorites.");
      return res
        .status(500)
        .send(`Could not remove artist from favorites: ${err}`);
    }
  },
);

export default router;
