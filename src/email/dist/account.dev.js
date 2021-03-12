"use strict";

var nodemailer = require('nodemailer');

var sendEmail = function sendEmail(activationToken, callback) {
  try {
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    });
    var mailOptions = {
      from: 'testgmail.com',
      to: 'test@gmail.com',
      subject: 'Testing',
      text: "<h2>Please click on the following link to active your account</h2>\n  <p>http://localhost:3000/users/signup/activate/".concat(activationToken)
    };
    transporter.sendMail(mailOptions, function (error, data) {
      if (error) throw new Error(error);
    });
    return callback(undefined, 'Email Send');
  } catch (error) {
    return callback(error, undefined);
  }
};

module.exports = sendEmail;