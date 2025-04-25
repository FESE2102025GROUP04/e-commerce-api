const { where } = require('sequelize');
const db = require('../../models');

const removeProduct = async (req,res)=>{
    try{
        const { ids } = req.body;

        if (!ids || ids.length === 0) {
            return res.status(400).json({ error: "No product IDs provided" });
        }

        const deletedCount = await db.Product.destroy({where:{id:ids}})

        return res.json({message: `${deletedCount} records are deleted`})
    }
    catch(err){
        return res.status(500).json({ error: err.message });
    }
}


module.exports = { removeProduct };