const { getRecords } = require("./service");
const moment = require("moment");
const ERRORS = require("../../lib/utils/errors");

/**
 *
 * @param {Object} query
 * @param {String} query.startDate
 * @param {String} query.endDate
 * @param {number} query.minCount
 * @param {number} query.maxCount
 * @returns {import("./types").GetRecordsWithSumResponse}
 */

module.exports.getRecordsWithSum = async ({
  startDate,
  endDate,
  minCount,
  maxCount,
}) => {
  const dateFormat = "YYYY_MM_DD";
  const startDateFormated = moment(startDate, dateFormat);
  const endDateFormated = moment(endDate, dateFormat);

  if (!startDateFormated.isValid() || !endDateFormated.isValid())
    throw ERRORS.DATE_INVALID.toString();
  if (endDateFormated.isBefore(startDateFormated))
    throw ERRORS.DATE_START_AFTER_END;

  if (maxCount && minCount && maxCount < minCount)
    throw ERRORS.NUM_MAX_LESS_MIN.toString();

  const response = await getRecords(
    startDateFormated.toISOString(),
    endDateFormated.toISOString(),
    minCount,
    maxCount
  );

  return response;
};
