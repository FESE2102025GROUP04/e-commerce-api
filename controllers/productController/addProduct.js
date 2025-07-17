const db = require('../../models')

const addProduct = async (req, res) => {
    try {
      const product = req.body;  
      console.log("Received products from Main: ", product);

      const productTb = await db.Product.bulkCreate(product);
      
      return res.json(productTb);
    } catch (err) {
      return res.status(500).json({ error: err.message });  
    }
  };
  
  module.exports = { addProduct };