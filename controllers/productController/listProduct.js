
const db = require("../../models")

const listProduct = async (req, res, next) => {

    const productTb = await db.Product.findAll({
        attributes: { exclude: ["createdAt", "updatedAt", "ca"] }
    })
    
    return res.json(productTb);

}

module.exports = { listProduct };

