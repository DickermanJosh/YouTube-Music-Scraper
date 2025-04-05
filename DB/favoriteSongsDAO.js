import { executeSQL } from '../DB/database.js';
import SongsDAO from './songDAO.js';
import Helper from '../helperFunctions.js';

/**
 * Data Access Object for the favorite songs table
 */
class FavoriteSongsDAO {
  async getUsersFavoriteSongs(userID) {
    const sql = `SELECT * 
                FROM Songs s
                JOIN FavoriteSongs f ON f.SongID = s.SongID
                WHERE f.UserID = ?`;
    return executeSQL(sql, [userID]);
  }

  async getFavoriteSongBySongID(userID, songID) {
    const sql = `SELECT *
                FROM Songs s
                JOIN FavoriteSongs f ON f.SongID = s.SongID
                WHERE f.UserID = ?
                AND f.SongID = ?`
    const params = [userID, songID];
    return executeSQL(sql, params);
  }

  async getSongByTitleAndArtist(userID, title, artist) {
    const sql = `SELECT *
                FROM Songs s
                JOIN FavoriteSongs f ON f.SongID = s.SongID
                WHERE f.UserID = ?
                AND s.Title = ?
                AND s.Artist = ?`;
    const params = [userID, title, artist];
    return executeSQL(sql, params);
  }

  async addFavoriteSong(userID, youtubeID, title, artist, album, genre, durationInSeconds, releaseDate, artwork) {
    const formattedDate = Helper.formatDateForDB(releaseDate);
    // Check if the song exists inside the song table first
    let song = await SongsDAO.findSongByTitleAndArtist(title, artist);
    if (song.length === 0) {
        song = await SongsDAO.addSong(title, artist, album, durationInSeconds, youtubeID, genre, formattedDate, artwork);
    }

    // Check if song is already favorited
    const favSong = await this.getFavoriteSongBySongID(userID, song[0].SongID);
    if (favSong.length > 0) {
      console.log('Song is already favorited');
      return;
    }
    
    const sql = `INSERT INTO FavoriteSongs (UserID, SongID) VALUES (?, ?)`;
    const params = [userID, song[0].SongID];
    return executeSQL(sql, params);
  }

  async deleteFavoriteSong(userID, songID) {
    const sql = `DELETE 
                FROM FavoriteSongs 
                WHERE UserID = ? 
                AND SongID = ?`;
    const params = [userID, songID];
    return executeSQL(sql, params);
  }
}

export default new FavoriteSongsDAO();