
const mailer = require('nodemailer');
const { welcome } = require('./welcome_template');
const { purchase } = require('./purchase_template');
require('dotenv').config();
const { resetPass } = require('./resetpass_template');
// Mail related functions 

const getEmailTemplate = (to, name, token, type, actionData) => {
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
        case "purchase":
            template = {
                from : `Waves ${process.env.EMAIL_USER}`,
                to,
                subject: `Thanks for shopping with us, ${name} !`,
                // text: "Testing nodemailer npm",
                html: purchase(actionData)
            }        
            break;
        case "reset_password":
            template = {
                from : `Waves ${process.env.EMAIL_USER}`,
                to,
                subject: `Hey ${name}, reset your pass`,
                // text: "Testing nodemailer npm",
                html: resetPass(actionData)
            }        
            break;

        default:
            break;
    }

    return template;
}

const sendEmail = (to, name, token, type, actionData = null) => {
    const smtpTransport = mailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mail = getEmailTemplate(to, name, token, type, actionData);

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