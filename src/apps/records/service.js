const logger = require("../../lib/utils/logger");
const { Record } = require("./db/domain");

/**
 *
 * @param {number} minCount
 * @param {number} maxCount
 * @returns {object}
 */
const getFilterQuery = (minCount, maxCount) => {
  let query = {};

  // manage optional filters to build the query steps
  if (minCount || maxCount) {
    const totalCountQuery = {};
    if (minCount) totalCountQuery["$gte"] = minCount;
    if (maxCount) totalCountQuery["$lt"] = maxCount;

    query = { $match: { totalCount: totalCountQuery } };
  }
  return query;
};

/**
 *
 * @param {String} startDate
 * @param {String} endDate
 * @param {number} minCount
 * @param {number} maxCount
 * @returns {import("./types").RecordsListWithSumCount}
 */
module.exports.getRecords = async (startDate, endDate, minCount, maxCount) => {
  const queryStartDate = new Date(startDate);
  const queryEndDate = new Date(endDate);
  const aggregateQuery = [
    {
      $match: {
        createdAt: {
          $gte: queryStartDate,
          $lt: queryEndDate,
        },
      },
    },
  ];

  // agreggate counts array as totalCount
  aggregateQuery.push({
    $set: {
      totalCount: { $sum: "$counts" },
    },
  });

  const queryFilter = getFilterQuery(minCount, maxCount);
  if (queryFilter) aggregateQuery.push(queryFilter);

  // DTO
  aggregateQuery.push({
    $project: {
      _id: 0,
      key: 1,
      createdAt: 1,
      totalCount: 1,
    },
  });

  const records = await Record.aggregate(aggregateQuery);

  return records;
};
