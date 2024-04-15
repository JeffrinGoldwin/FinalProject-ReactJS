const nodemailer = require('nodemailer');

const sendEmail = async (to, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'jeffcrjj@gmail.com',
                pass: 'coje liob nvxx dbgk'
            }
        });

        const mailOptions = {
            from: "jeffcrjj@gmail.com",
            to: to,
            subject: subject,
            text: text,
        };

        const info = await transporter.sendMail(mailOptions);
        
        console.log('Message sent: %s', info.messageId);

        return info; 
    } catch (error) {
        console.error('Error sending email: ', error);
        throw error;
    }
};

module.exports = sendEmail;
