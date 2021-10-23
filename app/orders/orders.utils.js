"use strict";

const db = require("../../config/db");

exports.createOrderItems = async orderItems => {
    try {
        await db.order_items.bulkCreate(orderItems);
    } catch (err) {
        throw err;
    }
};