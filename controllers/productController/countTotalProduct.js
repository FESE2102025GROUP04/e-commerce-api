const db = require('../../models');


const countTotalProduct = async(red,res)=>{
    try{
        const totalProduct = await db.Product.count();

        return res.json(totalProduct);
    }
    catch(err){
        return res.status(500).json({ error: err.message });
    }
}


module.exports = { countTotalProduct }