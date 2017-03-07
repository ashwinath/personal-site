module.exports = {
  email: {
    service: process.env.NODEMAILER_SERVICE,
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASS
    }
  },
  myEmail: process.env.NODEMAILER_MY_EMAIL
}
