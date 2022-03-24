const AsyncRouter = require("express-async-router").AsyncRouter;
const router = AsyncRouter();
const jsonParser = require("body-parser").json();
const validate = require("express-validation");
const schema = require("./schema");
require("./db");
const deserialize = require("../../lib/middleware/to-camel-case");
const { getRecordsWithSum } = require("./controller");
const logger = require("../../lib/utils/logger");

router.use(jsonParser);
router.use(validate({ body: schema }));
router.use(deserialize);

router.post("/", async (req, res) => {
  const recordRequest = req.body;
  let finalObj = {
    code: "",
    msg: "",
  };

  let statusCode = "";
  try {
    const response = await getRecordsWithSum(recordRequest);
    finalObj = {
      code: 0,
      message: "Success",
      records: response,
    };
    statusCode = 200;
  } catch (e) {
    logger.info(e);
    statusCode = 400;
    finalObj = { ...e };
  }

  return res.status(statusCode).json(finalObj);
});

module.exports = router;
