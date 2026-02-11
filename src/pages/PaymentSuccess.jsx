import React, { useState, useEffect } from "react";
import {
  Check,
  Copy,
  Mail,
  Calendar,
  User,
  Building,
  FileText,
  ArrowRight,
  Home,
  ShieldCheck,
  Clock
} from "lucide-react";
import { sendEmail, emailTemplates } from "../config/emailService";
import "./PaymentSuccess.css";

const PaymentSuccess = () => {
  const [transactionId, setTransactionId] = useState("");
  const [copied, setCopied] = useState(false);
  const [bookingData, setBookingData] = useState(null);

  const sendSuccessEmail = async (bookingInfo, txId) => {
    try {
      if (bookingInfo && bookingInfo.email) {
        const emailTemplate = emailTemplates.bookingConfirmation({
          ...bookingInfo,
          transactionId: txId,
          amount: "99",
        });
        await sendEmail(
          bookingInfo.email,
          emailTemplate.subject,
          emailTemplate,
        );
        localStorage.setItem(`emailSent_success_${txId}`, "true");
      }
    } catch (error) {
      console.error("Error sending success email:", error);
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const txId = urlParams.get("transaction_id") || localStorage.getItem("transactionId");
    const booking = localStorage.getItem("bookingData");

    if (txId) {
      setTransactionId(txId);
      localStorage.removeItem("failedPaymentId");
      localStorage.removeItem("failedBookingData");
    }

    if (booking) {
      const parsedBookingData = JSON.parse(booking);
      setBookingData(parsedBookingData);

      if (txId) {
        const sentKey = `emailSent_success_${txId}`;
        if (localStorage.getItem(sentKey) !== "true") {
          sendSuccessEmail(parsedBookingData, txId);
        }
      }
    }
  }, []);

  const copyTransactionId = () => {
    navigator.clipboard.writeText(transactionId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleGoHome = () => {
    window.location.href = "/";
  };

  return (
    <div className="ps-page-wrapper">
      {/* Background decorative elements */}
      <div className="ps-blob ps-blob-1"></div>
      <div className="ps-blob ps-blob-2"></div>

      <div className="ps-container border border-gray-200">
        <div className="ps-glass-card">
          {/* Header Section */}
          <div className="ps-header">
            <div className="ps-icon-badge">
              <Check size={40} strokeWidth={3} />
            </div>
            <h1>Payment Successful!</h1>
            <p>Your booking is confirmed. We've sent the details to your email.</p>
          </div>

          {/* Transaction ID Bar */}
          {transactionId && (
            <div className="ps-tx-bar">
              <span className="ps-tx-label">Transaction ID:</span>
              <code className="ps-tx-code">{transactionId}</code>
              <button className={`ps-copy-btn ${copied ? 'copied' : ''}`} onClick={copyTransactionId}>
                {copied ? <Check size={14} /> : <Copy size={14} />}
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
          )}

          {/* Details Grid */}
          {bookingData && (
            <div className="ps-section">
              <h3 className="ps-section-title">Booking Details</h3>
              <div className="ps-grid">
                <div className="ps-grid-item">
                  <User size={18} className="ps-item-icon" />
                  <div>
                    <span className="ps-item-label">Name</span>
                    <span className="ps-item-value">{bookingData.name}</span>
                  </div>
                </div>
                <div className="ps-grid-item">
                  <Mail size={18} className="ps-item-icon" />
                  <div>
                    <span className="ps-item-label">Email</span>
                    <span className="ps-item-value">{bookingData.email}</span>
                  </div>
                </div>
                <div className="ps-grid-item">
                  <Building size={18} className="ps-item-icon" />
                  <div>
                    <span className="ps-item-label">Business</span>
                    <span className="ps-item-value">{bookingData.business}</span>
                  </div>
                </div>
                <div className="ps-grid-item">
                  <FileText size={18} className="ps-item-icon" />
                  <div>
                    <span className="ps-item-label">Selected Plan</span>
                    <span className="ps-item-value">
                      {bookingData.planName || bookingData.planKey || "N/A"}
                    </span>
                  </div>
                </div>
                <div className="ps-grid-item ps-grid-full">
                  <Calendar size={18} className="ps-item-icon" />
                  <div>
                    <span className="ps-item-label">Scheduled For</span>
                    <span className="ps-item-value">
                      {new Date(bookingData.date).toLocaleString("en-IN", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Steps Section */}
          <div className="ps-section">
            <h3 className="ps-section-title">What's Next?</h3>
            <div className="ps-steps">
              <div className="ps-step">
                <div className="ps-step-num">1</div>
                <p>Check your <strong>Email</strong> for the calendar invite.</p>
              </div>
              <div className="ps-step">
                <div className="ps-step-num">2</div>
                <p>Join the <strong>Demo</strong> at your scheduled time.</p>
              </div>
              <div className="ps-step">
                <div className="ps-step-num">3</div>
                <p>Rs. 99 <strong>Refund</strong> is processed within 24h after the meeting.</p>
              </div>
            </div>
          </div>

          {/* Footer Info */}
          <div className="ps-footer-info">
             <div className="ps-info-tag">
                <ShieldCheck size={16} /> 100% Secure Payment
             </div>
             <div className="ps-info-tag">
                <Clock size={16} /> Fast Refund Process
             </div>
          </div>

          {/* Action Buttons */}
          <div className="ps-actions">
            <button className="ps-btn-secondary" onClick={handleGoHome}>
              <Home size={18} /> Back to Home
            </button>
            <button className="ps-btn-primary" onClick={() => (window.location.href = "/view-demo")}>
              View Live Demo <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
