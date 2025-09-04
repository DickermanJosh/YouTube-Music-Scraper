import favoriteArtistDAO from './DB/favoriteArtistDAO.js';
import express from 'express';
import { HOME_HEADER } from './constants.js';

// YTMusic API for all YouTube Music calls
import YTMusic from "ytmusic-api";
import playlistDAO from './DB/playlistDAO.js';

/**
 * An assortment of helper functions that are used throughout the project
 */
class Helper {
  static ytmusic = null;
  
  // Initialize YouTube Music API
  static async initYTMusic() {
    if (!this.ytmusic) {
      this.ytmusic = new YTMusic();
      await this.ytmusic.initialize();
    }
    return this.ytmusic;
  }
  
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
    "Radiohead", "Kanye West", "Avicii", "Johnny Cash",
    "Nirvana", "REZZ", "AC/DC", "Gorillaz",
    "The Offspring", "Foo Fighters", "The Killers", "Imagine Dragons",
    "Metallica", "Iron Maiden", "Slipknot", "Coldplay",
    "Radiohead", "The Strokes", "Green Day", "Blink-182",
  ];

  /**
   * Function to return a list of randomly suggested artists using the randArtists const
   * and YTMusic API
   *
   * returns - An array of artist objects from YTMusic API
   */
  static async getRandomSuggestedArtists(req) {
    let favArtists = [];
    if (req.user) {
      favArtists = await favoriteArtistDAO.getUsersFavoriteArtists(req.user.id);
    }

    // # of iterations of suggested artists (higher = longer list)
    let depth = 3;
    // If the user has not favorited any artists, show the suggested artists at random
    let suggestedArtists = [];
    if (favArtists.length === 0) {
      for (let i = 0; i < depth; i++) {
        const randArtist = Helper.getRandomArtist();
        try {
          const searchResults = await Helper.searchArtists(randArtist);
          if (searchResults && searchResults.length > 0) {
            suggestedArtists = suggestedArtists.concat(searchResults.slice(0, 5)); // Limit results
          }
        } catch (error) {
          console.error(`Error searching for artist ${randArtist}:`, error);
        }
      }
      suggestedArtists = Helper.shuffleArray(suggestedArtists);
      return suggestedArtists;
    }

    // Otherwise, curate based on the previous favorites
    favArtists = Helper.shuffleArray(favArtists);
    for (let i = 0; i < depth; i++) {
      const refArtist = favArtists[0].Name;
      try {
        const suggested = await Helper.searchArtists(refArtist);
        if (suggested && suggested.length > 0) {
          suggestedArtists = suggestedArtists.concat(suggested.slice(0, 5)); // Limit results
        }
      } catch (error) {
        console.error(`Error searching for suggested artists for ${refArtist}:`, error);
      }
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
   * returns - An array of song objects from YTMusic API
   */
  static async getSongs(songName, artistName) {
    try {
      const songs = await Helper.searchMusics(songName);
      
      if (!artistName || !songs || songs.length === 0) return songs || [];

      // Filter songs by artist name if provided
      for (let song of songs) {
        if (song.artists && song.artists.length > 0 && 
            song.artists[0].name.toUpperCase() === artistName.toUpperCase()) {
          return [song];
        }
      }
      return songs;
    } catch (error) {
      console.error(`Error searching for songs with name ${songName}:`, error);
      return [];
    }
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
   * Also clean up extra whitespace and formatting.
   *
   * @param: A string of lyrics to convert for HTML
   * returns - HTML formatted lyric string
   */
  static formatLyrics(str) {
    if (!str) return "No lyrics available";
    
    // Clean up \r characters and excessive spacing
    str = str.replace(/\r/g, "");
    str = str.replace(/\n{3,}/g, "\n\n"); // Reduce multiple newlines to max 2
    str = str.trim(); // Remove leading/trailing whitespace
    
    // Replace newlines with HTML breaks
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

  static formatDuration(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  // Wrapper functions to maintain compatibility with old API
  static async searchMusics(query) {
    try {
      const ytmusic = await Helper.initYTMusic();
      const results = await ytmusic.searchSongs(query);
      
      // Transform new API format to old format for template compatibility
      return results.map(song => ({
        title: song.name,
        artists: [{ name: song.artist ? song.artist.name : 'Unknown' }],
        youtubeId: song.videoId,
        thumbnailUrl: song.thumbnails && song.thumbnails.length > 0 ? song.thumbnails[0].url : '',
        album: song.album ? song.album.name : 'Unknown',
        duration: {
          totalSeconds: song.duration || 0
        },
        releaseDate: song.album ? song.album.releaseDate : new Date().toISOString().split('T')[0]
      }));
    } catch (error) {
      console.error(`Error searching for music with query ${query}:`, error);
      return [];
    }
  }

  static async searchAlbums(query) {
    try {
      const ytmusic = await Helper.initYTMusic();
      const results = await ytmusic.searchAlbums(query);
      
      // Transform new API format to old format
      return results.map(album => ({
        title: album.name,
        albumId: album.albumId,
        artist: album.artist ? album.artist.name : 'Unknown',
        thumbnailUrl: album.thumbnails && album.thumbnails.length > 0 ? album.thumbnails[0].url : '',
        releaseYear: album.releaseDate ? new Date(album.releaseDate).getFullYear() : null
      }));
    } catch (error) {
      console.error(`Error searching for albums with query ${query}:`, error);
      return [];
    }
  }

  static async searchArtists(query) {
    try {
      const ytmusic = await Helper.initYTMusic();
      const results = await ytmusic.searchArtists(query);
      
      // Transform new API format to old format
      return results.map(artist => ({
        name: artist.name,
        artistId: artist.artistId,
        thumbnailUrl: artist.thumbnails && artist.thumbnails.length > 0 ? 
          artist.thumbnails.find(t => t.width >= 120)?.url || artist.thumbnails[0].url : ''
      }));
    } catch (error) {
      console.error(`Error searching for artists with query ${query}:`, error);
      return [];
    }
  }

  static async searchPlaylists(query) {
    try {
      const ytmusic = await Helper.initYTMusic();
      const results = await ytmusic.searchPlaylists(query);
      
      // Transform new API format to old format
      return results.map(playlist => ({
        title: playlist.name,
        playlistId: playlist.playlistId,
        author: playlist.author ? playlist.author.name : 'Unknown',
        thumbnailUrl: playlist.thumbnails && playlist.thumbnails.length > 0 ? playlist.thumbnails[0].url : '',
        songCount: playlist.songCount || 0
      }));
    } catch (error) {
      console.error(`Error searching for playlists with query ${query}:`, error);
      return [];
    }
  }

  static async getArtist(artistId) {
    try {
      const ytmusic = await Helper.initYTMusic();
      const result = await ytmusic.getArtist(artistId);
      
      if (!result) return null;
      
      // Transform albums from topAlbums
      const albums = (result.topAlbums || []).map(album => ({
        title: album.name,
        thumbnailUrl: album.thumbnails && album.thumbnails.length > 0 ? album.thumbnails[0].url : '',
        year: album.releaseDate ? new Date(album.releaseDate).getFullYear() : 'Unknown',
        albumId: album.albumId
      }));

      // Transform singles from topSingles  
      const singles = (result.topSingles || []).map(single => ({
        title: single.name,
        thumbnailUrl: single.thumbnails && single.thumbnails.length > 0 ? single.thumbnails[0].url : '',
        year: single.releaseDate ? new Date(single.releaseDate).getFullYear() : 'Unknown',
        videoId: single.videoId
      }));
      
      // Transform new API format to old format
      return {
        name: result.name,
        artistId: result.artistId,
        thumbnailUrl: result.thumbnails && result.thumbnails.length > 0 ? 
          result.thumbnails.find(t => t.width >= 120)?.url || result.thumbnails[0].url : '',
        description: result.description || '',
        subscribers: result.subscribers || 0,
        albums: albums,
        singles: singles
      };
    } catch (error) {
      console.error(`Error getting artist with ID ${artistId}:`, error);
      return null;
    }
  }

  static async listMusicsFromAlbum(albumId) {
    try {
      const ytmusic = await Helper.initYTMusic();
      const result = await ytmusic.getAlbum(albumId);
      
      if (!result || !result.songs) return null;
      
      // Transform new API format to old format
      return {
        ...result,
        songs: result.songs.map(song => ({
          title: song.name,
          artists: [{ name: song.artist ? song.artist.name : 'Unknown' }],
          youtubeId: song.videoId,
          thumbnailUrl: song.thumbnails && song.thumbnails.length > 0 ? song.thumbnails[0].url : '',
          duration: {
            totalSeconds: song.duration || 0,
            label: Helper.formatDuration(song.duration || 0)
          }
        }))
      };
    } catch (error) {
      console.error(`Error getting album with ID ${albumId}:`, error);
      return null;
    }
  }
}

export default Helper;