// helpers/dateFilter.js
const { Op } = require("sequelize");

function getDateFilter(startDate, endDate) {
    if (!startDate) return {};

    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : new Date();

    return {
        createdAt: {
            [Op.between]: [start, end]
        }
    };
}

module.exports = { getDateFilter };
