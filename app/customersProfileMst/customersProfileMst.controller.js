"use strict";

const db = require("../../config/db");
const { CONSTANTS } = require("../../utils/constants");
const { SCHEMA } = require("../../utils/dbUtils/schema");
const {
  sequenceGenerator,
  updateSequence,
} = require("../../utils/dbUtils/sequenceGenerator");
const { encrypt } = require("../../utils/encryptNdecrypt/bcrypt");
const { expiryTimeFunc } = require("../../utils/expiryTime");
const { otpGenerate } = require("../../utils/otp");
const {
  emailVerification,
} = require("../../utils/send-mail/EmailVerification");
const { sendEmail } = require("../../utils/send-mail/SendEmail");

exports.list = async (req, res, next) => {
  try {
    const {
      attributes,
      sort = "id",
      order = "asc",
      customer_addresses,
      customer_addresses_attr,
      cities,
      cities_attr,
      counties,
      counties_attr,
    } = req.query;
    let customers = {},
      args = { order: [[sort, order]] },
      includes = [],
      addressesIncludes = [],
      citiesIncludes = [];

    const customerAddressSchema = {
      ...SCHEMA.CUSTOMER_ADDRESSES,
      attributes: customer_addresses_attr,
    };

    const citiesSchema = {
      ...SCHEMA.CITY,
      attributes: cities_attr,
    };

    const countiesSchema = {
      ...SCHEMA.COUNTY,
      attributes: counties_attr,
    };

    if (attributes) args.attributes = attributes;

    if (customer_addresses) args.attributes = attributes;

    if (cities) addressesIncludes.push(citiesSchema);

    if (counties) citiesIncludes.push(countiesSchema);

    if (citiesIncludes.length) citiesSchema.include = citiesIncludes;

    if (addressesIncludes.length)
      customerAddressSchema.include = addressesIncludes;

    if (customer_addresses) includes.push(customerAddressSchema);

    if (includes.length) args.include = includes;
    const data = await db.customersProfileMst.findAll(args);
    customers.data = data;
    res.status(200).json(customers);
  } catch (error) {
    next(error);
  }
};

exports.create = async (req, res, next) => {
  try {
    const customer = req.body;
    const { uniqueId, startValue, seqId } = await sequenceGenerator(
      CONSTANTS.CUSTOMER_NUMBER_SEQ_GEN
    );
    const otpSignup = otpGenerate(5);
    const expiry = await expiryTimeFunc("CUSTOMER_SIGNUP_EMAIL_EXPIRY");
    const expiryTime = +expiry.value;
    const newCustomer = await db.customersProfileMst.create({
      ...customer,
      customerSeqId: uniqueId,
      password: await encrypt(customer.password),
      otpSignup: otpSignup,
      expiryTime: expiryTime,
      otlTime: new Date(),
    });
    await updateSequence(seqId, { startValue: startValue + 1 });
    res.status(200).json(newCustomer);
    // const result = await db.configurations.findAll({where : {key:['CUSTOMER_SIGNUP_EMAIL_TEMPLATE', 'CUSTOMER_SIGNUP_EMAIL_SUBJECT']}});
    // let subject = JSON.parse(JSON.stringify(result)).find(o => o.key === 'CUSTOMER_SIGNUP_EMAIL_SUBJECT').value;
    // let content = JSON.parse(JSON.stringify(result)).find(o => o.key === 'CUSTOMER_SIGNUP_EMAIL_TEMPLATE').value;
    const result = await db.email_templates.findOne({ where: { id: 1 } });
    let subject = result.subject;
    let content = result.description.replace("${otpSignup}", otpSignup);
    let contentHost = content.split("${host}").join(CONSTANTS.DEFAULT_HOST);
    sendEmail(newCustomer.email, subject, `${contentHost}`);
  } catch (error) {
    next(error);
  }
};

exports.customerById = async (req, res, next) => {
  try {
    const {
      attributes,
      sort = "id",
      order = "asc",
      customer_addresses,
      customer_addresses_attr,
      cities,
      cities_attr,
      counties,
      counties_attr,
    } = req.query;
    const { id } = req.params;
    let customer = {},
      args = { where: { id }, order: [[sort, order]] },
      includes = [],
      addressesIncludes = [],
      citiesIncludes = [];

    const customerAddressSchema = {
      ...SCHEMA.CUSTOMER_ADDRESSES,
      attributes: customer_addresses_attr,
    };

    const citiesSchema = {
      ...SCHEMA.CITY,
      attributes: cities_attr,
    };

    const countiesSchema = {
      ...SCHEMA.COUNTY,
      attributes: counties_attr,
    };

    if (attributes) args.attributes = attributes;

    if (customer_addresses) args.attributes = attributes;

    if (cities) addressesIncludes.push(citiesSchema);

    if (counties) citiesIncludes.push(countiesSchema);

    if (citiesIncludes.length) citiesSchema.include = citiesIncludes;

    if (addressesIncludes.length)
      customerAddressSchema.include = addressesIncludes;

    if (customer_addresses) includes.push(customerAddressSchema);

    if (includes.length) args.include = includes;
    const data = await db.customersProfileMst.findOne(args);
    customer.data = data;
    res.status(200).json(customer);
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    const customer = req.body;
    let updateData;
    if (customer && customer.password) {
      updateData = { ...customer, password: await encrypt(customer.password) };
    } else {
      updateData = customer;
    }
    const updateCustomer = await db.customersProfileMst.update(updateData, {
      where: { id: req.params.id },
    });
    res.status(200).json(updateCustomer);
  } catch (error) {
    next(error);
  }
};

