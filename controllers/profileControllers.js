
const pool = require('../db');


const userModel = require('../models/profileModel'); // Adjust the path accordingly

async function getProfilePage(req, res) {
  try {
    console.log("Decoded User Object:", req.user);

    // Assuming you have a getUserById function in your userModel
    const users = await userModel.getUserById(req.user.id_user);

    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error in getting the profile');
  }
}





const updateUser = async (req, res) => {
  // Check if req.user is defined
  if (!req.user) {
    return res.status(401).json({ error: 'User not authenticated' });
  }

  const userId = req.user.id_user;
  const { username, email, password, country, city, phonenumber } = req.body;
  console.log(1111, username, email, password, country, city, phonenumber);

  try {
    const updatedUser = await userModel.updateUser(userId, username, email, password, country, city, phonenumber);
    res.json(updatedUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
    updateUser,
    getProfilePage
  };
  