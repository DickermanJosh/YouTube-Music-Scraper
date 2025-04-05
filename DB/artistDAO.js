import { executeSQL } from '../DB/database.js';

/**
 * Data Access Object for the artists table
 */
class ArtistsDAO {

  async findArtistByAPI_ID(api_id) {
    const sql = `SELECT * FROM Artists WHERE API_ID = ?`;
    return executeSQL(sql, [api_id]);
  }

  async addArtist(name, api_id, bio, artwork) {
    const existingArtist = await this.findArtistByAPI_ID(api_id);
    if (existingArtist.length > 0) {
      console.log('Artist already exists in DB');
      return existingSong;
    }
    
    const sql = `INSERT INTO Artists (Name, API_ID, Bio, Artwork) 
                VALUES (?, ?, ?, ?)`;
    const params = [name, api_id, bio, artwork];
    await executeSQL(sql, params);

    // Get the inserted artist for returning
    const selectSQL = `SELECT LAST_INSERT_ID() AS ArtistID`;
    return await executeSQL(selectSQL);
  }
}

export default new ArtistsDAO();