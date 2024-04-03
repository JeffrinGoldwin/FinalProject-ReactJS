const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "jeffcrjj@gmail.com",
      pass: "coje liob nvxx dbgk",
    },
  });

module.exports = {transporter}