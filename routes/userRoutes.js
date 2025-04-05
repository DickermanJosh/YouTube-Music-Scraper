import express from 'express';
import Authenticator from "../authentication.js";
import Hasher from "../security.js";
import Helper from "../helperFunctions.js";
import UserDAO from '../DB/userDAO.js';
import { PROFILE_HEADER } from '../constants.js';
import favoriteArtistDAO from '../DB/favoriteArtistDAO.js';
import favoriteSongDAO from '../DB/favoriteSongsDAO.js';
import PlaylistDAO from '../DB/playlistDAO.js';

import jwt from 'jsonwebtoken';
const secretKey = process.env['JWT_SECRET_KEY'];

const router = express.Router();

  router.post("/user/login", async (req, res) => {
  const username = req.body['username'];
  const password = req.body['password'];

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password required." });
  }

  try {
    // Check if the username exists in the DB
    const user = await UserDAO.getUserByName(username);

    // Compare the password against the bcrypt encryption in the DB
    if (user.length > 0) {
      const passwordMatch = await Hasher.comparePassword(
        password,
        user[0].Password_hash
      );

      if (passwordMatch) {
        // Generate JWT
        const token = Authenticator.generateToken(user[0]);

        // Create the JWT Cookie
        res.cookie("token", token, {
          httpOnly: true,
          secure: true,
          sameSite: "strict"
        });

        req.user = jwt.verify(token, secretKey);
        // Send the token to the client
        console.log("Authentication successful.");
        return res.json({ message: "Authentication successful.", token });
        
        // await Authenticator.verifyQuickToken(req, token);
        // const usersFavArtists = await favoriteArtistDAO.getUsersFavoriteArtists(req.user.id);
        // const usersFavSongs = await favoriteSongDAO.getUsersFavoriteSongs(req.user.id);
        // const playlists = await PlaylistDAO.getPlaylistsByUserId(req.user.id);

        // return res.render('profile', { headerText: PROFILE_HEADER, user: req.user, favArtists: usersFavArtists, favSongs: usersFavSongs, playlists: playlists });
        // return res.redirect('/user/profile');
      } else {
        // Auth failed
        console.log("Login failed - Wrong password");
        return res.redirect("/");
      }
    } else {
      // Auth failed
      console.log("Login failed - No user with that name exists");
      res.redirect("/");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occured.");
  }
});

router.post('/user/create/account', async (req, res) => {
  const username = req.body['username'];
  const password = req.body['password'];
  
  // Check if the username is taken or not
  const existingUser = UserDAO.getUserByName(username);
  
  // If yes, notify the user with a warning msg
  if (existingUser.length > 0) {
    return res.status(400).json({ message: "Username is already taken." });
  }
  
  // If no, add it to the DB (hashing done inside DAO)
  const user = await UserDAO.addUser(username, password);

  // Generate JWT
  const token = Authenticator.generateToken(user[0]);

  // Create the JWT Cookie
  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict"
  });

  req.user = jwt.verify(token, secretKey);
  // Redirect user to their home page
  return res.json({ message: "Authentication successful.", token });
  // await Authenticator.verifyQuickToken(req, token);
  // const usersFavArtists = await favoriteArtistDAO.getUsersFavoriteArtists(req.user.id);
  // const usersFavSongs = await favoriteSongDAO.getUsersFavoriteSongs(req.user.id);
  // const playlists = await PlaylistDAO.getPlaylistsByUserId(req.user.id);

  // return res.render('profile', { headerText: PROFILE_HEADER, user: req.user, favArtists: usersFavArtists, favSongs: usersFavSongs, playlists: playlists });
  
  // Helper.renderHomeRoute(req, res, (err) => {
  //   if (err) {
  //     return res.status(500).send("Server Error");
  //   }
  // });
  
});

router.get('/user/logout', (req, res) => {
    // Clear the authentication cookie
    res.clearCookie('token');
    console.log("Logged out successfully.");

    return res.redirect('/');
});

router.get('/user/profile', Authenticator.verifySoftToken, async (req, res) => {
  console.log("Accessing /user/profile", req.user);
  const usersFavArtists = await favoriteArtistDAO.getUsersFavoriteArtists(req.user.id);
  const usersFavSongs = await favoriteSongDAO.getUsersFavoriteSongs(req.user.id);
  const playlists = await PlaylistDAO.getPlaylistsByUserId(req.user.id);
  
  res.render('profile', { headerText: `${req.user.username}'s ${PROFILE_HEADER}`, user: req.user, favArtists: usersFavArtists, favSongs: usersFavSongs, playlists: playlists });
});

export default router;