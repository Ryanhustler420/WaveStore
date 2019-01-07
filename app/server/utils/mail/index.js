
const mailer = require('nodemailer');
const { welcome } = require('./welcome_template');
require('dotenv').config();

// Mail related functions 

const getEmailTemplate = (to, name, token, type) => {
    let template = null;

    switch (type) {
        case "welcome":
            template = {
                from : `Waves ${process.env.EMAIL_USER}`,
                to,
                subject: `Welcome to waves, ${name} !`,
                // text: "Testing nodemailer npm",
                html: welcome()
            }        
            break;

        default:
            break;
    }

    return template;
}

const sendEmail = (to, name, token, type) => {
    const smtpTransport = mailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mail = getEmailTemplate(to, name, token, type);

    smtpTransport.sendMail(mail, function(err, response) {
        if( err ) {
            console.log(process.env.EMAIL_USER, process.env.EMAIL_PASS)
            console.log(err)
        } else {
            console.log('Email Sent');
        }
        smtpTransport.close();
    })
}

module.exports = { sendEmail }