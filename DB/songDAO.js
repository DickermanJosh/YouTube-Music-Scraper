import { executeSQL } from '../DB/database.js';

/**
 * Data Access Object for the songs table
 */
class SongsDAO {

  async findSongByTitleAndArtist(title, artist) {
    const sql = `SELECT * FROM Songs WHERE title = ? AND artist = ?`;
    return executeSQL(sql, [title, artist]);
  }

  async addSong(title, artist, album, durationInSeconds, youtubeID, genre, releaseDate, artwork) {
    const existingSong = await this.findSongByTitleAndArtist(title, artist);
    if (existingSong.length > 0) {
      console.log('Song already exists in DB');
      return existingSong;
    }
    
    const sql = `INSERT INTO Songs (Title, Artist, Album, DurationInSeconds, YoutubeID, Genre, ReleaseDate, Artwork) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    const params = [title, artist, album, durationInSeconds, youtubeID, genre, releaseDate, artwork];
    await executeSQL(sql, params);

    // Get the inserted song for returning
    const selectSQL = `SELECT LAST_INSERT_ID() AS SongID`;
    return await executeSQL(selectSQL);
  }
}

export default new SongsDAO();