import nodemailer from "nodemailer"
const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "hudson.jaskolski79@ethereal.email",
    pass: "BDRNQUUvdfrbfXEtU4",
  },
});

async function sendWelcomeEmail(toEmail) {
  try {
    const info = await transporter.sendMail({
      from: '"Welcome Team" <aditya.zemlak@ethereal.email>',
      to: toEmail,
      subject: "Welcome to Our Service!",
      text: "Hello and welcome! We're excited to have you on board.",
      html: `
        <h1>Welcome to the Government Revenue Portal</h1>
        <p>Dear User,</p>
        <p>Thank you for registering with the Government Revenue Portal. You can now manage your tax submissions efficiently:</p>
        <ul>
          <li><strong>Water Tax</strong></li>
          <li><strong>Garbage Tax</strong></li>
          <li><strong>Property Tax</strong></li>
        </ul>
        <p>We are committed to providing you with the best service possible. If you have any questions, please contact our support team.</p>
        <p>Best regards,</p>
        <p>The Government Revenue Portal Team</p>
      `,
    });

    console.log("Welcome message sent: %s", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}


sendWelcomeEmail("ayush274405@gmail.com")
export default  sendWelcomeEmail
