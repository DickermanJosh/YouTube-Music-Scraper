import { executeSQL } from '../DB/database.js';
import ArtistsDAO from './artistDAO.js';
import Helper from '../helperFunctions.js';

/**
 * Data Access Object for the favorite artists table
 */
class FavoriteArtistsDAO {
  async getUsersFavoriteArtists(userID) {
    const sql = `SELECT * 
                FROM Artists a
                JOIN FavoriteArtists f ON f.ArtistID = a.ArtistID
                WHERE f.UserID = ?`;
    return executeSQL(sql, [userID]);
  }

  async getFavoriteArtistByArtistID(userID, artistID) {
    const sql = `SELECT *
                FROM Artists a
                JOIN FavoriteArtists f ON f.ArtistID = a.ArtistID
                WHERE f.UserID = ?
                AND f.ArtistID = ?`;
    const params = [userID, artistID];
    return executeSQL(sql, params);
  }

  async getFavoriteArtistByAPI_ID(userID, api_ID) {
    const sql = `SELECT *
                FROM Artists a
                JOIN FavoriteArtists f ON f.ArtistID = a.ArtistID
                WHERE f.UserID = ?
                AND a.API_ID = ?`;
    
    const params = [userID, api_ID];
    return executeSQL(sql, params);
  }

  async addFavoriteArtist(userID, name, api_ID, bio, artwork) {
    // Check if the artist exists inside the artists table first
    let artist = await ArtistsDAO.findArtistByAPI_ID(api_ID);
    if (artist.length === 0) {
          artist = await ArtistsDAO.addArtist(name, api_ID, bio, artwork);
    }

    // Check if artist is already favorited
    const favArtist = await this.getFavoriteArtistByAPI_ID(userID, api_ID);
    if (favArtist.length > 0) {
      console.log('Artist is already favorited');
      return;
    }

    const sql = `INSERT INTO FavoriteArtists (userID, ArtistID) 
                VALUES (?, ?)`;
    const params = [userID, artist[0].ArtistID];
    return executeSQL(sql, params);
  }

  async deleteFavoriteArtist(userID, artistID) {
    const sql = `DELETE 
                FROM FavoriteArtists 
                WHERE UserID = ? 
                AND ArtistID = ?`;
    const params = [userID, artistID];
    return executeSQL(sql, params);
  }
}

export default new FavoriteArtistsDAO();