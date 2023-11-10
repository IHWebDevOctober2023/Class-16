const express = require('express');
const { customMiddleware1, customMiddleware2 } = require('../middlewares/route-guard');
const router = express.Router();

/* GET home page */
// To add more than one middleware we just add them in the arguments.
router.get("/", customMiddleware1, customMiddleware2, (req, res, next) => {
  res.render("index");
});

module.exports = router;
