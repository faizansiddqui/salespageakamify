import React, { useState, useEffect } from 'react';
import { Check, Copy, Mail, Calendar, User, Phone, Building, ArrowRight, Home } from 'lucide-react';
import { sendEmail, emailTemplates } from '../config/emailService';
import './PaymentSuccess.css';

const PaymentSuccess = () => {
  const [transactionId, setTransactionId] = useState('');
  const [copied, setCopied] = useState(false);
  const [bookingData, setBookingData] = useState(null);

  useEffect(() => {
    // Get transaction ID from URL params or localStorage
    const urlParams = new URLSearchParams(window.location.search);
    const txId = urlParams.get('transaction_id') || localStorage.getItem('transactionId');
    const booking = localStorage.getItem('bookingData');

    if (txId) {
      setTransactionId(txId);
      localStorage.removeItem('failedPaymentId');
      localStorage.removeItem('failedBookingData');
    }

    if (booking) {
      const parsedBookingData = JSON.parse(booking);
      setBookingData(parsedBookingData);
      
      // Send success email after booking data is set
      if (txId) {
        const sentKey = `emailSent_success_${txId}`;
        if (localStorage.getItem(sentKey) !== 'true') {
          sendSuccessEmail(parsedBookingData, txId);
        }
      }
    }
  }, []);

  const sendSuccessEmail = async (bookingInfo, txId) => {
    try {
      if (bookingInfo && bookingInfo.email) {
        const emailTemplate = emailTemplates.bookingConfirmation({
          ...bookingInfo,
          transactionId: txId,
          amount: '99'
        });
        await sendEmail(bookingInfo.email, emailTemplate.subject, emailTemplate);
        localStorage.setItem(`emailSent_success_${txId}`, 'true');
      }
    } catch (error) {
      console.error('Error sending success email:', error);
    }
  };

  const copyTransactionId = () => {
    navigator.clipboard.writeText(transactionId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleGoHome = () => {
    window.location.href = '/';
  };

  return (
    <div className="payment-success-page">
      <div className="container">
        <div className="success-card">
          <div className="success-icon">
            <Check size={60} />
          </div>

          <h1>Payment Successful!</h1>
          <p>Your booking has been confirmed successfully</p>

          {transactionId && (
            <div className="transaction-section">
              <h3>Transaction Details</h3>
              <div className="transaction-id">
                <span className="label">Transaction ID:</span>
                <div className="id-container">
                  <code>{transactionId}</code>
                  <button
                    className="copy-btn"
                    onClick={copyTransactionId}
                    title="Copy transaction ID"
                  >
                    <Copy size={16} />
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {bookingData && (
            <div className="booking-details">
              <h3>Booking Information</h3>
              <div className="details-grid">
                <div className="detail-item">
                  <User size={18} />
                  <div>
                    <span className="label">Name:</span>
                    <span className="value">{bookingData.name}</span>
                  </div>
                </div>

                <div className="detail-item">
                  <Mail size={18} />
                  <div>
                    <span className="label">Email:</span>
                    <span className="value">{bookingData.email}</span>
                  </div>
                </div>

                <div className="detail-item">
                  <Phone size={18} />
                  <div>
                    <span className="label">Phone:</span>
                    <span className="value">{bookingData.phone}</span>
                  </div>
                </div>

                <div className="detail-item">
                  <Building size={18} />
                  <div>
                    <span className="label">Business:</span>
                    <span className="value">{bookingData.business}</span>
                  </div>
                </div>

                <div className="detail-item">
                  <Calendar size={18} />
                  <div>
                    <span className="label">Scheduled Date:</span>
                    <span className="value">
                      {new Date(bookingData.date).toLocaleString('en-IN', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="next-steps">
            <h3>What's Next?</h3>
            <div className="steps-list">
              <div className="step-item">
                <div className="step-number">1</div>
                <div className="step-content">
                  <h4>Confirmation Email</h4>
                  <p>A detailed confirmation email has been sent to your registered email address with all the booking details.</p>
                </div>
              </div>

              <div className="step-item">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h4>Meeting Preparation</h4>
                  <p>Our team will review your requirements and prepare a personalized demo for your business needs.</p>
                </div>
              </div>

              <div className="step-item">
                <div className="step-number">3</div>
                <div className="step-content">
                  <h4>Demo Session</h4>
                  <p>Attend your scheduled demo session where we'll walk you through our platform features and answer all your questions.</p>
                </div>
              </div>

              <div className="step-item">
                <div className="step-number">4</div>
                <div className="step-content">
                  <h4>Refund Process</h4>
                  <p>Your ₹99 security deposit will be refunded within 24 business hours after the meeting completion.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="important-info">
            <div className="info-item">
              <Mail size={20} />
              <strong>Email Confirmation</strong>
              <div>
                Check your inbox (and spam folder) for the confirmation email.
              </div>
            </div>

            <div className="info-item">
              <Calendar size={20} />
              <strong>Meeting Link</strong>
              <div>
                The meeting link will be sent 24 hours before your scheduled time.
              </div>
            </div>

            <div className="info-item">
              <Phone size={20} />
              <strong>Support</strong>
              <div>For any queries, contact us at support@akamify.com or call +91-7317322775.</div>
            </div>
          </div>

          <div className="action-buttons">
            <button className="home-btn" onClick={handleGoHome}>
              <Home size={18} />
              Back to Home
            </button>

            <button className="view-demo-btn" onClick={() => window.location.href = '/view-demo'}>
              <ArrowRight size={18} />
              View Live Demo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
