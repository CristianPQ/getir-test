const ERRORS = {
  DATE_START_AFTER_END: {
    code: -1,
    msg: "startDate has to be previous to endDate.",
  },
  DATE_INVALID: {
    code: -2,
    msg: 'We only support "YYYY_MM_DD" for startDate and endDate.',
  },
  NUM_MAX_LESS_MIN: {
    code: -3,
    msg: "maxCount has to be bigger than minCount.",
  },
};

module.exports = { ...ERRORS };
