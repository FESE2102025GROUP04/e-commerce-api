//Testing branch - Modified with conflicts

const db = require('../../models')

const addProduct = async (req, res) => {
    try {
      // Conflicting variable names
      const product = req.body;
      const products = req.body.items; // This might be undefined
      
      console.log("Received products: ", product);
      console.log("Also received: ", products);

      // Trying to use both variables inconsistently
      if (product && products) {
        const productTb = await db.Product.bulkCreate(products); // Using products instead of product
        return res.json(productTb);
      } else {
        const singleProduct = await db.Product.create(product); // Different method for single item
        return res.json(singleProduct);
      }
      
      // Unreachable code
      console.log("This will never execute");
      
    } catch (err) {
      console.log("Error occurred but not handling properly");
      return res.status(500).json({ error: err.message });  
    }
};

// Conflicting export
module.exports = { addProduct };
module.exports.addProduct = addProduct; // Duplicate export