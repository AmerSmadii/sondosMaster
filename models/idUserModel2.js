const pool = require('../db');
const addid = async (imagename, imageurl) => {
    try {
      const additemQuery = `
        INSERT INTO deliveryLost ( imagename, imageurl)
        VALUES ($1, $2)
        RETURNING *;
      `;
  
      const values = [ imagename, imageurl];
      const { rows } = await pool.query(additemQuery, values);
      return rows[0];
    } catch (error) {
      throw error;
    }
  };
  async function getAll() {
    try {
      let result = await pool.query(`
      SELECT * , public.lostitems.id, public.users.id_user
      FROM public."deliveryLost"
      JOIN public.users ON public."deliveryLost".id_user = public.users.id_user
      JOIN public.lostitems ON public."deliveryLost".id_lost = public.lostitems.id;
      `);
      return result.rows;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
module.exports = {
    getAll,
    addid
};