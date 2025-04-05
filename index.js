import express from "express";
const app = express();
const PORT = 8080;

import playlistRoutes from './routes/playlistRoutes.js';
import artistRoutes from './routes/artistRoutes.js';
import albumRoutes from './routes/albumRoutes.js';
import songRoutes from './routes/songRoutes.js';
import userRoutes from './routes/userRoutes.js';

import cookieParser from "cookie-parser";
import jwt from 'jsonwebtoken';

import Helper from './helperFunctions.js';
import { DBTest } from "./DB/database.js";

// Express Middleware
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true })); // POST Form parsing
app.use(cookieParser());
app.use((req, res, next) => { // Initialize the user object to null
    req.user = null;
    next();
});

app.use((req, res, next) => { // Session handling
    const token = req.cookies.token;
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
            req.user = decoded;
        } catch (err) {
            console.error("Token verification failed:", err);
            req.user = null;
        }
    } else {
        req.user = null;
    }
    next();
});

// Route Middleware
app.use(playlistRoutes);
app.use(artistRoutes);
app.use(albumRoutes);
app.use(songRoutes);
app.use(userRoutes);

// Home routes
app.get("/", async (req, res, next) => {
  try {
    await Helper.renderHomeRoute(req, res, next);
  } catch (err) {
    next(err);
  }
});
app.get("/srcdoc", async (req, res, next) => { 
  try {
    await Helper.renderHomeRoute(req, res, next);
  } catch (err) {
    next(err);
  }
});
app.get("/dbTest", async function (req, res) {
  const result = await DBTest();
  res.send(result);
});

app.listen(PORT, () => {
  console.log(`Express server running on port: ${PORT}`);
});

// NODE PACKAGES:
// Node YouTube Music
// Music-Info
// Bootstrap

// APIS:
// Lyrics.ovh API
// https://lyricsovh.docs.apiary.io/#reference/0/lyrics-of-a-song/search

// Potential API for popular radio stations: http://all.api.radio-browser.info/json/stations/topvote/5
