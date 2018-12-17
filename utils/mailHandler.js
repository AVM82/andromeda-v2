const nodeMailer = require('nodemailer');
const errorHandler = require('../utils/errorHandler');
const pref = require('../config/preference');

module.exports = (res, email, text) => {
    const transporter = nodeMailer.createTransport({
        host: pref.sendMailHost,
        port: pref.sendMailPort,
        secure: pref.sendMailSecure,
        auth: {
            user: pref.sendMailUser,
            pass: pref.sendMailPassword
        }
    });

    const mailOptions = {
        from: pref.sendMailUser,
        to: email,
        subject: 'Email from Andromeda',
        text: text
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
            errorHandler(error, res);
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).json({
                success: true,
                info: info.response
            })
        }
    });
};