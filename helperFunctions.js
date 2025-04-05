import favoriteArtistDAO from './DB/favoriteArtistDAO.js';
import express from 'express';
import { HOME_HEADER } from './constants.js';

// Node-YouTube Music for all YouTube calls
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
import playlistDAO from './DB/playlistDAO.js';

/**
 * An assortment of helper functions that are used throughout the project
 */
class Helper {
  
  static async renderHomeRoute (req, res, next) {
    try {
      //TODO: Figure out where trending artists should come from
      // Likely get the names from spotify and search them through node-yt-music for consistency

      // Change randomSuggestedArtists to suggested artists based off user's favorites
      // if they have any - otherwise continue pulling from rand suggestions
      const randSuggestedArtists = await this.getRandomSuggestedArtists(req);

      // Get all the public playlists
      const publicPlaylists = await playlistDAO.getAllPublicPlaylists();
      
      res.render("home", {
        artistSuggestions: randSuggestedArtists,
        publicPlaylists: publicPlaylists,
        headerText: HOME_HEADER,
        user: req.user,
      });
    } catch (error) {
      next(error);
    }
  }
  
  // Predefined list of a few artists for music suggestions
  static randArtists = [
    "Fred Again..", "Kanye West", "Avicii", "Johnny Cash",
    "Nirvana", "REZZ", "AC/DC", "Gorillaz",
    "The Offspring", "Foo Fighters", "The Killers", "Imagine Dragons",
    "Metallica", "Iron Maiden", "Slipknot", "Coldplay",
    "Radiohead", "The Strokes", "Green Day", "Blink-182",
  ];

  /**
   * Function to return a list of randomly suggested artists using the randArtists const
   * and node-YT-music
   *
   * returns - An array of artist objects from Node-YT-Music
   */
  static async getRandomSuggestedArtists(req) {
    let favArtists = [];
    if (req.user) {
      favArtists = await favoriteArtistDAO.getUsersFavoriteArtists(req.user.id);
    }

    // # of iterations of suggestied artists (higher = longer list)
    let depth = 3;
    // If the user has not favorited any artists, show the suggested artists at random
    let suggestedArtists = [];
    if (favArtists.length === 0) {
      for (let i = 0; i < depth; i++) {
        const randArtist = this.getRandomArtist();
        const a = await searchArtists(randArtist);
        suggestedArtists = suggestedArtists.concat(a);
      }
      suggestedArtists = this.shuffleArray(suggestedArtists);
      return suggestedArtists;
    }

    // Otherwise, curate based on the previous favorites
    favArtists = this.shuffleArray(favArtists);
    for (let i = 0; i < depth; i++) {
      const refArtist = favArtists[0].Name;
      const suggested = await searchArtists(refArtist);
      suggestedArtists = suggestedArtists.concat(suggested);
      if (favArtists.length > 1) {
        favArtists.splice(0, 1)
      } else {
        break;
      }
    }
    return suggestedArtists;
  }

  /**
   * Function to get a list of songs based on a given title & potentially an artist
   *
   * returns - An array of song objects from Node-YT-Music
   */
  static async getSongs(songName, artistName) {
    const songs = await searchMusics(songName);
    if (!artistName) return songs;

    for (let song of songs) {
      if (song.artists[0].name.toUpperCase() == artistName.toUpperCase()) {
        let filteredSong = [song];
        return filteredSong;
      }
    }
    return songs;
  }

  /**
   * Function used to format artist/song names to fit the API's standard
   *
   * @param: A string to convert
   * returns - edited version of the param string, ex: "Example Band" -> "example-band"
   */
  static formatStringForAPI(str) {
    // Replace spaces with - in the token for the API
    return str.toLowerCase().replace(/\s+/g, "-");
  }

  /**
   * Function to replace js line breaks with HTML line breaks <br>
   * As well as remove the first line from the API returned lyrics as they are
   * not wanted.
   *
   * @param: A string of lyrics to convert for HTML
   * returns - HTML formatted / trimmed lyric string
   */
  static formatLyrics(str) {
    // The first line returned by the API needs to be trimmed
    const index = str.indexOf("\n");
    str = str.substring(index + 1);
    // Replacing every \n with a <br>
    return str.replace(/\n/g, "<br>");
  }

  /**
   * Function to pick a random artist from the randArtist const
   */
  static getRandomArtist() {
    const randIndex = Math.floor(Math.random() * this.randArtists.length);
    return this.randArtists[randIndex];
  }

  /**
   * Function to randomly shuffle an array
   */
  static shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  static formatDateForDB(date) {
    const dateObj = new Date(date);
    const formattedDate = dateObj.toISOString().split('T')[0];
    return formattedDate;
  }

  static removeAccents(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }
}

export default Helper;