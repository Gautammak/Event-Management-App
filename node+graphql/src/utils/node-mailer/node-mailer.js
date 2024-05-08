require('dotenv').config();
const nodemailer = require('nodemailer');
const sendPasswordResetEmail = (email, resetToken) => {

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.USER ,
      pass: process.env.PASS,
    },
  });
  const mailOptions = {
    from: process.env.FROM, 
    to: email,
    subject: 'Password Reset',
    html: `<p>Click the following link to reset your password:</p><p><a href="http://your-app-url/reset-password?token=${resetToken}">Reset Password</a></p>`,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};

module.exports = sendPasswordResetEmail;
