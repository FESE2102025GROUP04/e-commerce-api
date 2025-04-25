const { where } = require('sequelize');
const db = require('../../models');

const updateProdcut = async (req,res)=>{
    try{
        const productData = req.body;
        if(!productData.id){
            throw new Error("Please provide the Id of the product");
        }

        const countUpdateProduct = await db.Product.update(productData, { where: { id: productData.id } });

        return res.json({message: `${countUpdateProduct} product(s) has been updated.`})


    }
    catch(err){
        return res.json({error: err.message})

    }

}

module.exports = { updateProdcut };