'use strict';

const db = require("../../config/db");
const { disableExistCustomerAddress } = require("./customerAddresses.utils");

exports.list = async (req, res, next) => {
    try {
        const customerAddresses = await db.customer_addresses.findAll();
        res.status(200).json(customerAddresses);
    } catch (err) {
        next(err);
    }
};

exports.create = async (req, res, next) => {
    try {
        const customerAddress = req.body;
        if (customerAddress.isDefault) {
            disableExistCustomerAddress(customerAddress.customersProfileMstId);
        }
        const newCustomerAddress = await db.customer_addresses.create(customerAddress);
        res.status(201).json(newCustomerAddress);
    } catch (err) {
        next(err);
    }
};

exports.customerAddressById = async (req, res, next) => {
    try {
        const customerAddress = await db.customer_addresses.findByPk(req.params.id);
        res.status(200).json(customerAddress);
    } catch (err) {
        next(err);
    }
};

exports.update = async (req, res, next) => {
    try {
        const customerAddress = req.body;
        const updateCustomerAddress = await db.customer_addresses.update(customerAddress, { where: { id: req.params.id } });
        res.status(201).json(updateCustomerAddress);
    } catch (err) {
        next(err);
    }
};

exports.remove = async (req, res, next) => {
    try {
        await db.customer_addresses.destroy({ where: { id: req.params.id } });
        res.status(200).send({});
    } catch (err) {
        next(err);
    }
};