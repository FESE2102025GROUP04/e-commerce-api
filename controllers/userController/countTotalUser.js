const db = require('../../models');

const countTotalUser = async(req,res)=>{
    try{
        const totalUser = await db.User.count();

        return res.json(totalUser);

    }
    catch(err){
        return res.status(500).json({ error: err.message });
    }
}

module.exports = { countTotalUser }; 