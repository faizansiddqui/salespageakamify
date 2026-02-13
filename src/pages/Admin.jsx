import React, { useState, useEffect } from "react";
import {
  Lock,
  Mail,
  Phone,
  Calendar,
  Building,
  User,
  CheckCircle,
  XCircle,
  Clock,
  Search,
  Filter,
  Download,
  Eye,
  LogOut,
  X,
  RefreshCw,
  FileText,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";
import { db, ref, get, update } from "../config/firebase";
import { sendEmail, emailTemplates } from "../config/emailService";
import { getInvoicePdfBlob } from "../utils/invoice";
import "./Admin.css";

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [loading, setLoading] = useState(false);
  const [planPurchases, setPlanPurchases] = useState([]);
  const [filteredPlanPurchases, setFilteredPlanPurchases] = useState([]);
  const [planSearchTerm, setPlanSearchTerm] = useState("");
  const [planStatusFilter, setPlanStatusFilter] = useState("all");
  const [planLoading, setPlanLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("bookings");
  const [selectedPlanPurchase, setSelectedPlanPurchase] = useState(null);
  const [planActionLoading, setPlanActionLoading] = useState(false);

  // Admin password - in production, this should be securely stored
  const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;

  // Check session on component mount
  useEffect(() => {
    checkSession();
  }, []);

  // Check if session is still valid
  const checkSession = () => {
    const sessionData = localStorage.getItem("adminSession");
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
        console.error("Error parsing session data:", error);
        clearSession();
      }
    }
  };

  // Clear session data
  const clearSession = () => {
    localStorage.removeItem("adminSession");
    setIsLoggedIn(false);
    setPassword("");
    setSelectedBooking(null);
    setBookings([]);
    setFilteredBookings([]);
  };

  // Create session after successful login
  const createSession = () => {
    const loginTime = new Date().getTime();
    const expiresAt = loginTime + 24 * 60 * 60 * 1000; // 24 hours in milliseconds

    const sessionData = {
      loginTime,
      expiresAt,
    };

    localStorage.setItem("adminSession", JSON.stringify(sessionData));
  };

  // Check session periodically (every 5 minutes)
  useEffect(() => {
    const interval = setInterval(
      () => {
        if (isLoggedIn) {
          checkSession();
        }
      },
      5 * 60 * 1000,
    ); // 5 minutes

    return () => clearInterval(interval);
  }, [isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn) {
      loadBookings();
      loadPlanPurchases();
    }
  }, [isLoggedIn]);

  useEffect(() => {
    filterBookings();
  }, [bookings, searchTerm, statusFilter]);

  useEffect(() => {
    filterPlanPurchases();
  }, [planPurchases, planSearchTerm, planStatusFilter]);

  const loadBookings = async () => {
    setLoading(true);
    try {
      const bookingsRef = ref(db, "bookings");
      const snapshot = await get(bookingsRef);

      if (snapshot.exists()) {
        const bookingsData = [];
        snapshot.forEach((childSnapshot) => {
          bookingsData.push({
            id: childSnapshot.key,
            ...childSnapshot.val(),
          });
        });

        // Sort by createdAt in descending order
        bookingsData.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
        );
        setBookings(bookingsData);
      } else {
        setBookings([]);
      }
    } catch (error) {
      console.error("Error loading bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadPlanPurchases = async () => {
    setPlanLoading(true);
    try {
      const purchasesRef = ref(db, "planPurchases");
      const snapshot = await get(purchasesRef);

      if (snapshot.exists()) {
        const purchasesData = [];
        snapshot.forEach((childSnapshot) => {
          purchasesData.push({
            id: childSnapshot.key,
            ...childSnapshot.val(),
          });
        });
        purchasesData.sort(
          (a, b) =>
            new Date(b.createdAt || b.date) - new Date(a.createdAt || a.date),
        );
        setPlanPurchases(purchasesData);
      } else {
        setPlanPurchases([]);
      }
    } catch (error) {
      console.error("Error loading plan purchases:", error);
    } finally {
      setPlanLoading(false);
    }
  };

  const filterBookings = () => {
    let filtered = bookings;

    if (searchTerm) {
      filtered = filtered.filter(
        (booking) =>
          booking.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          booking.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          booking.business.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (booking.planName || booking.planKey || "")
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          booking.transactionId
            .toLowerCase()
            .includes(searchTerm.toLowerCase()),
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((booking) => booking.status === statusFilter);
    }

    setFilteredBookings(filtered);
  };

  const filterPlanPurchases = () => {
    let filtered = planPurchases;

    if (planSearchTerm) {
      filtered = filtered.filter(
        (purchase) =>
          (purchase.name || "")
            .toLowerCase()
            .includes(planSearchTerm.toLowerCase()) ||
          (purchase.email || "")
            .toLowerCase()
            .includes(planSearchTerm.toLowerCase()) ||
          (purchase.phone || "")
            .toLowerCase()
            .includes(planSearchTerm.toLowerCase()) ||
          (purchase.planName || "")
            .toLowerCase()
            .includes(planSearchTerm.toLowerCase()) ||
          (purchase.customFunctionality || "")
            .toLowerCase()
            .includes(planSearchTerm.toLowerCase()) ||
          (purchase.invoiceId || "")
            .toLowerCase()
            .includes(planSearchTerm.toLowerCase()) ||
          (purchase.paymentId || "")
            .toLowerCase()
            .includes(planSearchTerm.toLowerCase()),
      );
    }

    if (planStatusFilter !== "all") {
      filtered = filtered.filter(
        (purchase) =>
          (purchase.approvalStatus || "pending") === planStatusFilter,
      );
    }

    setFilteredPlanPurchases(filtered);
  };

  const refreshData = () => {
    loadBookings();
    loadPlanPurchases();
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsLoggedIn(true);
      setError("");
      createSession(); // Create session after successful login
    } else {
      setError("Invalid password. Please try again.");
    }
  };

  const handleLogout = () => {
    clearSession(); // Clear session and logout
  };

  // const updateBookingStatus = async (bookingId, newStatus) => {
  //   try {
  //     const bookingRef = ref(db, `bookings/${bookingId}`);
  //     await update(bookingRef, { status: newStatus });

  //     setBookings(prev =>
  //       prev.map(booking =>
  //         booking.id === bookingId ? { ...booking, status: newStatus } : booking
  //       )
  //     );

  //     // Send email notification
  //     await sendStatusUpdateEmail(bookingId, newStatus);
  //   } catch (error) {
  //     console.error('Error updating booking status:', error);
  //   }
  // };

  // const sendStatusUpdateEmail = async (bookingId, status) => {
  //   try {
  //     const booking = bookings.find(b => b.id === bookingId);
  //     if (booking) {
  //       const emailData = {
  //         ...booking,
  //         status: status,
  //         date: booking.date
  //       };

  //       const emailTemplate = emailTemplates.bookingStatusUpdate(emailData);
  //       await sendEmail(booking.email, emailTemplate.subject, emailTemplate);
  //     }
  //   } catch (error) {
  //     console.error('Error sending status update email:', error);
  //   }
  // };

  // const deleteBooking = async (bookingId) => {
  //   if (window.confirm('Are you sure you want to delete this booking?')) {
  //     try {
  //       const bookingRef = ref(db, `bookings/${bookingId}`);
  //       await remove(bookingRef);
  //       setBookings(prev => prev.filter(booking => booking.id !== bookingId));
  //       if (selectedBooking?.id === bookingId) {
  //         setSelectedBooking(null);
  //       }
  //     } catch (error) {
  //       console.error('Error deleting booking:', error);
  //     }
  //   }
  // };

  const exportData = () => {
    const csvContent = [
      [
        "Name",
        "Email",
        "Phone",
        "Business",
        "Plan",
        "Date",
        "Transaction ID",
        "Status",
        "Amount",
        "Created At",
      ],
      ...filteredBookings.map((booking) => [
        booking.name,
        booking.email,
        booking.phone,
        booking.business,
        booking.planName || booking.planKey || "",
        new Date(booking.date).toLocaleString(),
        booking.transactionId,
        booking.status,
        booking.amount,
        new Date(booking.createdAt).toLocaleString(),
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `bookings_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const exportPlanPurchases = () => {
    const csvContent = [
      [
        "Name",
        "Email",
        "Phone",
        "Plan",
        "Invoice ID",
        "Payment ID",
        "Total",
        "Approval Status",
        "Custom Functionality",
        "Created At",
      ],
      ...filteredPlanPurchases.map((purchase) => [
        purchase.name,
        purchase.email,
        purchase.phone,
        purchase.planName,
        purchase.invoiceId,
        purchase.paymentId,
        purchase.total,
        purchase.approvalStatus || "pending",
        (purchase.customFunctionality || "").replace(/[\r\n]+/g, " "),
        new Date(purchase.createdAt || purchase.date).toLocaleString(),
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `plan_purchases_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleInvoiceDownload = (purchase) => {
    const blob = getInvoicePdfBlob(purchase);
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Invoice-${purchase.invoiceId || "Plan"}.pdf`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handlePlanApproval = async (purchase, approvalStatus) => {
    if (!purchase?.id || planActionLoading) return;
    const nextStatus = approvalStatus.toLowerCase();
    if ((purchase.approvalStatus || "pending") === nextStatus) return;

    setPlanActionLoading(true);
    try {
      const purchaseRef = ref(db, `planPurchases/${purchase.id}`);
      const updatedData = {
        approvalStatus: nextStatus,
        approvalUpdatedAt: new Date().toISOString(),
      };
      await update(purchaseRef, updatedData);

      setPlanPurchases((prev) =>
        prev.map((item) =>
          item.id === purchase.id ? { ...item, ...updatedData } : item,
        ),
      );
      setSelectedPlanPurchase((current) =>
        current?.id === purchase.id ? { ...current, ...updatedData } : current,
      );

      if (purchase.email) {
        const template = emailTemplates.planApprovalStatus({
          ...purchase,
          ...updatedData,
        });
        await sendEmail(purchase.email, template.subject, template);
      }
    } catch (error) {
      console.error("Error updating plan approval status:", error);
    } finally {
      setPlanActionLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
      case "paid":
      case "approved":
        return "#27ae60";
      case "pending":
        return "#f59e0b";
      case "rejected":
      case "failed":
        return "#e74c3c";
      default:
        return "#95a5a6";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "confirmed":
      case "paid":
      case "approved":
        return <CheckCircle size={16} />;
      case "pending":
        return <Clock size={16} />;
      case "rejected":
      case "failed":
        return <XCircle size={16} />;
      default:
        return <Clock size={16} />;
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
            <button
              className="refresh-btn"
              onClick={refreshData}
              disabled={loading}
            >
              <RefreshCw size={18} className={loading ? "spinning" : ""} />
              Refresh
            </button>
            <button className="export-btn" onClick={exportData}>
              <Download size={18} />
              Export CSV
            </button>
            <button className="export-btn" onClick={exportPlanPurchases}>
              <FileText size={18} />
              Export Plans
            </button>
            <button className="logout-btn" onClick={handleLogout}>
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="admin-content">
        <div className="admin-tabs">
          <button
            className={`admin-tab ${activeTab === "bookings" ? "active" : ""}`}
            onClick={() => setActiveTab("bookings")}
          >
            Bookings
          </button>
          <button
            className={`admin-tab ${activeTab === "purchases" ? "active" : ""}`}
            onClick={() => setActiveTab("purchases")}
          >
            Plan Purchases
          </button>
        </div>

        {activeTab === "bookings" && (
          <>
            <div className="filters-section">
              <div className="search-bar">
                <Search size={20} />
                <input
                  type="text"
                  placeholder="Search by name, email, business, plan, or transaction ID..."
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
                      <div
                        className="table-skeleton-header-cell"
                        style={{ flex: "1.5" }}
                      ></div>
                      <div
                        className="table-skeleton-header-cell"
                        style={{ flex: "2" }}
                      ></div>
                      <div
                        className="table-skeleton-header-cell"
                        style={{ flex: "1.2" }}
                      ></div>
                      <div
                        className="table-skeleton-header-cell"
                        style={{ flex: "1.5" }}
                      ></div>
                      <div
                        className="table-skeleton-header-cell"
                        style={{ flex: "1.3" }}
                      ></div>
                      <div
                        className="table-skeleton-header-cell"
                        style={{ flex: "1.3" }}
                      ></div>
                      <div
                        className="table-skeleton-header-cell"
                        style={{ flex: "0.8" }}
                      ></div>
                      <div
                        className="table-skeleton-header-cell"
                        style={{ flex: "1" }}
                      ></div>
                    </div>
                    {[...Array(3)].map((_, index) => (
                      <div key={index} className="table-skeleton-row">
                        <div className="table-skeleton-cell name"></div>
                        <div className="table-skeleton-cell email"></div>
                        <div className="table-skeleton-cell phone"></div>
                        <div className="table-skeleton-cell business"></div>
                        <div className="table-skeleton-cell business"></div>
                        <div className="table-skeleton-cell date"></div>
                        <div className="table-skeleton-cell status"></div>
                        <div className="table-skeleton-cell action"></div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : filteredBookings.length == 0 ? (
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
                        <th>Plan</th>
                        <th>Scheduled Date & Time</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredBookings.map((booking) => (
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
                              <CheckCircle size={16} />
                              <span>
                                {booking.planName || booking.planKey || "N/A"}
                              </span>
                            </div>
                          </td>
                          <td>
                            <div className="table-cell-info">
                              <Calendar size={16} />
                              <span>
                                {new Date(booking.date).toLocaleString()}
                              </span>
                            </div>
                          </td>
                          <td>
                            <div
                              className="status-badge"
                              style={{
                                backgroundColor: getStatusColor(booking.status),
                              }}
                            >
                              {getStatusIcon(booking.status)}
                              <span>
                                {booking.status.charAt(0).toUpperCase() +
                                  booking.status.slice(1)}
                              </span>
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
          </>
        )}

        {activeTab === "purchases" && (
          <>
            <div className="filters-section plan-filters-section">
              <div className="search-bar">
                <Search size={20} />
                <input
                  type="text"
                  placeholder="Search by name, email, phone, plan, invoice ID, or payment ID..."
                  value={planSearchTerm}
                  onChange={(e) => setPlanSearchTerm(e.target.value)}
                />
              </div>

              <div className="filter-dropdown">
                <Filter size={20} />
                <select
                  value={planStatusFilter}
                  onChange={(e) => setPlanStatusFilter(e.target.value)}
                >
                  <option value="all">All Approvals</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </div>

            <div className="bookings-section plan-purchases-section">
              <div className="section-header section-header-row">
                <h2>Plan Purchases ({filteredPlanPurchases.length})</h2>
                <div className="section-actions">
                  <button
                    className="refresh-btn"
                    onClick={loadPlanPurchases}
                    disabled={planLoading}
                  >
                    <RefreshCw
                      size={18}
                      className={planLoading ? "spinning" : ""}
                    />
                    Refresh
                  </button>
                  <button className="export-btn" onClick={exportPlanPurchases}>
                    <Download size={18} />
                    Export CSV
                  </button>
                </div>
              </div>

              {planLoading ? (
                <div className="bookings-table-container">
                  <div className="table-skeleton-loader">
                    <div className="table-skeleton-header">
                      <div
                        className="table-skeleton-header-cell"
                        style={{ flex: "1.2" }}
                      ></div>
                      <div
                        className="table-skeleton-header-cell"
                        style={{ flex: "1.8" }}
                      ></div>
                      <div
                        className="table-skeleton-header-cell"
                        style={{ flex: "1" }}
                      ></div>
                      <div
                        className="table-skeleton-header-cell"
                        style={{ flex: "1.2" }}
                      ></div>
                      <div
                        className="table-skeleton-header-cell"
                        style={{ flex: "1.2" }}
                      ></div>
                      <div
                        className="table-skeleton-header-cell"
                        style={{ flex: "1" }}
                      ></div>
                      <div
                        className="table-skeleton-header-cell"
                        style={{ flex: "0.8" }}
                      ></div>
                      <div
                        className="table-skeleton-header-cell"
                        style={{ flex: "0.9" }}
                      ></div>
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
              ) : filteredPlanPurchases.length == 0 ? (
                <div className="bookings-table-container">
                  <div className="no-data">
                    <div className="no-data-icon">
                      <FileText size={48} />
                    </div>
                    <h3>No plan purchases found</h3>
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
                        <th>Plan</th>
                        <th>Invoice ID</th>
                        <th>Payment ID</th>
                        <th>Total</th>
                        <th>Approval</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredPlanPurchases.map((purchase) => (
                        <tr key={purchase.id} className="booking-row">
                          <td>
                            <div className="table-cell-info">
                              <User size={16} />
                              <span>{purchase.name}</span>
                            </div>
                          </td>
                          <td>
                            <div className="table-cell-info">
                              <Mail size={16} />
                              <span>{purchase.email}</span>
                            </div>
                          </td>
                          <td>
                            <div className="table-cell-info">
                              <Phone size={16} />
                              <span>{purchase.phone}</span>
                            </div>
                          </td>
                          <td>
                            <div className="table-cell-info">
                              <Calendar size={16} />
                              <span>
                                {purchase.planName || purchase.planKey}
                              </span>
                            </div>
                          </td>
                          <td>{purchase.invoiceId || "-"}</td>
                          <td>{purchase.paymentId || "-"}</td>
                          <td>
                            Rs.{" "}
                            {Number(purchase.total || 0).toLocaleString(
                              "en-IN",
                            )}
                          </td>
                          <td>
                            <div
                              className="status-badge"
                              style={{
                                backgroundColor: getStatusColor(
                                  purchase.approvalStatus || "pending",
                                ),
                              }}
                            >
                              {getStatusIcon(
                                purchase.approvalStatus || "pending",
                              )}
                              <span>
                                {(purchase.approvalStatus || "pending")
                                  .charAt(0)
                                  .toUpperCase() +
                                  (purchase.approvalStatus || "pending").slice(
                                    1,
                                  )}
                              </span>
                            </div>
                          </td>
                          <td>
                            <div className="plan-actions">
                              <button
                                className="view-btn"
                                onClick={() =>
                                  setSelectedPlanPurchase(purchase)
                                }
                              >
                                <Eye size={16} />
                                View Details
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        )}
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
                  <div className="detail-item">
                    <label>Selected Plan:</label>
                    <span>
                      {selectedBooking.planName ||
                        selectedBooking.planKey ||
                        "N/A"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="detail-section">
                <h3>Booking Information</h3>
                <div className="detail-grid">
                  <div className="detail-item">
                    <label>Date & Time:</label>
                    <span>
                      {new Date(selectedBooking.date).toLocaleString()}
                    </span>
                  </div>
                  <div className="detail-item">
                    <label>Transaction ID:</label>
                    <span>{selectedBooking.transactionId}</span>
                  </div>
                  <div className="detail-item">
                    <label>Amount:</label>
                    <span>Rs. {selectedBooking.amount}</span>
                  </div>
                  <div className="detail-item">
                    <label>Status:</label>
                    <span
                      className="status-badge"
                      style={{
                        backgroundColor: getStatusColor(selectedBooking.status),
                      }}
                    >
                      {selectedBooking.status.charAt(0).toUpperCase() +
                        selectedBooking.status.slice(1)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="detail-section">
                <h3>System Information</h3>
                <div className="detail-grid">
                  <div className="detail-item">
                    <label>Created At:</label>
                    <span>
                      {new Date(selectedBooking.createdAt).toLocaleString()}
                    </span>
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
      {selectedPlanPurchase && (
        <div
          className="modal-overlay"
          onClick={() => setSelectedPlanPurchase(null)}
        >
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Plan Purchase Details</h2>
              <button
                className="close-btn"
                onClick={() => setSelectedPlanPurchase(null)}
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
                    <span>{selectedPlanPurchase.name}</span>
                  </div>
                  <div className="detail-item">
                    <label>Email:</label>
                    <span>{selectedPlanPurchase.email}</span>
                  </div>
                  <div className="detail-item">
                    <label>Phone:</label>
                    <span>{selectedPlanPurchase.phone}</span>
                  </div>
                  <div className="detail-item">
                    <label>Business:</label>
                    <span>{selectedPlanPurchase.business || "N/A"}</span>
                  </div>
                </div>
              </div>

              <div className="detail-section">
                <h3>Plan Summary</h3>
                <div className="detail-grid">
                  <div className="detail-item">
                    <label>Plan:</label>
                    <span>
                      {selectedPlanPurchase.planName ||
                        selectedPlanPurchase.planKey ||
                        "N/A"}
                    </span>
                  </div>
                  <div className="detail-item">
                    <label>Base Price:</label>
                    <span>
                      Rs.{" "}
                      {Number(
                        selectedPlanPurchase.basePrice || 0,
                      ).toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div className="detail-item">
                    <label>Delivery:</label>
                    <span>
                      {selectedPlanPurchase.deliveryLabel || "Standard"}
                    </span>
                  </div>
                  <div className="detail-item">
                    <label>Delivery Add-on:</label>
                    <span>
                      Rs.{" "}
                      {Number(
                        selectedPlanPurchase.deliveryAddOn || 0,
                      ).toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div className="detail-item">
                    <label>Total:</label>
                    <span>
                      Rs.{" "}
                      {Number(selectedPlanPurchase.total || 0).toLocaleString(
                        "en-IN",
                      )}
                    </span>
                  </div>
                  <div className="detail-item">
                    <label>Approval Status:</label>
                    <span>
                      {(selectedPlanPurchase.approvalStatus || "pending")
                        .charAt(0)
                        .toUpperCase() +
                        (
                          selectedPlanPurchase.approvalStatus || "pending"
                        ).slice(1)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="detail-section">
                <h3>Custom Functionality</h3>
                <div className="detail-grid">
                  <div className="detail-item">
                    <label>Request:</label>
                    <span>
                      {selectedPlanPurchase.customFunctionality || "N/A"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="detail-section">
                <h3>System Information</h3>
                <div className="detail-grid">
                  <div className="detail-item">
                    <label>Invoice ID:</label>
                    <span>{selectedPlanPurchase.invoiceId || "N/A"}</span>
                  </div>
                  <div className="detail-item">
                    <label>Payment ID:</label>
                    <span>{selectedPlanPurchase.paymentId || "N/A"}</span>
                  </div>
                  <div className="detail-item">
                    <label>Created At:</label>
                    <span>
                      {new Date(
                        selectedPlanPurchase.createdAt ||
                          selectedPlanPurchase.date,
                      ).toLocaleString()}
                    </span>
                  </div>
                  <div className="detail-item">
                    <label>Purchase ID:</label>
                    <span>{selectedPlanPurchase.purchaseId || "N/A"}</span>
                  </div>
                </div>
              </div>

              <div className="detail-section">
                <h3>Action</h3>
                <div className="detail-grid">
                  <div className="detail-item">
                    <button
                      className="view-btn download-btn"
                      onClick={() =>
                        handleInvoiceDownload(selectedPlanPurchase)
                      }
                    >
                      <Download size={16} />
                      Invoice
                    </button>
                  </div>
                  {(selectedPlanPurchase.approvalStatus || "pending") !==
                    "rejected" && (
                    <div className="detail-item">
                      <button
                        className="approve-btn"
                        disabled={
                          planActionLoading ||
                          (selectedPlanPurchase.approvalStatus || "pending") ===
                            "approved"
                        }
                        onClick={() =>
                          handlePlanApproval(selectedPlanPurchase, "approved")
                        }
                      >
                        <ThumbsUp size={16} />
                        Approve
                      </button>
                    </div>
                  )}
                  {(selectedPlanPurchase.approvalStatus || "pending") !==
                    "approved" && (
                    <div className="detail-item">
                      <button
                        className="reject-btn"
                        disabled={
                          planActionLoading ||
                          (selectedPlanPurchase.approvalStatus || "pending") ===
                            "rejected"
                        }
                        onClick={() =>
                          handlePlanApproval(selectedPlanPurchase, "rejected")
                        }
                      >
                        <ThumbsDown size={16} />
                        Reject
                      </button>
                    </div>
                  )}
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
