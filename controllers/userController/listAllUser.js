const db = require('../../models');

const listAllUser = async(req,res)=>{
    const userTb = await db.User.findAll({
        attributes: { exclude: ["createdAt", "updatedAt"]}
    })
    
    return res.json(userTb);
}

module.exports = { listAllUser };