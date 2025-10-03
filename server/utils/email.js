// const nodemailer = require("nodemailer");

// const sendEmail = ({ subject, to, message }) => new Promise((resolve, reject) => {
//     const Transport = nodemailer.createTransport({
//         service: "gmail",
//         auth: {
//             user: process.env.FROM_EMAIL,
//             pass: process.env.EMAIL_PASS
//         }
//     });

//     Transport.sendMail({
//         from: process.env.FROM_EMAIL,
//         to: to,
//         subject: subject,
//         text: message, // plain text version
//         html: message  // html version
//     }, (err, info) => {
//         if (err) {
//             console.log("Email send error:", err);
//             reject(false);
//         } else {
//             console.log("Email sent:", info.response);
//             resolve(true);
//         }
//     });
// });

// module.exports = sendEmail;




const nodemailer = require("nodemailer");

const sendEmail = ({ to, subject, message, html }) =>
    new Promise((resolve, reject) => {
        const Transport = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.FROM_EMAIL,
                pass: process.env.EMAIL_PASS
            }
        });

        Transport.sendMail(
            {
                from: process.env.FROM_EMAIL,
                to,
                subject,
                text: message, // plain text version
                html           // HTML version
            },
            (err, info) => {
                if (err) {
                    console.log("Email send error:", err);
                    reject(false);
                } else {
                    console.log("Email sent:", info.response);
                    resolve(true);
                }
            }
        );
    });

module.exports = sendEmail;

