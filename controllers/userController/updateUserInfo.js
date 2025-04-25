const { where } = require('sequelize');
const db = require('../../models');

const updateUserInfo = async (req,res)=>{
    try{
        const userData = req.body;
        if(!userData.id){
            throw new Error("Please Select User");
        }

        const countUpdateUser = await db.User.update(userData, { where: { id: userData.id } });

        return res.json({message: `${countUpdateUser} user(s) has been updated.`})


    }
    catch(err){
        return res.json({error: err.message})

    }

}

module.exports = { updateUserInfo };