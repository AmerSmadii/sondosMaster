// userModel.js

const db = require('../db');
const bcrypt = require('bcrypt');
const findByEmail = async (email) => {
  const result = await db.query('SELECT * FROM Users WHERE email = $1', [email]);
  return result.rows[0];
};

const createUser = async (username, email, password,phonenumber,city,country) => {
  const result = await db.query(
    'INSERT INTO Users(username, email, password,phonenumber,city,country) VALUES($1, $2, $3,$4,$5,$6) RETURNING *',
    [username, email, password,phonenumber,city,country]
  );
  return result.rows[0];
};


const findByEmailAndPassword = async (email, password) => {
  // Fetch user from the database using the email
  const result = await db.query('SELECT * FROM Users WHERE email = $1', [email]);
  const user = result.rows[0];

  // Check if the user exists
  if (!user) {
    return null; // User not found
  }

  // Compare the provided password with the hashed password in the database
  const passwordMatch = await bcrypt.compare(password, user.password);

  if (passwordMatch) {
    // Passwords match, return the user
    return user;
  } else {
    // Passwords do not match, return null
    return null;
  }
};
module.exports = {
  findByEmail,
  createUser,
  findByEmailAndPassword,
};
