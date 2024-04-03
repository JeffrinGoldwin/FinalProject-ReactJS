const sendEmail = async (to, subject, text, transporter) => {
    try {
      // Define email options
      const mailOptions = {
        from: 'jeffcrjj@gmail.com', 
        to: to,
        subject: subject,
        text: text,
      };
  
      // Send email
    } catch (error) {
      console.error('Error sending email: ', error);
    }
};

module.exports = { sendEmail };