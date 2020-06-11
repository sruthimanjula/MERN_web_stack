var express = require("express");

var router = express.Router();

const { isSignedIn } = require("../controllers/auth");

const { getToken, processPayment } = require("../controllers/payment");

router.get("/payment/gettoken/:userId", getToken);

router.post(
  "/payment/braintree/:userId",
  processPayment
);

module.exports = router;
