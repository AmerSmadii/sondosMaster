const pool = require('../db');


const userModel = require('../models/allUserModel'); // Adjust the path accordingly

async function getAllUser(req, res) {
  try {
    console.log("Decoded User Object:", req.user);

    // Assuming you have a getUserById function in your userModel
    const users = await userModel.getAllUser(req.user);

    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error in getting the profile');
  }
}
module.exports = {
    
    getAllUser
  };
  