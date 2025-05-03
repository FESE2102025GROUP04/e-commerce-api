const db = require("../../models");

const { getDateFilter } = require("../../helper/dateFilter");


const listProduct = async (req, res, next) => {
    const whereCondition = getDateFilter(req.query.startDate, req.query.endDate);

    const productTb = await db.Product.findAll({
        attributes: { exclude: ["createdAt", "updatedAt", "ca"] },
        where: whereCondition
    });

    return res.json(productTb);
};

module.exports = { listProduct };
