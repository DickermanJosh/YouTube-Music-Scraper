import mysql from 'mysql';

/**
 * SQL setup & helper functions abstracted away for better modularity with the DAOs
 */
const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env['DB_HOST'],
  user: process.env['MYSQL_USER'],
  password: process.env['DB_PASSWORD'],
  database: process.env['MYSQL_DATABASE'],
});

export async function executeSQL(sql, params) {
  return new Promise(function (resolve, reject) {
    pool.query(sql, params, function (err, rows, fields) {
      if (err) throw err;
      resolve(rows);
    });
  });
} //executeSQL

export async function DBTest () {
  let sql = "SELECT CURDATE()";
  let rows = await executeSQL(sql);
  return rows;
}
