import express from "express";
import Helper from "../helperFunctions.js";
import Authenticator from "../authentication.js";
import PlaylistDAO from "../DB/playlistDAO.js";
import songDAO from "../DB/songDAO.js";
import {
  PLAYLIST_HEADER,
  CREATE_PLAYLIST_HEADER,
  EDIT_PLAYLIST_HEADER,
} from "../constants.js";

// Using Helper class for YouTube Music API calls
const { searchMusics, searchAlbums, searchPlaylists, searchArtists, getArtist, listMusicsFromAlbum } = Helper;

const router = express.Router();

router.get(
  "/playlist/create",
  Authenticator.verifySoftToken,
  async (req, res) => {
    if (!req.user) {
      console.log("Must be signed in to create a playlist.");
      return res.status(403).send("Must be signed in to create a playlist.");
    }

    return res.render("createPlaylist", {
      headerText: CREATE_PLAYLIST_HEADER,
      user: req.user,
    });
  },
);

router.post(
  "/playlist/create",
  Authenticator.verifySoftToken,
  async (req, res) => {
    if (!req.user) {
      console.log("Must be signed in to create a playlist.");
      return res.status(403).send("Must be signed in to create a playlist.");
    }

    try {
      const playlistName = req.body["playlistName"];
      const isPublic = req.body["isPublic"];
      // console.log('POST:\n' + isPublic);
      const newPlaylist = await PlaylistDAO.createNewPlaylist(
        req.user.id,
        playlistName,
        isPublic,
      );
      return res.json({ playlistId: newPlaylist[0].PlaylistID });
    } catch (err) {
      console.error("Could not create playlist.", err);
      return res.status(500).send("Could not create playlist.");
    }
  },
);

// TODO: Fix this route - playlist is never found
router.get(
  "/playlist/edit/:playlistId",
  Authenticator.verifySoftToken,
  async (req, res) => {
    const playlistId = req.params["playlistId"];

    const playlistToEdit =
      await PlaylistDAO.getPlaylistByPlaylistId(playlistId);

    if (playlistToEdit.length === 0) {
      console.log("Could not find playlist");
      return res.status(404).send("Could not find playlist");
    }
    if (req.user.id !== playlistToEdit[0].UserID) {
      console.log("Cannot edit another user's playlist");
      return res.status(403).send("Cannot edit another users playlist");
    }

    console.log(playlistToEdit);
    const songsInPlaylist = await PlaylistDAO.getSongsInPlaylist(
      playlistToEdit[0].PlaylistID,
    );

    return res.render("editPlaylist", {
      playlist: playlistToEdit,
      headerText: `${EDIT_PLAYLIST_HEADER}: ${playlistToEdit[0].PlaylistName}`,
      user: req.user,
      songs: songsInPlaylist,
    });
  },
);

// TODO: Make post route to edit playlist
router.post(
  "/playlist/edit",
  Authenticator.verifySoftToken,
  async (req, res) => {},
);

router.get("/playlists/view/:playlistId", async (req, res) => {
  console.log("Playlist view route hit.");
  if (!req.user) {
    // TODO: don't kick the user from the page, just block the ability to like playlists
    console.log("Not signed in");
  }

  const playlistId = req.params["playlistId"];
  console.log(playlistId);

  try {
    const playlist = await PlaylistDAO.getPlaylistByPlaylistId(playlistId);

    if (playlist.length === 0) {
      console.log("Playlist not found");
      return res.status(404).send("Playlist not found.");
    }

    const songsInPlaylist = await PlaylistDAO.getSongsInPlaylist(playlistId);
    let isLikedByCurrentUser = null;
    if (req.user) {
      isLikedByCurrentUser = await PlaylistDAO.doesUserLikePlaylist(req.user.id, playlist[0].PlaylistID);
    }
    console.log(`View Route: isLiked: ${isLikedByCurrentUser}`);
    return res.render("viewPlaylist", {
      headerText: PLAYLIST_HEADER,
      user: req.user,
      playlistInfo: playlist[0],
      songs: songsInPlaylist,
      isLiked: isLikedByCurrentUser,
    });
  } catch (err) {
    console.log("Could not retreive playlist:\n" + err);
    return res.status(500).send("Error retreiving playlist");
  }
});

