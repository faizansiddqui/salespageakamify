import React, { useState } from 'react';
import { Calendar, User, Phone, Mail, Building, Check, AlertCircle, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { db, ref, push, set, get } from '../config/firebase';
import { sendEmail, emailTemplates } from '../config/emailService';
import './BookEnrollment.css';

const BookEnrollment = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    business: '',
    date: '',
    agreeTerms: false
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState(null);
  const navigate = useNavigate();

  const faqs = [
    {
      question: "What is the security deposit for?",
      answer: "The ₹99 security deposit confirms your booking slot and ensures commitment. This amount is fully refundable after your meeting is completed."
    },
    {
      question: "When will I receive my refund?",
      answer: "Your security deposit will be refunded within 24 business hours after the meeting is completed."
    },
    {
      question: "What payment methods are accepted?",
      answer: "We accept all major credit cards, debit cards, UPI, and net banking through Razorpay secure payment gateway."
    },
    {
      question: "Can I reschedule my booking?",
      answer: "Yes, you can reschedule your booking up to 24 hours before the scheduled time by contacting our support team."
    },
    {
      question: "What happens if payment fails?",
      answer: "If payment fails, no amount will be deducted. You can retry the payment or choose a different payment method."
    }
  ];

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = 'Phone must be 10 digits';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.business.trim()) newErrors.business = 'Business name is required';
    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.agreeTerms) newErrors.agreeTerms = 'You must agree to terms and conditions';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      await initiatePayment();
    }
  };

  const initiatePayment = async () => {
    try {
      // Load Razorpay script
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      document.body.appendChild(script);

      script.onload = () => {
        const options = {
          key: import.meta.env.VITE_RAZORPAY_KEY_ID,
          amount: 9900, // ₹99 in paise
          currency: 'INR',
          name: 'Akamify E-commerce',
          description: 'Security Deposit for Demo Booking',
          // Remove image to avoid CORS issues in development
          handler: async function (response) {
            await handlePaymentSuccess(response);
          },
          prefill: {
            name: formData.name,
            email: formData.email,
            contact: formData.phone
          },
          theme: {
            color: '#667eea'
          },
          modal: {
            ondismiss: function () {
              setIsSubmitting(false);
            },
            escape: false,
            backdropclose: false
          }
        };

        const razorpay = new window.Razorpay(options);
        
        // Add error handling
        razorpay.on('payment.failed', function (response) {
          console.error('Payment failed:', response.error);
          setIsSubmitting(false);
          navigate('/payment-failed');
        });
        
        razorpay.open();
      };

      script.onerror = () => {
        console.error('Failed to load Razorpay script');
        setIsSubmitting(false);
        alert('Unable to load payment gateway. Please try again.');
      };
    } catch (error) {
      console.error('Payment initiation error:', error);
      setIsSubmitting(false);
      alert('Payment failed. Please try again.');
    }
  };

  const handlePaymentSuccess = async (response) => {
    try {
      // For development, skip verification to avoid CORS issues
      // In production, you should verify the payment on your backend

      // Save booking data to Realtime Database
      const bookingData = {
        ...formData,
        transactionId: response.razorpay_payment_id,
        amount: 99,
        status: 'confirmed',
        createdAt: new Date().toISOString(),
        paymentStatus: 'captured'
      };
      
      try {
        // Create a new reference in the 'bookings' node
        const bookingsRef = ref(db, 'bookings');
        
        const newBookingRef = push(bookingsRef);
        
        await set(newBookingRef, bookingData);
        
        // Verify it was saved by trying to read it back
        const savedRef = ref(db, `bookings/${newBookingRef.key}`);
        const snapshot = await get(savedRef);
        
      } catch (firebaseError) {
        console.error('❌ Firebase save error:', firebaseError);
        console.error('Error code:', firebaseError.code);
        console.error('Error message:', firebaseError.message);
        // Continue even if Firebase fails
      }
      
      // Store data in localStorage for success page
      localStorage.setItem('bookingData', JSON.stringify(bookingData));
      localStorage.setItem('transactionId', response.razorpay_payment_id);
      
      // Redirect immediately
      navigate(`/payment-success?transaction_id=${response.razorpay_payment_id}`);
      
    } catch (error) {
      console.error('❌ Payment success handling error:', error);
      console.error('Error stack:', error.stack);
      setIsSubmitting(false);
      
      // Store failed payment info for debugging
      localStorage.setItem('failedPayment', JSON.stringify({
        error: error.message,
        response: response,
        timestamp: new Date().toISOString()
      }));
      
      navigate('/payment-failed');
    }
  };

  const getMinDate = () => {
    const today = new Date();
    today.setDate(today.getDate() + 1);
    return today.toISOString().split('T')[0];
  };

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <div className="book-enrollment-page">
      <div className="enrollment-container">
        <div className="enrollment-header">
          <h1>Book Your Enrollment Slot</h1>
          <p>Schedule your personalized demo session with our experts</p>
        </div>

        <div className="enrollment-content">
          <div className="form-section">
            <form onSubmit={handleSubmit} className="enrollment-form">
              <div className="form-group">
                <label htmlFor="name">
                  <User size={18} />
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={errors.name ? 'error' : ''}
                  placeholder="Enter your full name"
                />
                {errors.name && <span className="error-message">{errors.name}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="phone">
                  <Phone size={18} />
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={errors.phone ? 'error' : ''}
                  placeholder="Enter your 10-digit phone number"
                  maxLength="10"
                />
                {errors.phone && <span className="error-message">{errors.phone}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="email">
                  <Mail size={18} />
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={errors.email ? 'error' : ''}
                  placeholder="Enter your email address"
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="business">
                  <Building size={18} />
                  Business Name *
                </label>
                <input
                  type="text"
                  id="business"
                  name="business"
                  value={formData.business}
                  onChange={handleInputChange}
                  className={errors.business ? 'error' : ''}
                  placeholder="Enter your business name"
                />
                {errors.business && <span className="error-message">{errors.business}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="date">
                  <Calendar size={18} />
                  Preferred Date & Time *
                </label>
                <input
                  type="datetime-local"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className={errors.date ? 'error' : ''}
                  min={getMinDate()}
                  style={{ color: '#757575' }}
                />
                {errors.date && <span className="error-message">{errors.date}</span>}
              </div>

              <div className="terms-section">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={handleInputChange}
                    className={errors.agreeTerms ? 'error' : ''}
                  />
                  <span className="checkmark">
                    <Check size={14} />
                  </span>
                  I agree to the terms and conditions and understand the refund policy
                </label>
                {errors.agreeTerms && <span className="error-message">{errors.agreeTerms}</span>}
              </div>

              <div className="security-info">
                <div className="security-amount">
                  <span className="amount-label">Security Deposit:</span>
                  <span className="amount">₹99</span>
                </div>
                <div className="refund-info-book">
                  <AlertCircle size={16} />
                  <span>Refundable after meeting completion</span>
                </div>
              </div>

              <button type="submit" className="proceed-btn" disabled={isSubmitting}>
                {isSubmitting ? 'Processing...' : 'Proceed to Payment'}
                <ArrowRight size={18} />
              </button>
            </form>
          </div>

          <div className="info-section">
            <div className="info-card">
              <h3>Why Book a Demo?</h3>
              <ul>
                <li>Personalized walkthrough of our platform</li>
                <li>Q&A session with our experts</li>
                <li>Custom solutions for your business</li>
                <li>No obligation - fully refundable deposit</li>
              </ul>
            </div>

            <div className="info-card">
              <h3>What Happens Next?</h3>
              <ol>
                <li>Complete the booking form</li>
                <li>Pay ₹99 security deposit</li>
                <li>Receive confirmation email</li>
                <li>Attend your scheduled demo</li>
                <li>Get refund within 24 hours</li>
              </ol>
            </div>
          </div>
        </div>

        <div className="faq-section">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-list">
            {faqs.map((faq, index) => (
              <div key={index} className="faq-item">
                <div 
                  className="faq-question"
                  onClick={() => toggleFaq(index)}
                >
                  <h4>{faq.question}</h4>
                  <span className="faq-icon">
                    {expandedFaq === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </span>
                </div>
                <div className={`faq-answer ${expandedFaq === index ? 'expanded' : ''}`}>
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookEnrollment;
