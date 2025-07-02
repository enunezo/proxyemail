const nodemailer = require('nodemailer');

// Generate random email and OTP
function generateRandomEmail() {
  const randomId = Math.random().toString(36).substring(2, 10);
  return `user_${randomId}@localhost`;
}

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
}

// Setup mail transporter (local SMTP server)
const transporter = nodemailer.createTransport({
  host: 'localhost',
  port: 2525,
  secure: false,
  tls: {
    rejectUnauthorized: false
  }
});

const email = generateRandomEmail();
const otp = generateOTP();

async function sendMail() {
  try {
    const info = await transporter.sendMail({
      from: '"Your App" <no-reply@yourapp.com>',
      to: email,
      subject: 'Your Verification Code',
      text: `Hello!\n\nYour one-time password (OTP) is: ${otp}\n\nUse it to complete your registration.`
    });

    console.log(`✅ Email sent to ${email} with OTP: ${otp}`);
  } catch (err) {
    console.error('❌ Failed to send email:', err);
  }
}

sendMail();
