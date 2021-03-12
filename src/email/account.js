const nodemailer = require('nodemailer');

const sendEmail = (activationToken, callback) => {
  try {
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: 'testgmail.com',
      to: 'test@gmail.com',
      subject: 'Testing',
      text: `<h2>Please click on the following link to active your account</h2>
  <p>http://localhost:3000/users/signup/activate/${activationToken}`,
    };

    transporter.sendMail(mailOptions, (error, data) => {
      if (error) throw new Error(error);
    });
    return callback(undefined, 'Email Send');
  } catch (error) {
    return callback(error, undefined);
  }
};
module.exports = sendEmail;
