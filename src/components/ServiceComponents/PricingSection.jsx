import { useState, useEffect, useMemo, useRef } from "react";
import {
  Clock,
  RotateCcw,
  ChevronDown,
  ArrowRight,
  Calendar,
  Check,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";
import { sendEmail, emailTemplates } from "../../config/emailService";
import { getInvoicePdfDataUri } from "../../utils/invoice";
import { db, ref, push, set } from "../../config/firebase";

const PricingSection = ({
  selectedPackage,
  onPackageSelect,
  price,
  features,
}) => {
  const navigate = useNavigate();
  const [showFeatures, setShowFeatures] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false); // To ensure it only opens once on scroll
  const sectionRef = useRef(null);
  const [isPurchaseOpen, setIsPurchaseOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [sendError, setSendError] = useState("");
  const [sendSuccess, setSendSuccess] = useState(false);
  const [purchaseForm, setPurchaseForm] = useState({
    name: "",
    email: "",
    phone: "",
    business: "",
    extraPages: 0,
    deliveryOptionIndex: 0,
    notes: "",
    acceptTerms: false,
  });

  const packageDetails = {
    starter: {
      deliveryTime: "4-day delivery",
      revisions: "1 Revision",
      title: "E-commerce Starter",
      description: "A clean, responsive online store to get you selling fast.",
    },
    standard: {
      deliveryTime: "4-day delivery",
      revisions: "2 Revisions",
      title: "E-commerce Standard",
      description:
        "All Starter features + progressive web app and conversion tools.",
    },
    enterprises: {
      deliveryTime: "10-day delivery",
      revisions: "2 Revisions",
      title: "Pro Multi-Vendor Marketplace",
      description:
        "Full multi-seller marketplace with marketing and automation tools.",
    },
  };

  const planConfig = {
    starter: {
      basePages: 5,
      deliveryOptions: [
        { label: "4 days (Standard)", days: 4, additional: 0 },
        { label: "2 days (Fast)", days: 2, additional: 3792 },
      ],
    },
    standard: {
      basePages: 10,
      deliveryOptions: [
        { label: "4 days (Standard)", days: 4, additional: 0 },
        { label: "2 days (Fast)", days: 2, additional: 7583 },
      ],
    },
    enterprises: {
      basePages: 25,
      deliveryOptions: [
        { label: "10 days (Standard)", days: 10, additional: 0 },
        { label: "5 days (Fast)", days: 5, additional: 30000 },
      ],
    },
  };

  // --- NEW: Scroll Detection Logic ---
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // If 60% of the component is visible and hasn't animated yet
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          setShowFeatures(true);

          // Automatically close after 2.5 seconds
          setTimeout(() => {
            setShowFeatures(false);
          }, 2500);
        }
      },
      { threshold: 0.6 }, // Trigger when 60% of the element is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  const currentDetails = packageDetails[selectedPackage];
  const currentPlanConfig = planConfig[selectedPackage] || {
    basePages: 0,
    deliveryOptions: [{ label: "Standard", days: 0, additional: 0 }],
  };

  useEffect(() => {
    setPurchaseForm((prev) => ({
      ...prev,
      extraPages: 0,
      deliveryOptionIndex: 0,
      acceptTerms: false,
    }));
    setSendError("");
    setSendSuccess(false);
  }, [selectedPackage]);

  useEffect(() => {
    const handler = (event) => {
      const detail = event?.detail || {};
      const planKey = detail.planKey;
      const deliveryOptionIndex = Number(detail.deliveryOptionIndex);

      if (planKey && typeof onPackageSelect === "function") {
        onPackageSelect(planKey);
      }

      setPurchaseForm((prev) => ({
        ...prev,
        deliveryOptionIndex:
          Number.isFinite(deliveryOptionIndex) && deliveryOptionIndex >= 0
            ? deliveryOptionIndex
            : 0,
      }));
      setIsPurchaseOpen(true);
      setSendError("");
      setSendSuccess(false);
    };

    if (typeof window !== "undefined") {
      window.addEventListener("plan:select", handler);
      return () => window.removeEventListener("plan:select", handler);
    }
    return undefined;
  }, [onPackageSelect]);

  const extraPages = useMemo(() => {
    const value = Number(purchaseForm.extraPages);
    return Number.isFinite(value) && value > 0 ? Math.floor(value) : 0;
  }, [purchaseForm.extraPages]);

  const deliveryOption =
    currentPlanConfig.deliveryOptions[purchaseForm.deliveryOptionIndex] ||
    currentPlanConfig.deliveryOptions[0];
  const deliveryAddOn = deliveryOption?.additional || 0;
  const pageAddOnCost = extraPages * 1000;
  const basePrice = price[selectedPackage] || 0;
  const totalPrice = basePrice + deliveryAddOn + pageAddOnCost;
  const formatCurrency = (value) =>
    `Rs. ${Number(value || 0).toLocaleString("en-IN")}`;

  const handlePurchaseOpen = () => {
    setIsPurchaseOpen(true);
    setSendError("");
    setSendSuccess(false);
  };

  const handleBookEnrollment = () => {
    try {
      localStorage.setItem("selectedPlan", selectedPackage);
    } catch (error) {
      console.error("Failed to store selected plan:", error);
    }
    navigate(`/book-enrollment?plan=${encodeURIComponent(selectedPackage)}`);
  };

  const handlePurchaseClose = () => {
    if (isSending) return;
    setIsPurchaseOpen(false);
  };

  const handlePurchaseChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPurchaseForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : name === "extraPages"
          ? value.replace(/[^\d]/g, "")
          : value,
    }));
  };

  const loadRazorpayScript = () =>
    new Promise((resolve, reject) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.onload = () => resolve(true);
      script.onerror = () => reject(new Error("Failed to load Razorpay SDK"));
      document.body.appendChild(script);
    });

  const handleSendPurchase = async (e) => {
    e.preventDefault();
    setSendError("");
    setSendSuccess(false);

    if (
      !purchaseForm.name.trim() ||
      !purchaseForm.email.trim() ||
      !purchaseForm.phone.trim()
    ) {
      setSendError("Please fill in Name, Email, and Phone.");
      return;
    }

    if (!purchaseForm.acceptTerms) {
      setSendError("Please accept Terms & Privacy Policy to continue.");
      return;
    }

    const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID;
    if (!razorpayKey) {
      setSendError("Payment gateway is not configured. Please try again later.");
      return;
    }

    const payload = {
      name: purchaseForm.name.trim(),
      email: purchaseForm.email.trim(),
      phone: purchaseForm.phone.trim(),
      business: purchaseForm.business.trim(),
      notes: purchaseForm.notes.trim(),
      planName: currentDetails?.title || selectedPackage,
      planKey: selectedPackage,
      basePrice,
      basePages: currentPlanConfig.basePages,
      extraPages,
      pageAddOnCost,
      deliveryLabel: deliveryOption?.label || "Standard",
      deliveryAddOn,
      total: totalPrice,
    };

    try {
      setIsSending(true);
      await loadRazorpayScript();

      const purchaseId = `PUR-${Date.now()}`;
      const invoiceId = `INV-${Date.now()}`;
      const amountInPaise = Math.round(totalPrice * 100);

      const options = {
        key: razorpayKey,
        amount: amountInPaise,
        currency: "INR",
        name: "Akamify",
        description: `Plan Purchase - ${payload.planName}`,
        handler: async function (response) {
          const invoiceData = {
            ...payload,
            invoiceId,
            purchaseId,
            paymentId: response?.razorpay_payment_id,
            date: new Date().toISOString(),
            status: "paid",
            createdAt: new Date().toISOString(),
          };

          localStorage.setItem("planInvoiceData", JSON.stringify(invoiceData));
          localStorage.setItem("planPurchaseData", JSON.stringify(invoiceData));
          localStorage.setItem("planInvoiceEmailStatus", "pending");

          try {
            const purchasesRef = ref(db, "planPurchases");
            const newPurchaseRef = push(purchasesRef);
            await set(newPurchaseRef, invoiceData);
          } catch (firebaseError) {
            console.error("Plan purchase save error:", firebaseError);
          }

          try {
            const dataUri = getInvoicePdfDataUri(invoiceData);
            const base64 = dataUri.split(",")[1];
            const attachments = [
              {
                filename: `Invoice-${invoiceId}.pdf`,
                content: base64,
                encoding: "base64",
                contentType: "application/pdf",
              },
            ];

            const invoiceTemplate = emailTemplates.planInvoice(invoiceData);
            await sendEmail(
              invoiceData.email,
              invoiceTemplate.subject,
              invoiceTemplate,
              { attachments }
            );

            const adminEmail =
              import.meta.env.VITE_ADMIN_EMAIL || import.meta.env.VITE_EMAIL_FROM;
            if (adminEmail && adminEmail !== invoiceData.email) {
              const adminTemplate = emailTemplates.planInvoiceAdmin(invoiceData);
              await sendEmail(
                adminEmail,
                adminTemplate.subject,
                adminTemplate,
                { attachments }
              );
            }

            localStorage.setItem("planInvoiceEmailStatus", "sent");
          } catch (emailError) {
            console.error("Invoice email failed:", emailError);
            localStorage.setItem("planInvoiceEmailStatus", "failed");
          } finally {
            setIsSending(false);
            setSendSuccess(true);
            navigate("/plan-payment-success");
          }
        },
        prefill: {
          name: payload.name,
          email: payload.email,
          contact: payload.phone,
        },
        notes: {
          purchase_id: purchaseId,
          plan: payload.planName,
        },
        modal: {
          ondismiss: function () {
            setIsSending(false);
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.on("payment.failed", function (response) {
        localStorage.setItem(
          "planPaymentFailed",
          JSON.stringify({
            ...payload,
            purchaseId,
            error: response?.error?.description || "Payment failed",
            code: response?.error?.code,
            paymentId: response?.error?.metadata?.payment_id,
            timestamp: new Date().toISOString(),
          })
        );
        setIsSending(false);
        navigate("/plan-payment-failed");
      });

      razorpay.open();
    } catch (error) {
      setSendError(error?.message || "Payment setup failed. Please try again.");
      setIsSending(false);
    }
  };

  return (
    <div
      ref={sectionRef}
      className="w-full max-w-[450px] mx-auto bg-white border border-gray-200  rounded-1xl overflow-hidden transition-all duration-300 hover:shadow-gray-200/50"
    >
      {/* Tabs Section */}
      <div className="flex bg-gray-50/50 border-b border-gray-100">
        {["starter", "standard", "enterprises"].map((pkg) => (
          <button
            key={pkg}
            onClick={() => onPackageSelect(pkg)}
            className={`flex-1 py-4 text-sm font-bold uppercase tracking-wider transition-all duration-300 ${
              selectedPackage === pkg
                ? "bg-white text-black border-b-2 border-black"
                : "text-gray-400 hover:text-gray-600 hover:bg-gray-100/50"
            }`}
          >
            {pkg}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="p-6 md:p-8">
        <div className="flex gap-[6px] items-center mb-4">
          <h3 className="text-1xl font-bold text-gray-700 leading-tight w-2/3">
            {currentDetails.title}
          </h3>
          <span className="text-1xl font-bold text-gray-900">
            {formatCurrency(price[selectedPackage])}
          </span>
        </div>

        <p className="text-gray-500 text-[15px] leading-relaxed mb-6">
          {currentDetails.description}
        </p>

        {/* Stats */}
        <div className="flex gap-6 mb-8">
          <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
            <Clock size={18} className="text-gray-400" />
            {currentDetails.deliveryTime}
          </div>
          <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
            <RotateCcw size={18} className="text-gray-400" />
            {currentDetails.revisions}
          </div>
        </div>

        {/* What's Included Dropdown */}
        <div
          className="mb-6"
          onMouseEnter={() => setShowFeatures(true)} // Desktop Hover Open
          onMouseLeave={() => setShowFeatures(false)} // Desktop Hover Close
        >
          <button
            onClick={() => setShowFeatures(!showFeatures)}
            className="flex items-center justify-between w-full py-2 group cursor-pointer"
          >
            <span className="font-bold text-gray-800 uppercase text-xs tracking-widest flex items-center gap-2">
              What's Included
              {/* Suggestion: A small notification dot to grab attention */}
              {!hasAnimated && (
                <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-ping"></span>
              )}
            </span>
            <ChevronDown
              size={20}
              className={`transition-all duration-500 ease-in-out ${
                showFeatures
                  ? "rotate-180 text-black"
                  : "text-gray-400 group-hover:text-black animate-bounce"
              }`}
              // Added animate-bounce logic above to grab attention until first interaction
            />
          </button>

          {/* Unfolding Content */}
          <div
            className={`grid transition-all duration-500 ease-in-out overflow-hidden ${
              showFeatures
                ? "grid-rows-[1fr] opacity-100 mt-4"
                : "grid-rows-[0fr] opacity-0"
            }`}
          >
            <div className="min-h-0">
              <ul className="space-y-3">
                {features[selectedPackage].map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-3 text-[14px] text-gray-600 font-medium"
                  >
                    <Check
                      size={16}
                      className="text-black flex-shrink-0"
                      strokeWidth={3}
                    />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 mt-8">
          <button
            onClick={handlePurchaseOpen}
            className="w-full bg-black text-white py-4 rounded-xl font-bold flex items-center justify-center gap-3 transition-all duration-300 hover:bg-gray-800 active:scale-[0.98] shadow-lg shadow-black/10"
          >
            SELECT PLAN
            <ArrowRight size={18} />
          </button>
          <button
            onClick={handleBookEnrollment}
            className="w-full bg-white border-2 border-gray-100 text-gray-800 py-4 rounded-xl font-bold flex items-center justify-center gap-3 transition-all duration-300 hover:border-black hover:bg-gray-50 active:scale-[0.98]"
          >
            BOOK ENROLLMENT
            <Calendar size={18} />
          </button>

          <button
            onClick={() => navigate("/view-demo")}
            className="w-full bg-white border-2 border-gray-100 text-gray-800 py-4 rounded-xl font-bold flex items-center justify-center gap-3 transition-all duration-300 hover:border-black hover:bg-gray-50 active:scale-[0.98]"
          >
            VIEW DEMO
            <ArrowRight size={18} />
          </button>
        </div>
      </div>

      {isPurchaseOpen && typeof document !== "undefined"
        ? createPortal(
            <div className="fixed inset-0 z-[2147483647] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-300">
              <div className="w-full max-w-2xl rounded-[8px] bg-white border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
                {/* Header: Clean & Balanced */}
                <div className="flex items-center justify-between border-b border-slate-100 px-8 py-6 bg-white">
                  <div className="space-y-1">
                    <span className="inline-block px-2 py-0.5 rounded-[4px] bg-slate-100 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                      Plan Purchase
                    </span>
                    <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                      {currentDetails.title}
                    </h3>
                  </div>
                  <button
                    onClick={handlePurchaseClose}
                    className="group flex items-center justify-center w-10 h-10 rounded-[8px] border border-slate-200 text-slate-400 hover:bg-slate-50 hover:text-slate-900 hover:border-slate-300 transition-all active:scale-95"
                    aria-label="Close"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M18 6 6 18" />
                      <path d="m6 6 12 12" />
                    </svg>
                  </button>
                </div>

                {/* Form Section */}
                <form
                  onSubmit={handleSendPurchase}
                  className="flex-1 overflow-y-auto custom-scrollbar"
                >
                  <div className="p-8 space-y-8">
                    {/* Personal Info Grid */}
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wide text-slate-700">
                          Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={purchaseForm.name}
                          onChange={handlePurchaseChange}
                          className="w-full rounded-[8px] border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium transition-all focus:bg-white focus:border-indigo-600 focus:ring-0 outline-none placeholder:text-slate-400"
                          placeholder="John Doe"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wide text-slate-700">
                          Email <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={purchaseForm.email}
                          onChange={handlePurchaseChange}
                          className="w-full rounded-[8px] border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium transition-all focus:bg-white focus:border-indigo-600 focus:ring-0 outline-none placeholder:text-slate-400"
                          placeholder="john@example.com"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wide text-slate-700">
                          Phone <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={purchaseForm.phone}
                          onChange={handlePurchaseChange}
                          className="w-full rounded-[8px] border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium transition-all focus:bg-white focus:border-indigo-600 focus:ring-0 outline-none placeholder:text-slate-400"
                          placeholder="+91 00000 00000"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wide text-slate-700">
                          Business Name
                        </label>
                        <input
                          type="text"
                          name="business"
                          value={purchaseForm.business}
                          onChange={handlePurchaseChange}
                          className="w-full rounded-[8px] border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium transition-all focus:bg-white focus:border-indigo-600 focus:ring-0 outline-none placeholder:text-slate-400"
                          placeholder="Company Ltd."
                        />
                      </div>
                    </div>

                    {/* Plan Customization */}
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 pt-6 border-t border-slate-100">
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wide text-slate-700">
                          Delivery Speed
                        </label>
                        <select
                          name="deliveryOptionIndex"
                          value={purchaseForm.deliveryOptionIndex}
                          onChange={(e) =>
                            setPurchaseForm((prev) => ({
                              ...prev,
                              deliveryOptionIndex: Number(e.target.value),
                            }))
                          }
                          className="w-full rounded-[8px] border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold transition-all focus:bg-white focus:border-indigo-600 focus:ring-0 outline-none appearance-none cursor-pointer"
                        >
                          {currentPlanConfig.deliveryOptions.map(
                            (option, index) => (
                              <option key={option.label} value={index}>
                                {option.label}{" "}
                                {option.additional > 0
                                  ? `(+${formatCurrency(option.additional)})`
                                  : ""}
                              </option>
                            ),
                          )}
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wide text-slate-700 text-indigo-600">
                          Extra Pages (Rs. 1000/page)
                        </label>
                        <input
                          type="number"
                          name="extraPages"
                          min="0"
                          value={purchaseForm.extraPages}
                          onChange={handlePurchaseChange}
                          className="w-full rounded-[8px] border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold transition-all focus:bg-white focus:border-indigo-600 focus:ring-0 outline-none"
                        />
                      </div>
                    </div>

                    {/* Modern Pricing Summary */}
                    <div className="rounded-[8px] bg-slate-900 p-6 text-white space-y-3">
                      <div className="flex items-center justify-between text-xs font-medium text-slate-400">
                        <span>Base Plan Price</span>
                        <span>{formatCurrency(basePrice)}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs font-medium text-slate-400">
                        <span>Add-ons (Delivery + Pages)</span>
                        <span>
                          {formatCurrency(deliveryAddOn + pageAddOnCost)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between border-t border-slate-700 pt-3">
                        <span className="text-sm font-bold uppercase tracking-widest text-indigo-400">
                          Grand Total
                        </span>
                        <span className="text-2xl font-black">
                          {formatCurrency(totalPrice)}
                        </span>
                      </div>
                    </div>

                    {/* Notes Section */}
                    <div className="space-y-2 pt-4">
                      <label className="text-xs font-bold uppercase tracking-wide text-slate-700">
                        Specific Requirements
                      </label>
                      <textarea
                        name="notes"
                        value={purchaseForm.notes}
                        onChange={handlePurchaseChange}
                        className="w-full rounded-[8px] border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium transition-all focus:bg-white focus:border-indigo-600 focus:ring-0 outline-none min-h-[100px]"
                        placeholder="Tell us more about your project goals..."
                      />
                    </div>

                    {/* Feedback Alerts */}
                    {(sendError || sendSuccess) && (
                      <div
                        className={`rounded-[8px] border px-4 py-3 text-sm font-bold flex items-center gap-3 animate-in zoom-in-95 duration-200 ${
                          sendError
                            ? "bg-red-50 border-red-100 text-red-600"
                            : "bg-emerald-50 border-emerald-100 text-emerald-600"
                        }`}
                      >
                        <div
                          className={`w-2 h-2 rounded-full ${sendError ? "bg-red-500" : "bg-emerald-500"}`}
                        />
                        {sendError
                          ? sendError
                          : "Payment successful. Redirecting to your invoice..."}
                      </div>
                    )}
                  </div>

                  {/* Sticky Footer Action */}
                  <div className="sticky bottom-0 bg-slate-50 border-t border-slate-100 px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex flex-col gap-2 text-[11px] text-slate-500 font-medium max-w-[280px]">
                      <label className="flex items-start gap-2">
                        <input
                          type="checkbox"
                          name="acceptTerms"
                          checked={purchaseForm.acceptTerms}
                          onChange={handlePurchaseChange}
                          className="mt-0.5 h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <span>
                          I agree to the{" "}
                          <a
                            href="#"
                            className="text-indigo-600 hover:underline"
                          >
                            Terms
                          </a>{" "}
                          &{" "}
                          <a
                            href="#"
                            className="text-indigo-600 hover:underline"
                          >
                            Privacy Policy
                          </a>
                          .
                        </span>
                      </label>
                      <span className="text-[10px] text-slate-400">
                        By submitting, you agree to our processing timeline.
                      </span>
                    </div>
                    <button
                      type="submit"
                      disabled={isSending}
                      className="w-full sm:w-auto min-w-[200px] flex items-center justify-center gap-2 rounded-[8px] bg-indigo-600 px-8 py-4 text-sm font-black text-white transition-all hover:bg-indigo-700 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 shadow-lg shadow-indigo-200"
                    >
                      {isSending ? (
                        <>
                          <svg
                            className="animate-spin h-4 w-4 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                          </svg>
                          Processing...
                        </>
                      ) : (
                        <>
                          Proceed to Payment
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M5 12h14" />
                            <path d="m12 5 7 7-7 7" />
                          </svg>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>,
            document.body,
          )
        : null}
    </div>
  );
};

export default PricingSection;
