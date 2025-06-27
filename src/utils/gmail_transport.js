
const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_SECRET_EMIAL,
        pass: process.env.GMAIL_SECRET_PASS
    }
});

module.exports = transporter;