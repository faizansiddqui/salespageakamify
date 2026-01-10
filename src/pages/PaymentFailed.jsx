import React, { useEffect } from 'react';
import { X, AlertCircle, RefreshCw, ArrowLeft, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { sendEmail, emailTemplates } from '../config/emailService';
import './PaymentFailed.css';

const PaymentFailed = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Send failed payment email
    sendFailedEmail();
  }, []);

  const sendFailedEmail = async () => {
    try {
      const bookingData = JSON.parse(localStorage.getItem('bookingData') || '{}');
      
      if (bookingData.email) {
        const emailTemplate = emailTemplates.paymentFailed(bookingData);
        await sendEmail(bookingData.email, emailTemplate.subject, emailTemplate);
      }
    } catch (error) {
      console.error('Error sending failed payment email:', error);
    }
  };

  const handleRetryPayment = () => {
    navigate('/book-enrollment');
  };

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="payment-failed-page">
      <div className="failed-container">
        <div className="failed-card">
          <div className="failed-icon">
            <X size={60} />
          </div>
          
          <h1>Payment Failed</h1>
          <p>We couldn't process your payment. Don't worry, no amount was deducted from your account.</p>

          <div className="error-info">
            <div className="info-item">
              <AlertCircle size={20} />
              <div>
                <strong>No Charges Applied:</strong> If any amount was deducted, it will be refunded within 24 business hours.
              </div>
            </div>
            
            <div className="info-item">
              <AlertCircle size={20} />
              <div>
                <strong>Try Again:</strong> You can retry the payment with the same or a different payment method.
              </div>
            </div>
            
            <div className="info-item">
              <AlertCircle size={20} />
              <div>
                <strong>Payment Security:</strong> All your payment information is secure and encrypted.
              </div>
            </div>
          </div>

          <div className="troubleshooting-section">
            <h3>Common Issues & Solutions</h3>
            <div className="troubleshooting-list">
              <div className="trouble-item">
                <h4>Insufficient Funds</h4>
                <p>Ensure your account has sufficient balance or try a different payment method.</p>
              </div>
              
              <div className="trouble-item">
                <h4>Card Details Error</h4>
                <p>Double-check your card number, CVV, and expiry date for any typos.</p>
              </div>
              
              <div className="trouble-item">
                <h4>Bank Declined</h4>
                <p>Your bank may have blocked the transaction. Contact your bank or try another card.</p>
              </div>
              
              <div className="trouble-item">
                <h4>Network Issues</h4>
                <p>Check your internet connection and try again. Poor connectivity can cause payment failures.</p>
              </div>
              
              <div className="trouble-item">
                <h4>Session Timeout</h4>
                <p>The payment session may have expired. Please start the booking process again.</p>
              </div>
            </div>
          </div>

          <div className="refund-info">
            <h3>Refund Information</h3>
            <div className="refund-details">
              <div className="refund-item">
                <span className="refund-label">Processing Time:</span>
                <span className="refund-value">24 business hours</span>
              </div>
              
              <div className="refund-item">
                <span className="refund-label">Refund Method:</span>
                <span className="refund-value">Same as payment method</span>
              </div>
              
              <div className="refund-item">
                <span className="refund-label">Confirmation:</span>
                <span className="refund-value">Email and SMS notification</span>
              </div>
            </div>
            
            <div className="refund-note">
              <AlertCircle size={16} />
              <p>If you don't receive your refund within 24 business hours, please contact our support team with your transaction details.</p>
            </div>
          </div>

          <div className="support-section">
            <h3>Need Help?</h3>
            <div className="support-options">
              <div className="support-option">
                <h4>📧 Email Support</h4>
                <p>support@akamify.com</p>
                <span className="response-time">Response within 24 hours</span>
              </div>
              
              <div className="support-option">
                <h4>📞 Phone Support</h4>
                <p>+91-XXXXXXXXXX</p>
                <span className="response-time">Mon-Fri, 9 AM - 6 PM</span>
              </div>
              
              <div className="support-option">
                <h4>💬 Live Chat</h4>
                <p>Available on website</p>
                <span className="response-time">Instant response</span>
              </div>
            </div>
          </div>

          <div className="action-buttons">
            <button className="retry-btn" onClick={handleRetryPayment}>
              <RefreshCw size={18} />
              Try Payment Again
            </button>
            
            <button className="home-btn" onClick={handleGoHome}>
              <Home size={18} />
              Back to Home
            </button>
          </div>

          <div className="security-assurance">
            <div className="security-item">
              <span className="security-icon">🔒</span>
              <span>Secure Payment Gateway</span>
            </div>
            <div className="security-item">
              <span className="security-icon">🛡️</span>
              <span>256-bit SSL Encryption</span>
            </div>
            <div className="security-item">
              <span className="security-icon">✅</span>
              <span>PCI DSS Compliant</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailed;
