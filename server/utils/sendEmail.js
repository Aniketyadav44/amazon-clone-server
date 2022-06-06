const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    service: process.env.SMTP_MAIL_SERVICE,
    auth: {
      user: process.env.SMTP_MAIL_ID,
      pass: process.env.SMTP_MAIL_PASS,
    },
  });

  await transporter
    .sendMail({
      from: process.env.SMTP_MAIL_PASS,
      to: options.email,
      subject: options.subject,
      text: options.message,
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports = sendEmail;
