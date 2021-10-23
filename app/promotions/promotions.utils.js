'use strict';

const schedule = require('node-schedule');
const { db } = require('../../config');

const splitString = string => {
    const regex = /-/g;
    const nameList = string.split(regex);
    const nameObject = {
        jobName: nameList[1],
        id: nameList[2]
    };

    return nameObject;
};

const callbackJob = (id, status) => {
    // db.promotions.update({ status }, { where: { id } });
};

exports.cancelCronJob = name => schedule.cancelJob(name);

exports.createPromotionCronJob = (name, date) => {
    schedule.scheduleJob(name, date, () => {
        const { jobName, id } = splitString(name);
        const data = (jobName === "start") ? "RUNNING" : "EXPIRED";
        callbackJob(id, data);
    });
};

exports.createPromotionItems = async (promotionItems, promotionId) => {
    const parsePromotionItems = parseJson(promotionItems);
    const appendPromotionId = parsePromotionItems.map(item => ({ ...item, promotionId }));
    await db.promotion_items.bulkCreate(appendPromotionId);
};

exports.destroyPromotionItems = async promotionId => {
    await db.promotion_items.destroy({ where: { promotionId } });
};