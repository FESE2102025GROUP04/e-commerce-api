const db = require('../../models');
const { getDateFilter } = require("../../helper/dateFilter");


const listAllUser = async (req, res) => {
    
    const whereCondition = getDateFilter(req.query.startDate, req.query.endDate);


    const userTb = await db.User.findAll({
        attributes: ["userName"],
        where: whereCondition
    })

    return res.json(userTb);
}

module.exports = { listAllUser };