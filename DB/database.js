import mysql from 'mysql';

/**
 * SQL setup & helper functions abstracted away for better modularity with the DAOs
 */
const pool = mysql.createPool({
  connectionLimit: 10,
  host: "d6vscs19jtah8iwb.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
  user: "h43xi0khx6h7wrd4",
  password: process.env['DB_PASSWORD'],
  database: "nx9skm9wgye6fpo1",
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