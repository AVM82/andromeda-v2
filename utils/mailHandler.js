const nodeMailer = require('nodemailer');
const errorHandler = require('../utils/errorHandler');

module.exports = (res, email, text) => {
    const transporter = nodeMailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'airkeeper2018@gmail.com',
            pass: 'holoS58FYO'
        }
    });

    const mailOptions = {
        from: 'airkeeper2018@gmail.com',
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