exports.remove = async (req, res, next) => {
  try {
    await db.customersProfileMst.destroy({ where: { id: req.params.id } });
    res.status(200).send({});
  } catch (error) {
    next(error);
  }
};

exports.otpVerification = async (req, res, next) => {
  try {
    const { forgot_password } = req.query;

    if (forgot_password) {
      const { id, otpFp } = req.body;
      const customer = await db.customersProfileMst.findOne({
        where: { id, otpFp },
      });
      if (customer) {
        if (
          await emailVerification(customer.otlTimeFp, customer.expiryTimeFp)
        ) {
          const customerVerified = await db.customersProfileMst.findOne({
            where: { id },
          });
          res.status(200).json(customerVerified);
        } else {
          res.status(400).json({ error: "OTP expired" });
        }
      } else {
        res.status(400).json({ error: "Invalid OTP!" });
      }
    } else {
      const { id, otpSignup } = req.body;
      const customer = await db.customersProfileMst.findOne({
        where: { id, otpSignup },
      });
      if (customer) {
        if (await emailVerification(customer.otlTime, customer.expiryTime)) {
          await db.customersProfileMst.update(
            { isVerified: true },
            {
              where: { id: customer.id },
            }
          );
          const customerVerified = await db.customersProfileMst.findOne({
            where: { id },
          });
          res.status(200).json(customerVerified);
        } else {
          res.status(400).json({ error: "OTP expired" });
        }
      } else {
        res.status(400).json({ error: "Invalid OTP!" });
      }
    }
  } catch (error) {
    next(error);
  }
};

exports.reSendOtp = async (req, res, next) => {
  try {
    const { resend_fp } = req.query;

    if (resend_fp) {
      const { email } = req.body;
      const customer = await db.customersProfileMst.findOne({
        where: { email },
      });
      if (customer) {
        const otpFp = otpGenerate(5);
        const expiry = await expiryTimeFunc("CUSTOMER_FP_EMAIL_EXPIRY");
        const expiryTimeFp = +expiry.value;
        const otlTimeFp = new Date();

        let otpUpdate = {
          otpFp,
          expiryTimeFp,
          otlTimeFp,
        };
        const resendOtpCustomer = await db.customersProfileMst.update(
          otpUpdate,
          {
            where: { id: customer.id },
          }
        );
        const customerData = await db.customersProfileMst.findOne({
          where: { id: customer.id },
        });
        const result = await db.email_templates.findOne({ where: { id: 2 } });
        let subject = result.subject;
        let content = result.description.replace("${otpSignup}", otpFp);
        let contentHost = content.split("${host}").join(CONSTANTS.DEFAULT_HOST);
        sendEmail(email, subject, `${contentHost}`);
        res.status(200).json(customerData);
      } else {
        res.status(400).json({ error: "Invalid E-mail!" });
      }
    } else {
      const { email } = req.body;
      const customer = await db.customersProfileMst.findOne({
        where: { email },
      });
      if (customer) {
        const otpSignup = otpGenerate(5);
        const expiry = await expiryTimeFunc("CUSTOMER_SIGNUP_EMAIL_EXPIRY");
        const expiryTime = +expiry.value;
        const otlTime = new Date();

        let otpUpdate = {
          otpSignup,
          expiryTime,
          otlTime,
        };
        const resendOtpCustomer = await db.customersProfileMst.update(
          otpUpdate,
          {
            where: { id: customer.id },
          }
        );
        const customerData = await db.customersProfileMst.findOne({
          where: { id: customer.id },
        });
        const result = await db.email_templates.findOne({ where: { id: 1 } });
        let subject = result.subject;
        let content = result.description.replace("${otpSignup}", otpSignup);
        let contentHost = content.split("${host}").join(CONSTANTS.DEFAULT_HOST);
        sendEmail(email, subject, `${contentHost}`);
        res.status(200).json(customerData);
      } else {
        res.status(400).json({ error: "Invalid E-mail!" });
      }
    }
  } catch (error) {
    next(error);
  }
};

exports.forgotPassword = async (request, response, next) => {
  try {
    const { email } = request.body;
    const newConditions = { where: { email: email } };

    const user = await db.customersProfileMst.findOne(newConditions);
    if (user === null) {
      response.status(400).json({ error: "Email address not found" });
    } else {
      if (user.email !== email) {
        response.status(400).json({ error: "Email address not found" });
      } else {
        const otpFp = otpGenerate(5);
        const otlTimeFp = new Date();
        const expiry = await expiryTimeFunc("CUSTOMER_FP_EMAIL_EXPIRY");
        const expiryTimeFp = +expiry.value;
        let conditions = {};
        conditions.otpFp = otpFp;
        conditions.expiryTimeFp = expiryTimeFp;
        conditions.otlTimeFp = otlTimeFp;
        const updatedCustomer = await db.customersProfileMst.update(
          conditions,
          { where: { id: user.id } }
        );

        const customerData = await db.customersProfileMst.findOne({
          where: { id: user.id },
        });

        response.status(200).json(customerData);

        const result = await db.email_templates.findOne({ where: { id: 2 } });
        let subject = result.subject;
        let content = result.description.replace("${otpSignup}", otpFp);
        let contentHost = content.split("${host}").join(CONSTANTS.DEFAULT_HOST);
        sendEmail(user.email, subject, `${contentHost}`);
      }
    }
  } catch (error) {
    next(error);
  }
};

exports.passwordVerification = async (request, response, next) => {
  try {
    const customer = request.body;
    const updateCustomer = await db.customersProfileMst.update(
      { password: await encrypt(customer.password) },
      { where: { id: request.params.id } }
    );
    response.status(200).json(updateCustomer);
  } catch (error) {
    next(error);
  }
};
