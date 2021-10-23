'use strict';

exports.parseJson = data => JSON.parse(data);

exports.deleteKeysInObj = (obj, keys) => {
    keys.forEach(key => delete obj[key]);
    return obj;
};