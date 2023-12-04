const db =require ('../db');
const idUserModel = require('../models/idUserModel2');


async function getAll(req, res) {
    try {
        const products = await idUserModel.getAll();
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error in getting the home');
    }
}


module.exports = {
    getAll,
 
};