router.post(
  "/playlist/add/song",
  Authenticator.verifySoftToken,
  async (req, res) => {
    const { playlistId, youtubeId, durationInSeconds, artwork } = req.body;
    // Some bands have non uniform names that break the musicInfo search. ie: Mötley Crüe
    const title = Helper.removeAccents(req.body["title"]);
    const artist = Helper.removeAccents(req.body["artist"]);
    console.log(title, artist);
    try {
      // get release date, genre, album & songID
      const musicInfoModule = await import("music-info");
      const musicInfo = musicInfoModule.default;
      let songInfo = null;
      try {
        songInfo = await musicInfo.searchSong(
          { title: title, artist: artist },
          1000,
        );
      } catch (err) {
        console.log("Could not find info on the song with music-info");
        return;
      }

      let existingSong = await songDAO.findSongByTitleAndArtist(title, artist);
      if (existingSong.length === 0) {
        if (songInfo) {
          existingSong = await songDAO.addSong(
            title,
            artist,
            songInfo.album,
            durationInSeconds,
            youtubeId,
            songInfo.genre,
            songInfo.releaseDate,
            artwork,
          );
        } else {
          existingSong = await songDAO.addSong(
            title,
            artist,
            "Unknown",
            durationInSeconds,
            youtubeId,
            "Unknown",
            new Date(),
            artwork,
          );
        }
      }

      // console.log(`SongID: ${existingSong[0].SongID}`);
      const song = await PlaylistDAO.addSongToPlaylist(
        playlistId,
        existingSong[0].SongID,
        youtubeId,
        title,
        artist,
        songInfo.album,
        songInfo.genre,
        durationInSeconds,
        songInfo.releaseDate,
        artwork,
      );
      console.log("Song added successfully.");

      // Render back into the edit playlist route
      const playlistToEdit =
        await PlaylistDAO.getPlaylistByPlaylistId(playlistId);
      const songsInPlaylist = await PlaylistDAO.getSongsInPlaylist(playlistId);
      return res.render("editPlaylist", {
        playlist: playlistToEdit,
        headerText: `${EDIT_PLAYLIST_HEADER}: ${playlistToEdit[0].PlaylistName}`,
        user: req.user,
        songs: songsInPlaylist,
      });
    } catch (error) {
      console.error("Failed to add song to playlist:", error);
      res
        .status(500)
        .json({ success: false, message: "Failed to add song to playlist." });
    }
  },
);

router.post(
  "/playlist/delete/song",
  Authenticator.verifySoftToken,
  async (req, res) => {
    const title = req.body["songTitle"];
    const artist = req.body["artistName"];
    const playlistId = req.body["playlistId"];

    console.log(`ID: ${playlistId}\nSong:${title}\nArtist:${artist}`);

    try {
      await PlaylistDAO.deleteSongFromPlaylist(playlistId, title, artist);
      console.log("Song removed.");
      return res.redirect(`/playlist/edit/${playlistId}`);
    } catch (err) {
      console.log("Error removing song.");
      return res.redirect(`/playlist/edit/${playlistId}`);
    }
  },
);

router.post(
  "/playlist/delete",
  Authenticator.verifySoftToken,
  async (req, res) => {
    const playlistId = req.body["playlistId"];

    try {
      await PlaylistDAO.deletePlaylist(playlistId);
      console.log("Playlist removed.");
      return res.redirect(`/user/profile`);
    } catch (err) {
      console.log("Error removing playlist.");
      return res.redirect(`/`);
    }
  },
);

router.post(
  "/playlist/update/name",
  Authenticator.verifySoftToken,
  async (req, res) => {
    const playlistId = req.body["playlistId"];
    const newName = req.body["new-name"];
    try {
      await PlaylistDAO.updatePlaylistName(playlistId, newName);
      console.log("Name changed.");
      return res.redirect(`/playlist/edit/${playlistId}`);
    } catch (err) {
      console.log(err);
      return res.redirect(`/playlist/edit/${playlistId}`);
    }
  },
);

router.post(
  "/playlist/update/visibility",
  Authenticator.verifySoftToken,
  async (req, res) => {
    const playlistId = req.body["playlistId"];
    const isPublic = req.body["isPublic"];

    if (!playlistId || isPublic === undefined) {
      return res.status(400).send("Missing data for playlist update.");
    }

    try {
      await PlaylistDAO.makePlaylistPublic(playlistId, isPublic);
      console.log("Visibility updated.");
      return res.redirect(`/playlist/edit/${playlistId}`);
    } catch (err) {
      console.log(err);
      return res.redirect(`/playlist/edit/${playlistId}`);
    }
  },
);

router.post("/playlist/like", Authenticator.verifySoftToken, async (req, res) => {
  const userId = req.body['userId'];
  const playlistId = req.body['playlistId'];
  
  try {
    await PlaylistDAO.incrementPlaylistLikes(userId, playlistId);
    return res.status(200).json({ message: "Playlist liked", isLiked: 'true'});
  } catch (err) {
    console.log('Error liking playlist' + err);
    return res.status(500).send(`Could not like playlist: ${err}`);
  }
});

router.post("/playlist/unlike", Authenticator.verifySoftToken, async (req, res) => {
  if (!req.user) {
    return console.log('Must be signed in.');
  }
  
  const userId = req.body['userId'];
  const playlistId = req.body['playlistId'];
  
  try {
    await PlaylistDAO.decrementPlaylistLikes(userId, playlistId);
    return res.status(200).json({ message: "Playlist liked", isLiked: 'false'});
  } catch (err) {
    console.log('Error disliking playlist' + err);
    return res.status(500).send(`Could not like playlist ${err}`);
  }
});

export default router;
