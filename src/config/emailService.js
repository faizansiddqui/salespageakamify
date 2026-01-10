// Email service configuration using Nodemailer with Vercel Functions
// This uses your own SMTP server configuration

const emailTemplates = {
  bookingConfirmation: (bookingData) => ({
    subject: 'Booking Confirmation - Akamify E-commerce',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="margin: 0; font-size: 2rem;">Booking Confirmed!</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">Your enrollment slot has been successfully booked</p>
        </div>
        
        <div style="background: white; padding: 30px; border: 1px solid #e1e5e9; border-radius: 0 0 10px 10px;">
          <h2 style="color: #2c3e50; margin-bottom: 20px;">Booking Details</h2>
          
          <div style="display: grid; gap: 15px;">
            <div style="padding: 15px; background: #f8f9fa; border-radius: 8px;">
              <strong style="color: #667eea;">Name:</strong> ${bookingData.name}
            </div>
            <div style="padding: 15px; background: #f8f9fa; border-radius: 8px;">
              <strong style="color: #667eea;">Email:</strong> ${bookingData.email}
            </div>
            <div style="padding: 15px; background: #f8f9fa; border-radius: 8px;">
              <strong style="color: #667eea;">Phone:</strong> ${bookingData.phone}
            </div>
            <div style="padding: 15px; background: #f8f9fa; border-radius: 8px;">
              <strong style="color: #667eea;">Business:</strong> ${bookingData.business}
            </div>
            <div style="padding: 15px; background: #f8f9fa; border-radius: 8px;">
              <strong style="color: #667eea;">Scheduled Date:</strong> ${new Date(bookingData.date).toLocaleDateString()}
            </div>
            <div style="padding: 15px; background: #f8f9fa; border-radius: 8px;">
              <strong style="color: #667eea;">Transaction ID:</strong> ${bookingData.transactionId}
            </div>
            <div style="padding: 15px; background: #f8f9fa; border-radius: 8px;">
              <strong style="color: #667eea;">Amount Paid:</strong> ₹${bookingData.amount}
            </div>
          </div>
          
          <div style="margin-top: 30px; padding: 20px; background: #e8f5e8; border-radius: 8px; border-left: 4px solid #28a745;">
            <h3 style="color: #28a745; margin-top: 0;">Security Deposit Refund</h3>
            <p style="margin: 0; color: #666;">Your ₹99 security deposit will be refunded within 24 business hours after the meeting is completed.</p>
          </div>
          
          <div style="margin-top: 30px; padding: 20px; background: #fff3cd; border-radius: 8px; border-left: 4px solid #ffc107;">
            <h3 style="color: #856404; margin-top: 0;">Next Steps</h3>
            <ol style="margin: 10px 0; color: #666;">
              <li>You will receive a calendar invitation with meeting link</li>
              <li>Our team will contact you 1 hour before the scheduled time</li>
              <li>Meeting will be conducted via video call</li>
              <li>Post-meeting, your security deposit will be refunded</li>
            </ol>
          </div>
          
          <div style="margin-top: 30px; text-align: center;">
            <p style="color: #666; margin-bottom: 10px;">For any queries, contact us at:</p>
            <p style="color: #667eea; font-weight: bold;">support@akamify.com</p>
          </div>
        </div>
        
        <div style="text-align: center; margin-top: 20px; color: #999; font-size: 0.9rem;">
          <p>This is an automated email. Please do not reply to this message.</p>
        </div>
      </div>
    `
  }),

  paymentFailed: (bookingData) => ({
    subject: 'Payment Failed - Akamify E-commerce',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="margin: 0; font-size: 2rem;">Payment Failed</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">We couldn't process your payment</p>
        </div>
        
        <div style="background: white; padding: 30px; border: 1px solid #e1e5e9; border-radius: 0 0 10px 10px;">
          <h2 style="color: #2c3e50; margin-bottom: 20px;">What Happened?</h2>
          
          <div style="padding: 20px; background: #f8d7da; border-radius: 8px; border-left: 4px solid #dc3545;">
            <p style="margin: 0; color: #721c24;">Unfortunately, your payment of ₹99 could not be processed. This could be due to insufficient funds, expired card, or a temporary issue with the payment gateway.</p>
          </div>
          
          <div style="margin-top: 30px;">
            <h3 style="color: #2c3e50;">Troubleshooting Steps:</h3>
            <ol style="color: #666; line-height: 1.6;">
              <li>Check if your card has sufficient balance</li>
              <li>Ensure your card details are correct</li>
              <li>Try using a different payment method</li>
              <li>Contact your bank if the issue persists</li>
            </ol>
          </div>
          
          <div style="margin-top: 30px;">
            <h3 style="color: #2c3e50;">Next Steps:</h3>
            <ul style="color: #666; line-height: 1.6;">
              <li>Try booking again with a different payment method</li>
              <li>If you continue to face issues, contact our support team</li>
              <li>No charges have been made to your account</li>
            </ul>
          </div>
          
          <div style="margin-top: 30px; text-align: center;">
            <a href="/book-enrollment" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: 600;">Try Again</a>
          </div>
          
          <div style="margin-top: 30px; text-align: center;">
            <p style="color: #666; margin-bottom: 10px;">Need Help? Contact us at:</p>
            <p style="color: #667eea; font-weight: bold;">support@akamify.com</p>
            <p style="color: #666; margin-top: 10px;">Phone: +91 9876543210</p>
          </div>
        </div>
        
        <div style="text-align: center; margin-top: 20px; color: #999; font-size: 0.9rem;">
          <p>This is an automated email. Please do not reply to this message.</p>
        </div>
      </div>
    `
  }),

  bookingStatusUpdate: (bookingData) => ({
    subject: `Booking Status Update - ${bookingData.status.toUpperCase()}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="margin: 0; font-size: 2rem;">Booking Status Update</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">Your booking status has been updated</p>
        </div>
        
        <div style="background: white; padding: 30px; border: 1px solid #e1e5e9; border-radius: 0 0 10px 10px;">
          <h2 style="color: #2c3e50; margin-bottom: 20px;">Status: ${bookingData.status.toUpperCase()}</h2>
          
          <div style="display: grid; gap: 15px;">
            <div style="padding: 15px; background: #f8f9fa; border-radius: 8px;">
              <strong style="color: #667eea;">Booking ID:</strong> ${bookingData.id || bookingData.transactionId}
            </div>
            <div style="padding: 15px; background: #f8f9fa; border-radius: 8px;">
              <strong style="color: #667eea;">Name:</strong> ${bookingData.name}
            </div>
            <div style="padding: 15px; background: #f8f9fa; border-radius: 8px;">
              <strong style="color: #667eea;">Scheduled Date:</strong> ${new Date(bookingData.date).toLocaleDateString()}
            </div>
          </div>
          
          ${bookingData.status === 'completed' ? `
            <div style="margin-top: 30px; padding: 20px; background: #d4edda; border-radius: 8px; border-left: 4px solid #28a745;">
              <h3 style="color: #155724; margin-top: 0;">Meeting Completed!</h3>
              <p style="margin: 0; color: #155724;">Thank you for attending the meeting. Your security deposit refund has been processed and will be credited to your account within 24 business hours.</p>
            </div>
          ` : ''}
          
          ${bookingData.status === 'cancelled' ? `
            <div style="margin-top: 30px; padding: 20px; background: #f8d7da; border-radius: 8px; border-left: 4px solid #dc3545;">
              <h3 style="color: #721c24; margin-top: 0;">Booking Cancelled</h3>
              <p style="margin: 0; color: #721c24;">Your booking has been cancelled. If you didn't request this cancellation, please contact our support team immediately.</p>
            </div>
          ` : ''}
          
          ${bookingData.status === 'pending' ? `
            <div style="margin-top: 30px; padding: 20px; background: #fff3cd; border-radius: 8px; border-left: 4px solid #ffc107;">
              <h3 style="color: #856404; margin-top: 0;">Booking Pending</h3>
              <p style="margin: 0; color: #856404;">Your booking is being processed. You will receive a confirmation email shortly with meeting details.</p>
            </div>
          ` : ''}
          
          <div style="margin-top: 30px; text-align: center;">
            <p style="color: #666; margin-bottom: 10px;">For any queries, contact us at:</p>
            <p style="color: #667eea; font-weight: bold;">support@akamify.com</p>
          </div>
        </div>
        
        <div style="text-align: center; margin-top: 20px; color: #999; font-size: 0.9rem;">
          <p>This is an automated email. Please do not reply to this message.</p>
        </div>
      </div>
    `
  })
};

