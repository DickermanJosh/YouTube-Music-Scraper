import { executeSQL } from '../DB/database.js';
import Hasher from "../security.js";

/**
 * Data Access Object for the user table
 */
class UserDAO {
  async getAllUsers() {
    const sql = 'SELECT * FROM Users ORDER BY UserID = ?';
    const params = [userId];
    return executeSQL(sql, params);
  }

 async getUserById(userId) {
    const sql = 'SELECT * FROM Users WHERE UserID = ?';
    const params = [userId];
    return executeSQL(sql, params);
  }

  async getUserByName(username) {
    const sql = `SELECT * FROM Users WHERE Username = ?`;
    const params = [username];
    return executeSQL(sql, params);
  }

  async addUser(name, password) {
    // Check for existing user with the same username
    const existingUser = await this.getUserByName(name);
    if (existingUser.length > 0) {
      console.log(`The name ${name} has already been taken.`);
      return []; // Return an empty array to stay consistent with length checks, not null checks
    };
    const hashedPassword = await Hasher.hashPassword(password);
    const sql = `INSERT INTO Users (Username, Password_hash) VALUES (?, ?)`;
    const params = [name, hashedPassword];
    await executeSQL(sql, params);
    
    const userSQL = `SELECT * FROM Users WHERE Username = ?`;
    return executeSQL(userSQL, [name]);
  }
}

export default new UserDAO();