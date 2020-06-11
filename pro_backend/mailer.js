const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  service: "gmail.com",
  secure: false,
  auth: {
    user: "sruthi.testemail2@gmail.com",
    pass: "12345test2",
  },
  tls: {
    rejectUnauthorized: false,
  },

});
/*let transporter = nodemailer.createTransport(
  smtpTransport({
    host: "gmail.com", // hostname
    secure: false, // use SSL
    port: 25, // port for secure SMTP
    auth: {
      user: "sruthi.testemail2@gmail.com",
      pass: "12345test2",
    },
    
  })

);*/

let mailOptions = {
  from: "sruthi.testemail2@gmail.com",
  to: "sruthi.testemail@gmail.com",
  subject: "biba fashion capital",
  text: "shipped",
};

transporter.sendMail(mailOptions, function (err, data) {
  if (err) {
    console.log("Error:", err);
  } else {
    console.log("Email sent!!!");
  }
});
