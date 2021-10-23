'use strict';

const db = require("../../config/db");
const { dateToNum } = require("../timeDiff");

const codeGenerator = (numberofDigit, prefix, startValue, startFrom,order) => {
    const zeroPad = (num, places) => String(num).padStart(places, startFrom);
    if (order) {
        return `${prefix}${dateToNum(new Date())}${zeroPad(startValue, numberofDigit)}`;
    }

    return `${prefix}${zeroPad(startValue, numberofDigit)}`;
};

exports.sequenceGenerator = async (name, order) => {
    try {
        const { numberofDigit, prefix, startValue, startFrom, id } = await db.sequences.findOne({ where: { name } });
        const uniqueId = codeGenerator(numberofDigit, prefix, startValue, startFrom,order);
        return { uniqueId, startValue, seqId: id };
    } catch (error) {
        throw error;
    }
};

exports.updateSequence = async (recordId, value) => {
    await db.sequences.update(value, { where: { id: recordId } });
};