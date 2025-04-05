import { executeSQL } from '../DB/database.js';
import Helper from '../helperFunctions.js';
import songDAO from './songDAO.js';

/**
 * Data Access Object for the Playlists & PlaylistSongs tables
 */
class PlaylistDAO {
  async getAllPublicPlaylists() {
    const sql = `SELECT * FROM Playlists WHERE Public = 1 ORDER BY Likes DESC`;
    return executeSQL(sql);
  }
  async getPlaylistsByUserId(userId) {
    const sql = 'SELECT * FROM Playlists WHERE UserID = ?';
    const params = [userId];
    return executeSQL(sql, params);
  }

  async getPlaylistByPlaylistId(playlistId) {
    const sql = 'SELECT * FROM Playlists WHERE PlaylistID = ?';
    const params = [playlistId];
    return executeSQL(sql, params);
  }

  async getSongsInPlaylist(playlistId) {
    const sql = `SELECT *
                FROM Songs s
                JOIN PlaylistSongs p ON s.SongID = p.SongID
                WHERE p.PlaylistID = ?`;
    return executeSQL(sql, [playlistId]);
  }

  async getSongFromPlaylist(playlistId, songId) { // May want to chang songId to SongName
    const sql = `SELECT *
                FROM Playlists p
                JOIN PlaylistSongs ps ON p.PlaylistID = ps.PlaylistID
                WHERE p.PlaylistID = ?
                AND ps.SongID = ?`;
    const params = [playlistId, songId];
    return executeSQL(sql, params);
  }

  async createNewPlaylist(userId, playlistName, isPublic=false) {
    const sql = `INSERT INTO Playlists (UserID, PlaylistName, Likes, CreationDate, Public)
                VALUES (?, ?, ?, ?, ?)`;
    const today = Helper.formatDateForDB(new Date());
    let bool = 0;
    if (isPublic) {
      bool = 1;
    }
    // console.log('DAO:\n' + isPublic);
    // console.log(bool);
    const params = [userId, playlistName, 0, today, bool];
    await executeSQL(sql, params);
    
    const selectSQL = `SELECT LAST_INSERT_ID() AS PlaylistID`;
    return executeSQL(selectSQL);
  }

  async updatePlaylistName(playlistId, newName) {
    const sql = `UPDATE Playlists SET PlaylistName = ? WHERE PlaylistID = ?`;
    const params = [newName, playlistId];
    return executeSQL(sql, params);
  }

  async makePlaylistPublic(playlistId, makePublic=true) {
    const sql = `UPDATE Playlists SET Public = ? WHERE PlaylistID = ?`;
    const params = [makePublic, playlistId];
    return executeSQL(sql, params);
  }

  async incrementPlaylistLikes(userId, playlistId) {
    // Check if the user has already liked the playlist
    if (await this.doesUserLikePlaylist(userId, playlistId) == 'true') {
      return;
    }
    
    await this.addLike(userId, playlistId);
    const sql = `UPDATE Playlists SET Likes = Likes + 1 WHERE PlaylistID = ?`;
    const param = [playlistId];
    return executeSQL(sql, param);
  }

  async decrementPlaylistLikes(userId, playlistId) {
    await this.removeLike(userId, playlistId);
    
    const sql = `UPDATE Playlists SET Likes = Likes - 1 WHERE PlaylistID = ?`;
    const param = [playlistId];
    return executeSQL(sql, param);
  }

  async removeLike(userId, playlistId) {
    const sql = `DELETE FROM LikedPlaylists
                WHERE UserID = ?
                AND PlaylistID = ?`;
    const params = [userId, playlistId];
    return executeSQL(sql, params);
  }

  async addLike(userId, playlistId) {
    const sql = `INSERT INTO LikedPlaylists (UserID, PlaylistID)
                VALUES (?, ?)`;
    const params = [userId, playlistId];
    return executeSQL(sql, params);
  }

  async doesUserLikePlaylist(userId, playlistId) {
    const sql = `SELECT * FROM LikedPlaylists WHERE UserID = ? AND PlaylistID = ?`;
    const ans = await executeSQL(sql, [userId, playlistId]);
    if (ans.length > 0) {
      return 'true';
    }
    return 'false';
  }

  async addSongToPlaylist(playlistId, songId, youtubeID, title, artist, album, genre, durationInSeconds, releaseDate, artwork) {
    // Check if the song exists in the songs table
    const selectSongSQL = `SELECT * From Songs WHERE SongID = ?`;
    let song = await executeSQL(selectSongSQL, [songId]);
    if (song.length === 0) {
      song = songDAO.addSong(title, artist, album, durationInSeconds, youtubeID, genre, releaseDate, artwork);
    }
    
    // Check if song already exists in playlist
    const selectPlaylistSQL = `SELECT * FROM PlaylistSongs WHERE PlaylistID = ? AND SongID = ?`;
    const params = [playlistId, songId];
    const existingSong = await executeSQL(selectPlaylistSQL, params);
    
    if (existingSong.length > 0) {
      console.log('Song is already in the playlist.');
      return [];
    }
    
    const sql = `INSERT INTO PlaylistSongs (PlaylistID, SongID) VALUES (?, ?)`;
    return executeSQL(sql, params);
  }

  async deleteSongFromPlaylist(playlistId, songTitle, artistName) {
    const songToDelete = await songDAO.findSongByTitleAndArtist(songTitle, artistName);
    if (songToDelete.length === 0) {
      console.log('Song not found in songs table.');
      throw new error('Song not found in songs table.');
    }
    
    const sql = `DELETE FROM PlaylistSongs
                WHERE PlaylistID = ?
                AND SongID = ?`;
    const params = [playlistId, songToDelete[0].SongID];
    return executeSQL(sql, params);
  }

  async deletePlaylist(playlistId) {
    const deleteLikesSQL = `DELETE FROM LikedPlaylists WHERE PlaylistID = ?`;
    const param = [playlistId];
    await executeSQL(deleteLikesSQL, param);

    const deleteSongsSQL = `DELETE FROM PlaylistSongs WHERE PlaylistID = ?`;
    await executeSQL(deleteSongsSQL, param);

    const deletePlaylistSQL = `DELETE FROM Playlists WHERE PlaylistID = ?`;
    return executeSQL(deletePlaylistSQL, param);
  }
  
}

export default new PlaylistDAO();