const util = require("util");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");


let SECRET = null;
let MAILER = null;


const CRED_MAIL = "<b>Username: %s</b><br/><b>Password: %s</b>"


setSecret = (secret) =>
{
    SECRET = secret;
};


fetchSecret = () =>
{
    return SECRET;
};


errorResponse = (err) =>
{
    let response = {};

    if(err.hasOwnProperty("message") && err.message !== null)
        response["message"] = err.message;

    return response;
};


fetchPayloadFromToken = (req) =>
{
    return jwt.decode(req.headers.authorization.split(' ')[1]);
};


initializeMailer = (id, password) =>
{
    MAILER = nodemailer.createTransport(
        {
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: id,
                pass: password
            }
        });
};


sendVerificationMail = (id, email, verification_code) =>
{
    let mailOptions = {
        to: email,
        subject: "Account Activation",
        html: "<b>http://covconnect.live/user/account_activation?user_id=" + id + "&verification_code=" + verification_code + "</b>"
    };

    MAILER.sendMail(mailOptions, (error, info) =>
    {
        if (error) {
            return console.log(error);
        }

        console.log('Message %s sent: %s', info.messageId, info.response);
    });
};


sendCredentialsToHospital = (email, password) =>
{
    let mailOptions = {
        to: email,
        subject: "Cov-Connect Login Credentials",
        html: util.format(CRED_MAIL, email, password)
    };

    MAILER.sendMail(mailOptions, (error, info) =>
    {
        if (error) {
            return console.log(error);
        }

        console.log('Message %s sent: %s', info.messageId, info.response);
    });
};


module.exports =
    {
        setSecret: setSecret,
        fetchSecret: fetchSecret,
        errorResponse: errorResponse,
        fetchPayloadFromToken: fetchPayloadFromToken,
        initializeMailer: initializeMailer,
        sendVerificationMail: sendVerificationMail,
        sendCredentialsToHospital: sendCredentialsToHospital
    };
