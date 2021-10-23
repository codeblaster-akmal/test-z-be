const bcrypt = require('bcrypt');

exports.encrypt = async (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(10, (error, salt) => {
            if (error) return reject(error);
            bcrypt.hash(password, salt, (error, hash) => error ? reject(error) : resolve(hash));
        });
    });
}


exports.decrypt = async (password, db) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, db.password, (error, result) => error ? reject(error) : resolve(result));
    });
}