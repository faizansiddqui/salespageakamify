// Email service configuration using Nodemailer with Vercel Functions
// This uses your own SMTP server configuration

const emailTemplates = {
  planPurchase: (purchaseData) => {
    const formatCurrency = (value) =>
      `Rs. ${Number(value || 0).toLocaleString("en-IN")}`;

    return {
      subject: `Plan Purchase Request - ${purchaseData?.planName || "Selected Plan"}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 700px; margin: 0 auto; padding: 16px;">
          <div style="background: linear-gradient(135deg, #111827 0%, #374151 100%); color: white; padding: 28px; text-align: center; border-radius: 12px 12px 0 0;">
            <h1 style="margin: 0; font-size: 1.8rem;">Plan Purchase Request</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">Thank you! We have received your request.</p>
          </div>

          <div style="background: white; padding: 24px; border: 1px solid #e5e7eb; border-radius: 0 0 12px 12px;">
            <h2 style="color: #111827; margin-bottom: 16px;">Your Plan Summary</h2>

            <div style="display: grid; gap: 12px;">
              <div style="padding: 12px; background: #f9fafb; border-radius: 8px;">
                <strong>Plan:</strong> ${purchaseData?.planName || "N/A"}
              </div>
              <div style="padding: 12px; background: #f9fafb; border-radius: 8px;">
                <strong>Base Price:</strong> ${formatCurrency(purchaseData?.basePrice)}
              </div>
              <div style="padding: 12px; background: #f9fafb; border-radius: 8px;">
                <strong>Pages Included:</strong> ${purchaseData?.basePages ?? "N/A"}
              </div>
              <div style="padding: 12px; background: #f9fafb; border-radius: 8px;">
                <strong>Extra Pages:</strong> ${purchaseData?.extraPages ?? 0} (${formatCurrency(purchaseData?.pageAddOnCost)} add-on)
              </div>
              <div style="padding: 12px; background: #f9fafb; border-radius: 8px;">
                <strong>Delivery:</strong> ${purchaseData?.deliveryLabel || "Standard"} (${formatCurrency(purchaseData?.deliveryAddOn)})
              </div>
              <div style="padding: 14px; background: #ecfeff; border-radius: 8px; border-left: 4px solid #06b6d4;">
                <strong>Total Estimated:</strong> ${formatCurrency(purchaseData?.total)}
              </div>
            </div>

            <h3 style="margin-top: 24px; color: #111827;">Your Details</h3>
            <div style="display: grid; gap: 10px;">
              <div><strong>Name:</strong> ${purchaseData?.name || "N/A"}</div>
              <div><strong>Email:</strong> ${purchaseData?.email || "N/A"}</div>
              <div><strong>Phone:</strong> ${purchaseData?.phone || "N/A"}</div>
              <div><strong>Business:</strong> ${purchaseData?.business || "N/A"}</div>
              <div><strong>Notes:</strong> ${purchaseData?.notes || "N/A"}</div>
            </div>

            <div style="margin-top: 24px; padding: 16px; background: #fef9c3; border-radius: 8px; border-left: 4px solid #f59e0b;">
              <strong>Next Step:</strong> Our team will confirm availability and send the final invoice + timeline within 24 hours.
            </div>
          </div>

          <div style="text-align: center; margin-top: 16px; color: #9ca3af; font-size: 0.9rem;">
            <p>This is an automated email. Please do not reply directly.</p>
          </div>
        </div>
      `,
    };
  },

  planPurchaseAdmin: (purchaseData) => {
    const formatCurrency = (value) =>
      `Rs. ${Number(value || 0).toLocaleString("en-IN")}`;

    return {
      subject: `New Plan Purchase - ${purchaseData?.name || "Lead"} (${purchaseData?.planName || "Plan"})`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 700px; margin: 0 auto; padding: 16px;">
          <div style="background: #111827; color: white; padding: 20px; border-radius: 10px 10px 0 0;">
            <h2 style="margin: 0;">New Plan Purchase Lead</h2>
          </div>
          <div style="background: white; border: 1px solid #e5e7eb; border-radius: 0 0 10px 10px; padding: 20px;">
            <p><strong>Name:</strong> ${purchaseData?.name || "N/A"}</p>
            <p><strong>Email:</strong> ${purchaseData?.email || "N/A"}</p>
            <p><strong>Phone:</strong> ${purchaseData?.phone || "N/A"}</p>
            <p><strong>Business:</strong> ${purchaseData?.business || "N/A"}</p>
            <p><strong>Plan:</strong> ${purchaseData?.planName || "N/A"}</p>
            <p><strong>Base Price:</strong> ${formatCurrency(purchaseData?.basePrice)}</p>
            <p><strong>Extra Pages:</strong> ${purchaseData?.extraPages ?? 0} (${formatCurrency(purchaseData?.pageAddOnCost)})</p>
            <p><strong>Delivery:</strong> ${purchaseData?.deliveryLabel || "Standard"} (${formatCurrency(purchaseData?.deliveryAddOn)})</p>
            <p><strong>Total:</strong> ${formatCurrency(purchaseData?.total)}</p>
            <p><strong>Notes:</strong> ${purchaseData?.notes || "N/A"}</p>
          </div>
        </div>
      `,
    };
  },

  planInvoice: (invoiceData) => {
    const formatCurrency = (value) =>
      `Rs. ${Number(value || 0).toLocaleString("en-IN")}`;

    return {
      subject: `Invoice - ${invoiceData?.invoiceId || "Plan Purchase"}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 700px; margin: 0 auto; padding: 16px;">
          <div style="background: linear-gradient(135deg, #0f172a 0%, #1f2937 100%); color: white; padding: 26px; border-radius: 12px 12px 0 0;">
            <h2 style="margin: 0;">Invoice</h2>
            <p style="margin: 8px 0 0 0; opacity: 0.85;">Thank you for your purchase.</p>
          </div>
          <div style="border: 1px solid #e5e7eb; border-radius: 0 0 12px 12px; padding: 20px; background: #fff;">
            <p><strong>Invoice ID:</strong> ${invoiceData?.invoiceId || "N/A"}</p>
            <p><strong>Payment ID:</strong> ${invoiceData?.paymentId || "N/A"}</p>
            <p><strong>Date:</strong> ${invoiceData?.date ? new Date(invoiceData.date).toLocaleString() : "N/A"}</p>
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 16px 0;" />
            <p><strong>Plan:</strong> ${invoiceData?.planName || "N/A"}</p>
            <p><strong>Base Price:</strong> ${formatCurrency(invoiceData?.basePrice)}</p>
            <p><strong>Extra Pages:</strong> ${invoiceData?.extraPages ?? 0} (${formatCurrency(invoiceData?.pageAddOnCost)})</p>
            <p><strong>Delivery Add-on:</strong> ${invoiceData?.deliveryLabel || "Standard"} (${formatCurrency(invoiceData?.deliveryAddOn)})</p>
            <p style="font-size: 16px; font-weight: 700; margin-top: 12px;">Total: ${formatCurrency(invoiceData?.total)}</p>
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 16px 0;" />
            <p><strong>Customer:</strong> ${invoiceData?.name || "N/A"}</p>
            <p><strong>Email:</strong> ${invoiceData?.email || "N/A"}</p>
            <p><strong>Phone:</strong> ${invoiceData?.phone || "N/A"}</p>
          </div>
          <p style="text-align: center; color: #9ca3af; font-size: 12px; margin-top: 12px;">
            Invoice PDF is attached with this email.
          </p>
        </div>
      `,
    };
  },

  planInvoiceAdmin: (invoiceData) => {
    const formatCurrency = (value) =>
      `Rs. ${Number(value || 0).toLocaleString("en-IN")}`;

    return {
      subject: `Invoice Generated - ${invoiceData?.invoiceId || "Plan Purchase"}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 700px; margin: 0 auto; padding: 16px;">
          <div style="background: #111827; color: white; padding: 20px; border-radius: 10px 10px 0 0;">
            <h3 style="margin: 0;">Invoice Generated</h3>
          </div>
          <div style="border: 1px solid #e5e7eb; border-radius: 0 0 10px 10px; padding: 20px;">
            <p><strong>Invoice ID:</strong> ${invoiceData?.invoiceId || "N/A"}</p>
            <p><strong>Payment ID:</strong> ${invoiceData?.paymentId || "N/A"}</p>
            <p><strong>Plan:</strong> ${invoiceData?.planName || "N/A"}</p>
            <p><strong>Total:</strong> ${formatCurrency(invoiceData?.total)}</p>
            <p><strong>Customer:</strong> ${invoiceData?.name || "N/A"} (${invoiceData?.email || "N/A"})</p>
          </div>
        </div>
      `,
    };
  },
  bookingConfirmation: (bookingData) => ({
  subject: 'Booking Confirmation - Akamify E-commerce',
  html: `
    <div style="background-color: #f8fafc; padding: 40px 10px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0;">
        
        <div style="background-color: #4f46e5; padding: 40px 20px; text-align: center;">
          <div style="display: inline-block; background: rgba(255,255,255,0.2); padding: 10px; border-radius: 12px; margin-bottom: 16px;">
             <img src="https://img.icons8.com/ios-filled/50/ffffff/ok--v1.png" width="30" height="30" style="display: block;"/>
          </div>
          <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 800; letter-spacing: -0.025em;">Booking Confirmed!</h1>
          <p style="margin: 8px 0 0 0; color: #c7d2fe; font-size: 14px; font-weight: 500;">Your enrollment slot is secured and ready.</p>
        </div>

        <div style="padding: 32px 24px;">
          <h2 style="margin: 0 0 20px 0; color: #1e293b; font-size: 16px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em;">Enrollment Summary</h2>
          
          <div style="background-color: #f1f5f9; border-radius: 12px; padding: 16px;">
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="padding: 8px 0; font-size: 13px; color: #64748b; font-weight: 600;">NAME</td>
                <td style="padding: 8px 0; font-size: 13px; color: #0f172a; font-weight: 700; text-align: right;">${bookingData.name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-size: 13px; color: #64748b; font-weight: 600;">EMAIL</td>
                <td style="padding: 8px 0; font-size: 13px; color: #0f172a; font-weight: 700; text-align: right;">${bookingData.email}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-size: 13px; color: #64748b; font-weight: 600;">PHONE</td>
                <td style="padding: 8px 0; font-size: 13px; color: #0f172a; font-weight: 700; text-align: right;">${bookingData.phone}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-size: 13px; color: #64748b; font-weight: 600;">BUSINESS</td>
                <td style="padding: 8px 0; font-size: 13px; color: #0f172a; font-weight: 700; text-align: right;">${bookingData.business}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-size: 13px; color: #64748b; font-weight: 600;">SELECTED PLAN</td>
                <td style="padding: 8px 0; font-size: 13px; color: #0f172a; font-weight: 700; text-align: right;">${bookingData.planName || bookingData.planKey || "N/A"}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-size: 13px; color: #64748b; font-weight: 600;">SCHEDULED DATE</td>
                <td style="padding: 8px 0; font-size: 13px; color: #4f46e5; font-weight: 800; text-align: right;">${new Date(bookingData.date).toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</td>
              </tr>
            </table>
          </div>

          <div style="margin-top: 16px; border-top: 1px dashed #e2e8f0; padding-top: 16px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
              <span style="font-size: 12px; color: #94a3b8; font-weight: 600;">TRANSACTION ID</span>
              <span style="font-size: 12px; color: #64748b; font-family: monospace;">${bookingData.transactionId}</span>
            </div>
            <div style="font-size: 14px; color: #0f172a; font-weight: 700;">
              Total Paid: <span style="color: #059669;">Rs. ${bookingData.amount}</span>
            </div>
          </div>

          <div style="margin-top: 32px; background-color: #ecfdf5; border-radius: 12px; padding: 20px; border: 1px solid #d1fae5;">
            <h3 style="margin: 0 0 8px 0; color: #065f46; font-size: 14px; font-weight: 700;">Security Deposit Refund</h3>
            <p style="margin: 0; color: #065f46; font-size: 13px; opacity: 0.8; line-height: 1.5;">Your <strong>Rs. 99</strong> security deposit will be automatically processed for refund within 24 business hours after the meeting.</p>
          </div>

          <div style="margin-top: 24px; padding: 20px; border: 1px solid #f1f5f9; border-radius: 12px;">
            <h3 style="margin: 0 0 12px 0; color: #1e293b; font-size: 14px; font-weight: 700;">Next Steps</h3>
            <ul style="margin: 0; padding-left: 18px; color: #475569; font-size: 13px; line-height: 1.8;">
              <li>Watch for a calendar invitation in your inbox.</li>
              <li>Our team will reach out 1 hour prior to your slot.</li>
              <li>Ensure your camera and mic are working.</li>
              <li>Refund triggers immediately post-meeting.</li>
            </ul>
          </div>

          <div style="margin-top: 32px; text-align: center; border-top: 1px solid #f1f5f9; padding-top: 24px;">
            <p style="margin: 0; color: #64748b; font-size: 13px;">Need help? Contact our experts at</p>
            <p style="margin: 4px 0 0 0; color: #4f46e5; font-size: 14px; font-weight: 700;">support@akamify.com</p>
          </div>
        </div>

        <div style="background-color: #f8fafc; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0;">
          <p style="margin: 0; color: #94a3b8; font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em;">This is an automated system message. No reply needed.</p>
        </div>
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
            <p style="margin: 0; color: #721c24;">Unfortunately, your payment of Rs. 99 could not be processed. This could be due to insufficient funds, expired card, or a temporary issue with the payment gateway.</p>
          </div>

          <div style="margin-top: 24px; padding: 16px; background: #f8f9fa; border-radius: 8px;">
            <h3 style="margin: 0 0 10px 0; color: #2c3e50;">Your Details</h3>
            <p style="margin: 6px 0; color: #444;"><strong>Name:</strong> ${bookingData?.name || 'N/A'}</p>
            <p style="margin: 6px 0; color: #444;"><strong>Email:</strong> ${bookingData?.email || 'N/A'}</p>
            <p style="margin: 6px 0; color: #444;"><strong>Phone:</strong> ${bookingData?.phone || 'N/A'}</p>
            <p style="margin: 6px 0; color: #444;"><strong>Business:</strong> ${bookingData?.business || 'N/A'}</p>
            <p style="margin: 6px 0; color: #444;"><strong>Selected Plan:</strong> ${bookingData?.planName || bookingData?.planKey || 'N/A'}</p>
            <p style="margin: 6px 0; color: #444;"><strong>Preferred Date:</strong> ${bookingData?.date ? new Date(bookingData.date).toLocaleString() : 'N/A'}</p>
            <p style="margin: 6px 0; color: #444;"><strong>Transaction ID:</strong> ${bookingData?.transactionId || bookingData?.paymentId || 'N/A'}</p>
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
              <strong style="color: #667eea;">Selected Plan:</strong> ${bookingData.planName || bookingData.planKey || "N/A"}
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
const sendVercelNodemailerEmail = async (to, subject, html, options = {}) => {
  try {
    const apiBase = (import.meta.env.VITE_EMAIL_API_URL || '').replace(/\/+$/, '');
    const endpoint = `${apiBase}/api/send-email`;
    const { attachments } = options;
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to,
        subject,
        html,
        from: import.meta.env.VITE_EMAIL_FROM || 'noreply@akamify.com',
        attachments: Array.isArray(attachments) ? attachments : undefined
      })
    });

    const contentType = response.headers.get('content-type') || '';
    const result = contentType.includes('application/json')
      ? await response.json()
      : { success: false, error: await response.text() };
    
    if (!response.ok || !result.success) {
      throw new Error(result.error || result.message || 'Failed to send email via Vercel Nodemailer');
    }

    return result;
  } catch (error) {
    console.error('Vercel Nodemailer email error:', error);
    throw error;
  }
};

// Main email sending function using Nodemailer
const sendEmail = async (to, subject, templateData, options = {}) => {
  const html = templateData.html || templateData;
  
  try {
    // Send email via Vercel Functions
    return await sendVercelNodemailerEmail(to, subject, html, options);
  } catch (error) {
    console.error('Email sending failed:', error);
    throw error;
  }
};

export { sendEmail, emailTemplates };
