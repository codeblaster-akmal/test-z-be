const { diff_minutes } = require("../timeDiff");


exports.emailVerification = async (otlTime,expiryTime) =>{
    const validateExpiry = diff_minutes(otlTime);
    if (expiryTime > validateExpiry) {
      return true;
    } else {
      return false;
    }
};