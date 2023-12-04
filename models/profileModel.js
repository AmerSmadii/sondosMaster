const pool = require('../db');


async function getUserById(id_user) {
  try {
    let result = await pool.query('SELECT * FROM users WHERE id_user = $1', [id_user]);
    console.log(result.rows);
    return result.rows;
  } catch (error) {
    console.error("Error in getUserById:", error);
    throw error;
  }
}



const updateUser = async (id_user, username, email, password,country,city,phonenumber) => {
  console.log(id_user, username, email, password,country,city,phonenumber)
  const updateUserQuery = `
    UPDATE users
    SET username = $1, email = $2, password = $3,country = $4,city = $5 ,phonenumber = $6
    WHERE id_user = $7
    RETURNING *
  `;
  const values = [username, email, password,country,city,phonenumber, id_user];

  try {
    const updatedUser = await pool.query(updateUserQuery, values);
    return updatedUser.rows[0];
  } catch (error) {
    console.log(error);
    throw new Error('Error updating user profile');
  }
};
module.exports = {
    updateUser,
    getUserById
  };
  