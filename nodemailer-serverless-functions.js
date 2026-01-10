// Custom Serverless Function for Nodemailer SMTP
// This can be deployed to any serverless platform (AWS Lambda, Google Cloud Functions, etc.)

const nodemailer = require('nodemailer');

// Main handler function
exports.handler = async (event, context, callback) => {
  try {
    // Parse the incoming request
    const { to, subject, html, smtpConfig, from } = typeof event.body === 'string' 
      ? JSON.parse(event.body) 
      : event.body;

    // Validate required fields
    if (!to || !subject || !html || !smtpConfig) {
      return callback(null, {
        statusCode: 400,
        body: JSON.stringify({
          success: false,
          error: 'Missing required fields: to, subject, html, smtpConfig'
        }),
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Methods': 'POST, OPTIONS'
        }
      });
    }

    // Create Nodemailer transporter with your SMTP config
    const transporter = nodemailer.createTransporter({
      host: smtpConfig.host,
      port: smtpConfig.port || 587,
      secure: smtpConfig.secure || false, // true for 465, false for other ports
      auth: {
        user: smtpConfig.user,
        pass: smtpConfig.pass
      },
      tls: {
        rejectUnauthorized: false // Accept self-signed certificates
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

    // Success response
    callback(null, {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        messageId: info.messageId,
        message: 'Email sent successfully'
      }),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      }
    });

  } catch (error) {
    console.error('Serverless Function Error:', error);
    
    // Error response
    callback(null, {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        error: error.message,
        message: 'Failed to send email'
      }),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      }
    });
  }
};

// For AWS Lambda
module.exports.handler = exports.handler;

// For Google Cloud Functions
module.exports.sendEmail = exports.handler;
