// Vercel Function for Nodemailer SMTP
// File: api/send-email.js

const nodemailer = require('nodemailer');

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { to, subject, html, smtpConfig, from } = req.body;

    // Validate required fields
    if (!to || !subject || !html || !smtpConfig) {
      return res.status(400).json({ error: 'Missing required fields: to, subject, html, smtpConfig' });
    }

    // Create Nodemailer transporter with your SMTP config
    const transporter = nodemailer.createTransport({
      host: smtpConfig.host,
      port: smtpConfig.port || 587,
      secure: smtpConfig.secure || false, // true for 465, false for other ports
      auth: {
        user: smtpConfig.user,
        pass: smtpConfig.pass
      }
    });

    // Verify transporter connection
    await transporter.verify();

    // Send email
    const mailOptions = {
      from: from || smtpConfig.user,
      to: to,
      subject: subject,
      html: html
    };

    const info = await transporter.sendMail(mailOptions);

    res.status(200).json({
      success: true,
      messageId: info.messageId,
      message: 'Email sent successfully'
    });

  } catch (error) {
    console.error('Vercel Function Error:', error);
    
    res.status(500).json({
      success: false,
      error: error.message,
      message: 'Failed to send email'
    });
  }
}
