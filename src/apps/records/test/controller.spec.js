const { getRecordsWithSum } = require("../controller");
const ERRORS = require("../../../lib/utils/errors");

describe("Records controller", () => {
  it("Should throw an error because startDate after endDate", () => {
    const startDate = "2016_01_12";
    const endDate = "2016_01_11";
    try {
      getRecordsWithSum({ startDate, endDate });
    } catch (e) {
      expect(e).toBe(ERRORS.DATE_START_AFTER_END);
    }
  });

  it("Should throw an error because startDate is invalid", () => {
    const startDate = "2016-01_12";
    const endDate = "2016_01_11";
    try {
      getRecordsWithSum({ startDate, endDate });
    } catch (e) {
      expect(e).toBe(ERRORS.DATE_INVALID);
    }
  });

  it("Should throw an error because maxCount is smaller than minCount", () => {
    const startDate = "2016_01_11";
    const endDate = "2016_01_12";
    const minCount = 100;
    const maxCount = 20;
    try {
      getRecordsWithSum({ startDate, endDate, minCount, maxCount });
    } catch (e) {
      expect(e).toBe(ERRORS.NUM_MAX_LESS_MIN);
    }
  });
});
