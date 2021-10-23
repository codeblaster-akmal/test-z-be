"use strict";

const { verifyToken } = require("../../utils/jsonWebToken/jwt");
const {
  list,
  create,
  customerById,
  update,
  remove,
  otpVerification,
  reSendOtp,
  passwordVerification,
  forgotPassword
} = require("./customersProfileMst.controller");

module.exports = (app, db) => {
  app.get("/customers", /* verifyToken, */ list);

  app.post("/customers", /* verifyToken, */ create);

  app.get("/customers/:id", /* verifyToken, */ customerById);

  app.put("/customers/:id", /* verifyToken, */ update);

  app.delete("/customers/:id", /* verifyToken, */ remove);

  app.post("/otp-verification", otpVerification);

  app.post("/resend-otp", reSendOtp);

  app.put('/password-verification/:id', passwordVerification);

  app.post('/forgot-password', forgotPassword);
};
