const { where } = require('sequelize');
const db = require('../../models');

const updateCategory = async (req,res)=>{
    try{
        const categoryData = req.body;
        if(!categoryData.id){
            throw new Error("Please provide the Id of the category");
        }

        const countUpdateCategory = await db.Category.update(categoryData, { where: { id: categoryData.id } });

        if (countUpdateCategory === 0) {
            return res.json({ message: "No category was updated. Please check if the ID is correct." });
        }
        return res.json({message: `${countUpdateCategory} category(ies) has been updated.`})


    }
    catch(err){
        return res.json({error: err.message})

    }

}

module.exports = { updateCategory };