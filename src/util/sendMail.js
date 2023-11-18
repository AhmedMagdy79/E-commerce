const nodemailer = require("nodemailer");

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.PROJECT_MAIL_USER,
        pass: process.env.PROJECT_MAIL_PASSWORD,
    },
});


module.exports.sendVerificationMail = (token, email)=> {
    const mailOptions = {
        from: process.env.PROJECT_MAIL_USER,
        to: email,
        subject: "Ecommerce Api Verify Token",
        text: token,
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log("Error:", error.message);
        }
        console.log("Email sent:", info.response);
    });
}

