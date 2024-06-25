const emailConfig = require('../config/email.json');
const nodemailer = require('nodemailer');

exports.sendEmail = async (toName, toEmail, subject, content) => {
    const transporter = nodemailer.createTransport({
        host: emailConfig.host,
        port: emailConfig.port,
        secure: emailConfig.secure, // Use `true` for port 465, `false` for all other ports
        auth: {
          user: emailConfig.auth.user,
          pass: emailConfig.auth.pass,
        },
      });

    const to = `"${toName}" <${toEmail}>`;

    return await transporter.sendMail({
        from: emailConfig.user,
        to: to,
        subject: subject,
        text: content,
        html: content,
    });
}