import React, { useState, useEffect } from 'react';
import { Lock, Mail, Phone, Calendar, Building, User, CheckCircle, XCircle, Clock, Search, Filter, Download, Eye, Trash2, LogOut, X, RefreshCw } from 'lucide-react';
import { db, ref, get, child, update, remove } from '../config/firebase';
import { sendEmail, emailTemplates } from '../config/emailService';
import './Admin.css';

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [loading, setLoading] = useState(false);

  // Admin password - in production, this should be securely stored
  const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;

  // Check session on component mount
  useEffect(() => {
    checkSession();
  }, []);

  // Check if session is still valid
  const checkSession = () => {
    const sessionData = localStorage.getItem('adminSession');
    if (sessionData) {
      try {
        const { loginTime, expiresAt } = JSON.parse(sessionData);
        const currentTime = new Date().getTime();
        
        if (currentTime < expiresAt) {
          // Session is still valid
          setIsLoggedIn(true);
        } else {
          // Session expired
          clearSession();
        }
      } catch (error) {
        console.error('Error parsing session data:', error);
        clearSession();
      }
    }
  };

  // Clear session data
  const clearSession = () => {
    localStorage.removeItem('adminSession');
    setIsLoggedIn(false);
    setPassword('');
    setSelectedBooking(null);
    setBookings([]);
    setFilteredBookings([]);
  };

  // Create session after successful login
  const createSession = () => {
    const loginTime = new Date().getTime();
    const expiresAt = loginTime + (24 * 60 * 60 * 1000); // 24 hours in milliseconds
    
    const sessionData = {
      loginTime,
      expiresAt
    };
    
    localStorage.setItem('adminSession', JSON.stringify(sessionData));
  };

  // Check session periodically (every 5 minutes)
  useEffect(() => {
    const interval = setInterval(() => {
      if (isLoggedIn) {
        checkSession();
      }
    }, 5 * 60 * 1000); // 5 minutes

    return () => clearInterval(interval);
  }, [isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn) {
      loadBookings();
    }
  }, [isLoggedIn]);

  useEffect(() => {
    filterBookings();
  }, [bookings, searchTerm, statusFilter]);

  const loadBookings = async () => {
    setLoading(true);
    try {
      const bookingsRef = ref(db, 'bookings');
      const snapshot = await get(bookingsRef);
      
      if (snapshot.exists()) {
        const bookingsData = [];
        snapshot.forEach((childSnapshot) => {
          bookingsData.push({
            id: childSnapshot.key,
            ...childSnapshot.val()
          });
        });
        
        // Sort by createdAt in descending order
        bookingsData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setBookings(bookingsData);
      } else {
        setBookings([]);
      }
    } catch (error) {
      console.error('Error loading bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterBookings = () => {
    let filtered = bookings;

    if (searchTerm) {
      filtered = filtered.filter(booking =>
        booking.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.business.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.transactionId.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(booking => booking.status === statusFilter);
    }

    setFilteredBookings(filtered);
  };

  const refreshData = () => {
    loadBookings();
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsLoggedIn(true);
      setError('');
      createSession(); // Create session after successful login
    } else {
      setError('Invalid password. Please try again.');
    }
  };

  const handleLogout = () => {
    clearSession(); // Clear session and logout
  };

  const updateBookingStatus = async (bookingId, newStatus) => {
    try {
      const bookingRef = ref(db, `bookings/${bookingId}`);
      await update(bookingRef, { status: newStatus });
      
      setBookings(prev =>
        prev.map(booking =>
          booking.id === bookingId ? { ...booking, status: newStatus } : booking
        )
      );
      
      // Send email notification
      await sendStatusUpdateEmail(bookingId, newStatus);
    } catch (error) {
      console.error('Error updating booking status:', error);
    }
  };

  const sendStatusUpdateEmail = async (bookingId, status) => {
    try {
      const booking = bookings.find(b => b.id === bookingId);
      if (booking) {
        const emailData = {
          ...booking,
          status: status,
          date: booking.date
        };

        const emailTemplate = emailTemplates.bookingStatusUpdate(emailData);
        await sendEmail(booking.email, emailTemplate.subject, emailTemplate);
      }
    } catch (error) {
      console.error('Error sending status update email:', error);
    }
  };

  const deleteBooking = async (bookingId) => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      try {
        const bookingRef = ref(db, `bookings/${bookingId}`);
        await remove(bookingRef);
        setBookings(prev => prev.filter(booking => booking.id !== bookingId));
        if (selectedBooking?.id === bookingId) {
          setSelectedBooking(null);
        }
      } catch (error) {
        console.error('Error deleting booking:', error);
      }
    }
  };

  const exportData = () => {
    const csvContent = [
      ['Name', 'Email', 'Phone', 'Business', 'Date', 'Transaction ID', 'Status', 'Amount', 'Created At'],
      ...filteredBookings.map(booking => [
        booking.name,
        booking.email,
        booking.phone,
        booking.business,
        new Date(booking.date).toLocaleString(),
        booking.transactionId,
        booking.status,
        booking.amount,
        new Date(booking.createdAt).toLocaleString()
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bookings_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return '#27ae60';
      case 'failed': return '#e74c3c';
      default: return '#95a5a6';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed': return <CheckCircle size={16} />;
      case 'failed': return <XCircle size={16} />;
      default: return <Clock size={16} />;
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="admin-login">
        <div className="login-container">
          <div className="login-card">
            <div className="login-header">
              <Lock size={48} />
              <h1>Admin Login</h1>
              <p>Enter your password to access the admin panel</p>
            </div>
            
            <form onSubmit={handleLogin} className="login-form">
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  required
                />
              </div>
              
              {error && <div className="error-message">{error}</div>}
              
              <button type="submit" className="login-btn">
                Login to Admin Panel
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-panel">
      <div className="admin-header">
        <div className="header-content">
          <h1>Admin Dashboard</h1>
          <div className="header-actions">
            <button className="refresh-btn" onClick={refreshData} disabled={loading}>
              <RefreshCw size={18} className={loading ? 'spinning' : ''} />
              Refresh
            </button>
            <button className="export-btn" onClick={exportData}>
              <Download size={18} />
              Export CSV
            </button>
            <button className="logout-btn" onClick={handleLogout}>
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="admin-content">
        <div className="filters-section">
          <div className="search-bar">
            <Search size={20} />
            <input
              type="text"
              placeholder="Search by name, email, business, or transaction ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="filter-dropdown">
            <Filter size={20} />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="confirmed">Confirmed</option>
              <option value="failed">Failed</option>
            </select>
          </div>
        </div>

        <div className="bookings-section">
          <div className="section-header">
            <h2>Bookings ({filteredBookings.length})</h2>
          </div>
          
          {loading ? (
            <div className="bookings-table-container">
              <div className="table-skeleton-loader">
                <div className="table-skeleton-header">
                  <div className="table-skeleton-header-cell" style={{flex: '1.5'}}></div>
                  <div className="table-skeleton-header-cell" style={{flex: '2'}}></div>
                  <div className="table-skeleton-header-cell" style={{flex: '1.2'}}></div>
                  <div className="table-skeleton-header-cell" style={{flex: '1.5'}}></div>
                  <div className="table-skeleton-header-cell" style={{flex: '1.3'}}></div>
                  <div className="table-skeleton-header-cell" style={{flex: '0.8'}}></div>
                  <div className="table-skeleton-header-cell" style={{flex: '1'}}></div>
                </div>
                {[...Array(3)].map((_, index) => (
                  <div key={index} className="table-skeleton-row">
                    <div className="table-skeleton-cell name"></div>
                    <div className="table-skeleton-cell email"></div>
                    <div className="table-skeleton-cell phone"></div>
                    <div className="table-skeleton-cell business"></div>
                    <div className="table-skeleton-cell date"></div>
                    <div className="table-skeleton-cell status"></div>
                    <div className="table-skeleton-cell action"></div>
                  </div>
                ))}
              </div>
            </div>
          ) : filteredBookings.length === 0 ? (
            <div className="bookings-table-container">
              <div className="no-data">
                <div className="no-data-icon">
                  <Calendar size={48} />
                </div>
                <h3>No bookings found</h3>
                <p>Try adjusting your filters or search terms</p>
              </div>
            </div>
          ) : (
            <div className="bookings-table-container">
              <table className="bookings-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Business</th>
                    <th>Scheduled Date & Time</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBookings.map(booking => (
                    <tr key={booking.id} className="booking-row">
                      <td>
                        <div className="table-cell-info">
                          <User size={16} />
                          <span>{booking.name}</span>
                        </div>
                      </td>
                      <td>
                        <div className="table-cell-info">
                          <Mail size={16} />
                          <span>{booking.email}</span>
                        </div>
                      </td>
                      <td>
                        <div className="table-cell-info">
                          <Phone size={16} />
                          <span>{booking.phone}</span>
                        </div>
                      </td>
                      <td>
                        <div className="table-cell-info">
                          <Building size={16} />
                          <span>{booking.business}</span>
                        </div>
                      </td>
                      <td>
                        <div className="table-cell-info">
                          <Calendar size={16} />
                          <span>{new Date(booking.date).toLocaleString()}</span>
                        </div>
                      </td>
                      <td>
                        <div 
                          className="status-badge"
                          style={{ backgroundColor: getStatusColor(booking.status) }}
                        >
                          {getStatusIcon(booking.status)}
                          <span>{booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}</span>
                        </div>
                      </td>
                      <td>
                        <button 
                          className="view-btn"
                          onClick={() => setSelectedBooking(booking)}
                        >
                          <Eye size={16} />
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {selectedBooking && (
        <div className="modal-overlay" onClick={() => setSelectedBooking(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Booking Details</h2>
              <button 
                className="close-btn"
                onClick={() => setSelectedBooking(null)}
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="modal-content">
              <div className="detail-section">
                <h3>Customer Information</h3>
                <div className="detail-grid">
                  <div className="detail-item">
                    <label>Name:</label>
                    <span>{selectedBooking.name}</span>
                  </div>
                  <div className="detail-item">
                    <label>Email:</label>
                    <span>{selectedBooking.email}</span>
                  </div>
                  <div className="detail-item">
                    <label>Phone:</label>
                    <span>{selectedBooking.phone}</span>
                  </div>
                  <div className="detail-item">
                    <label>Business:</label>
                    <span>{selectedBooking.business}</span>
                  </div>
                </div>
              </div>
              
              <div className="detail-section">
                <h3>Booking Information</h3>
                <div className="detail-grid">
                  <div className="detail-item">
                    <label>Date & Time:</label>
                    <span>{new Date(selectedBooking.date).toLocaleString()}</span>
                  </div>
                  <div className="detail-item">
                    <label>Transaction ID:</label>
                    <span>{selectedBooking.transactionId}</span>
                  </div>
                  <div className="detail-item">
                    <label>Amount:</label>
                    <span>₹{selectedBooking.amount}</span>
                  </div>
                  <div className="detail-item">
                    <label>Status:</label>
                    <span 
                      className="status-badge"
                      style={{ backgroundColor: getStatusColor(selectedBooking.status) }}
                    >
                      {selectedBooking.status.charAt(0).toUpperCase() + selectedBooking.status.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="detail-section">
                <h3>System Information</h3>
                <div className="detail-grid">
                  <div className="detail-item">
                    <label>Created At:</label>
                    <span>{new Date(selectedBooking.createdAt).toLocaleString()}</span>
                  </div>
                  <div className="detail-item">
                    <label>Booking ID:</label>
                    <span>{selectedBooking.id}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
