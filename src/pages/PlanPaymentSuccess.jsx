import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle, Download, ArrowRight, Home } from "lucide-react";
import { getInvoicePdfBlob } from "../utils/invoice";

const PlanPaymentSuccess = () => {
  const navigate = useNavigate();
  const [invoiceData, setInvoiceData] = useState(null);
  const [emailStatus, setEmailStatus] = useState("pending");

  useEffect(() => {
    const stored = localStorage.getItem("planInvoiceData");
    if (stored) {
      try {
        setInvoiceData(JSON.parse(stored));
      } catch (e) {
        console.error("Invalid invoice data:", e);
      }
    }
    setEmailStatus(localStorage.getItem("planInvoiceEmailStatus") || "pending");
  }, []);

  const handleDownload = () => {
    if (!invoiceData) return;
    const blob = getInvoicePdfBlob(invoiceData);
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Invoice-${invoiceData.invoiceId || "Plan"}.pdf`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-3xl bg-white border border-slate-200 rounded-[8px] p-8">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
            <CheckCircle className="text-emerald-600" size={28} />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900">
              Payment Successful
            </h1>
            <p className="text-sm text-slate-500">
              Your plan purchase is confirmed. Invoice is ready.
            </p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
            <p className="text-xs font-semibold text-slate-500 uppercase">
              Invoice ID
            </p>
            <p className="text-lg font-bold text-slate-900">
              {invoiceData?.invoiceId || "N/A"}
            </p>
          </div>
          <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
            <p className="text-xs font-semibold text-slate-500 uppercase">
              Payment ID
            </p>
            <p className="text-lg font-bold text-slate-900">
              {invoiceData?.paymentId || "N/A"}
            </p>
          </div>
          <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
            <p className="text-xs font-semibold text-slate-500 uppercase">
              Plan
            </p>
            <p className="text-lg font-bold text-slate-900">
              {invoiceData?.planName || "N/A"}
            </p>
          </div>
          <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
            <p className="text-xs font-semibold text-slate-500 uppercase">
              Total Paid
            </p>
            <p className="text-lg font-bold text-slate-900">
              Rs. {Number(invoiceData?.total || 0).toLocaleString("en-IN")}
            </p>
          </div>
        </div>

        <div className="mt-4 rounded-xl border border-slate-100 bg-white p-4">
          <p className="text-sm text-slate-600">
            Invoice email status:{" "}
            <span className="font-semibold text-slate-900">
              {emailStatus === "sent"
                ? "Sent"
                : emailStatus === "failed"
                ? "Failed"
                : "Pending"}
            </span>
          </p>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleDownload}
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-white font-bold hover:bg-slate-800"
          >
            <Download size={18} />
            Download Invoice
          </button>
          <button
            onClick={() => navigate("/service")}
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-5 py-3 text-slate-800 font-bold hover:bg-slate-50"
          >
            <ArrowRight size={18} />
            Back to Service
          </button>
          <button
            onClick={() => navigate("/")}
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-5 py-3 text-slate-800 font-bold hover:bg-slate-50"
          >
            <Home size={18} />
            Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlanPaymentSuccess;
