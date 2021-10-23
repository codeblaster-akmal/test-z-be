const nodemailer = require('nodemailer');
const EmailValidationError = require('./EmailValidationError');

var transporter;
var fromEmail;

/* Check valid email */
const validEmailRegEx = /^[A-Z0-9_'%=+!`#~$*?^{}&|-]+([\.][A-Z0-9_'%=+!`#~$*?^{}&|-]+)*@[A-Z0-9-]+(\.[A-Z0-9-]+)+$/i

const isValidEmail = (email, message) => {
    if (!validEmailRegEx.test(email))
        throw new EmailValidationError(message);
}

class Email {

    constructor(configuration) {

        /** 
         * configuration
         *  {
         *      from: string,
         *      password: string,
         *      host: string,
         *      port: number,
         *      secure: boolean
         *  }
        */

        const { from, password, host, port, secure } = configuration;

        if (!from || typeof from !== 'string') {
            throw new EmailValidationError('From email address is required');
        }

        isValidEmail(from.trim(), "From email is invalid");

        if (!password || typeof password !== 'string') {
            throw new EmailValidationError('Password is required');
        }

        transporter = nodemailer.createTransport({
            host: host || 'smtp.gmail.com',
            port: port || 465,
            secure: secure || true, // true for 465, false for other ports
            auth: {
                user: from, // generated ethereal user
                pass: password  // generated ethereal password
            },
            tls: {
                rejectUnauthorized: false
            }
        });
        fromEmail = from; // to-get from address on mailOption
    }

    async sendEmail(mailOption) {

        const { title, to, subject, content, contentType, cc, bcc, attachments } = mailOption;

        let toTitle, email, toText, toHtml, toCc, toBcc;
        let toAttachments = [];

        if (title) {
            /* To check from mail with string */
            let isEmailValid = validEmailRegEx.test(title);
            if (!isEmailValid || !(Array.isArray(title))) {
                toTitle = `${title} <${fromEmail}>`; // it replace abc@gmail.com into actual from address automatically.
            }
        }

        /* To check single or multiple mail */
        if (Array.isArray(to)) {
            // When "to" address is in an array
            to.forEach((address) => isValidEmail(address, "Email address is invalid"));
            email = to.join(', ');
        } else {
            // When "to" address is a single email address
            isValidEmail(to.trim(), "Email address is invalid");
            email = to;
        }


        if (cc) {
            /* If multiple cc */
            if (Array.isArray(cc)) {
                cc.forEach((address) => isValidEmail(address, "Email address is invalid"));
                toCc = cc;
            } else {
                /* If single array override into string */
                isValidEmail(cc.trim(), "Email address is invalid");
                toCc = cc;
            }
        }

        if (bcc) {
            /* If multiple bcc */
            if (Array.isArray(bcc)) {
                bcc.forEach((address) => isValidEmail(address, "Email address is invalid"));
                toBcc = bcc;
            } else {
                /* If single array override into string */
                isValidEmail(bcc.trim(), "Email address is invalid");
                toBcc = bcc;
            }
        }

        if (attachments) {
            if (!(Array.isArray(attachments))) {
                throw new EmailValidationError('Invalid format of attachments');
            }
            attachments.forEach((arr) => {
                if (typeof arr == 'object')
                    throw new EmailValidationError('Invalid format of attachments');
            });
            for (let i = 0; i < attachments.length; i++) {
                toAttachments.push({ path: attachments[i] });
            }
        }

        if (content) {
            if (contentType) {
                /* To check html or text */
                if (contentType.toLowerCase().replace(/[ ]+/g, "") == 'html') {
                    toHtml = content;
                } else {
                    toText = content;
                }
            } else {
                toText = content;
            }
        }

        const sendMailConfig = {
            from: toTitle,
            to: email,
            subject: subject,
            cc: toCc,
            bcc: toBcc,
            text: toText,
            html: toHtml,
            attachments: toAttachments
        }

        try {
            // send mail with defined transport object
            const mail = await transporter.sendMail(sendMailConfig);
            console.log('Message sent: %s', mail.messageId);
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(mail));
        } catch (error) {
            throw new Error(error);
        }
    }
}

module.exports = Email;