// Nodemailer SMTP configuration using Vercel Functions
const sendVercelNodemailerEmail = async (to, subject, html) => {
  try {
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to,
        subject,
        html,
        smtpConfig: {
          host: import.meta.env.VITE_SMTP_HOST,
          port: parseInt(import.meta.env.VITE_SMTP_PORT) || 587,
          secure: import.meta.env.VITE_SMTP_SECURE === 'true',
          auth: {
            user: import.meta.env.VITE_SMTP_USER,
            pass: import.meta.env.VITE_SMTP_PASS
          }
        },
        from: import.meta.env.VITE_EMAIL_FROM || 'noreply@akamify.com'
      })
    });

    if (!response.ok) {
      throw new Error('Failed to send email via Vercel Nodemailer');
    }

    return await response.json();
  } catch (error) {
    console.error('Vercel Nodemailer email error:', error);
    throw error;
  }
};

// Main email sending function using Nodemailer
const sendEmail = async (to, subject, templateData) => {
  const html = templateData.html || templateData;
  
  try {
    // Try Vercel Functions first
    return await sendVercelNodemailerEmail(to, subject, html);
  } catch (error) {
    console.warn('Vercel Nodemailer failed, using fallback:', error.message);
    
    // Fallback - console logging for development
    if (import.meta.env.DEV) {
      console.log('=== EMAIL SENT (DEVELOPMENT FALLBACK) ===');
      console.log('To:', to);
      console.log('Subject:', subject);
      console.log('HTML:', html);
      console.log('SMTP Config:', {
        host: import.meta.env.VITE_SMTP_HOST,
        port: import.meta.env.VITE_SMTP_PORT,
        secure: import.meta.env.VITE_SMTP_SECURE,
        user: import.meta.env.VITE_SMTP_USER
      });
      console.log('=========================================');
      return { success: true, message: 'Email logged in development mode' };
    }

    throw new Error('Email sending failed');
  }
};

export { sendEmail, emailTemplates };
