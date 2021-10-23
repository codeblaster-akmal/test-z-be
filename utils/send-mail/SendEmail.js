const sendMail = require('./index');
const mailConfig = {
    from: process.env.EMAIL,
    password: process.env.PASSWORD,
};

const config = new sendMail(mailConfig);
exports.sendEmail = async (to, subject, content) => {
    await config.sendEmail({
        to: to,
        subject: subject,
        content: content,
        contentType: "html"
    });
};