'use strict';
const nodemailer = require('nodemailer');
const settings = require('../settings');
const mailConfig = settings.MAIL_CONFIG;

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
    host: mailConfig.HOST,
    port: mailConfig.PORT,
    secure: mailConfig.SECURE, // true for 465, false for other ports
    auth: {
        user: mailConfig.USER,
        pass: mailConfig.PASSWORD
    }
});

exports.sendMail = function (obj) {
    return new Promise(function (resolve, reject) {
        let mailOptions = {
            from: obj.from || '"Test User" <foo@example.com>', // sender address
            to: obj.to, // list of receivers
            subject: obj.subject, // Subject line
            //text: 'Hello world?', // plain text body
            html: obj.html // html body
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                reject({ name: 'EmailTransportError', error: err });
                return;
            }

            resolve({ info: info, messageUrl: nodemailer.getTestMessageUrl(info) });
        });
    });
}