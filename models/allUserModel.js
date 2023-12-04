const pool = require('../db');


async function getAllUser() {
  try {
    let result = await pool.query('SELECT * FROM users');
    console.log(result.rows);
    return result.rows;
  } catch (error) {
    console.error("Error in getAllUser:", error);
    throw error;
  }
}
module.exports = {
    
    getAllUser
  };