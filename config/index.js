require('dotenv').config(); // load .env file

module.exports = {
  port: process.env.PORT,
  app: process.env.APP,
  env: process.env.NODE_ENV,
  secret: process.env.JWT_SECRET,
  hostname: process.env.HOSTNAME,
  mongo: {
    uri: process.env.MONGODB_URL,
    testURI: process.env.MONGODB_TEST_URL,
  },
  transporter: {
    host: process.env.EMAIL_SMTP_HOST,
    port: process.env.EMAIL_SMTP_PORT,
    username: process.env.EMAIL_SMTP_USERNAME,
    password: process.env.EMAIL_SMTP_PASSWORD,
    secure: process.env.EMAIL_SMTP_SECURE,
  },
};
