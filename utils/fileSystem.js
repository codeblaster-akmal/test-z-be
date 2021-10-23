'use strict';

const fs = require('fs-extra');

exports.delFile = (filePath) => {
    fs.access(filePath, error => {
        if (!error) {
            fs.unlink(filePath, (error) => {
                if (error) throw error;
            });
        }
    });
};