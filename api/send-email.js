// Vercel Function for Nodemailer SMTP
// File: api/send-email.js

import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // CORS (helpful for local dev or separate frontend domains)
  res.setHeader('Access-Control-Allow-Origin', process.env.EMAIL_ALLOWED_ORIGIN || '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Only allow POST requests
  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    let body = req.body;
    if (typeof body === 'string') {
      const trimmed = body.trim();
      try {
        body = trimmed ? JSON.parse(trimmed) : {};
      } catch (parseError) {
        return res.status(400).json({ error: 'Invalid JSON body' });
      }
    }
    body = body || {};
    const { to, subject, html, attachments } = body;

    // Validate required fields
    if (!to || !subject || !html) {
      return res.status(400).json({ error: 'Missing required fields: to, subject, html' });
    }

    const smtpHost = process.env.SMTP_HOST || process.env.VITE_SMTP_HOST;
    const smtpPortRaw = process.env.SMTP_PORT || process.env.VITE_SMTP_PORT;
    const smtpSecureRaw = process.env.SMTP_SECURE || process.env.VITE_SMTP_SECURE;
    const smtpUser = process.env.SMTP_USER || process.env.VITE_SMTP_USER;
    const smtpPass = process.env.SMTP_PASS || process.env.VITE_SMTP_PASS;

    const smtpPort = smtpPortRaw ? Number(smtpPortRaw) : 587;
    const smtpSecure =
      String(smtpSecureRaw || '').toLowerCase() === 'true' ||
      String(smtpSecureRaw || '') === '1' ||
      smtpPort === 465;
    const normalizedUser = String(smtpUser).trim();
    const normalizedPass = String(smtpPass).replace(/\s+/g, "");
    const normalizedHost = String(smtpHost).trim();
    const missingEnv = [];
    if (!normalizedHost) missingEnv.push('SMTP_HOST');
    if (!normalizedUser) missingEnv.push('SMTP_USER');
    if (!normalizedPass) missingEnv.push('SMTP_PASS');

    if (missingEnv.length) {
      return res.status(500).json({
        success: false,
        error: 'SMTP env vars are not configured on the server',
        missing: missingEnv,
        message: 'Failed to send email'
      });
    }

    // Create Nodemailer transporter with your SMTP config
    const transporter = nodemailer.createTransport({
      host: normalizedHost,
      port: Number.isFinite(smtpPort) ? smtpPort : 587,
      secure: smtpSecure, // true for 465, false for other ports
      auth: {
        user: normalizedUser,
        pass: normalizedPass
      }
    });

    // Verify transporter connection
    await transporter.verify();

    // Send email
    const fromAddress =
      process.env.EMAIL_FROM ||
      process.env.VITE_EMAIL_FROM ||
      normalizedUser;
    const mailOptions = {
      from: fromAddress,
      to: to,
      subject: subject,
      html: html,
      attachments: Array.isArray(attachments) ? attachments : undefined
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
      error: error?.message || 'Unknown error',
      message: 'Failed to send email'
    });
  }
}
