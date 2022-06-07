const nodemailer = require('nodemailer');
const { host, port, username, password,  } = require('../config').transporter;

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  host: host,
  port: port,
  //secure: process.env.EMAIL_SMTP_SECURE, // lack of ssl commented this. You can uncomment it.
  auth: {
    user: username,
    pass: password,
  },
});

exports.send = function (from, to, subject, html) {
  // send mail with defined transport object
  // visit https://nodemailer.com/ for more options
  return transporter.sendMail({
    from: from, // sender address e.g. no-reply@xyz.com or "Fred Foo 👻" <foo@example.com>
    to: to, // list of receivers e.g. bar@example.com, baz@example.com
    subject: subject, // Subject line e.g. 'Hello ✔'
    //text: text, // plain text body e.g. Hello world?
    html: html, // html body e.g. '<b>Hello world?</b>'
  });
};
