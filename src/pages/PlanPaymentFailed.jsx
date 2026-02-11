import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlertTriangle, ArrowLeft, RefreshCw } from "lucide-react";

const PlanPaymentFailed = () => {
  const navigate = useNavigate();
  const [failureData, setFailureData] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("planPaymentFailed");
    if (stored) {
      try {
        setFailureData(JSON.parse(stored));
      } catch (e) {
        console.error("Invalid failure data:", e);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-3xl bg-white border border-slate-200 rounded-[8px] p-8">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center">
            <AlertTriangle className="text-amber-600" size={26} />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900">
              Payment Failed
            </h1>
            <p className="text-sm text-slate-500">
              Your payment could not be completed. No charges were applied.
            </p>
          </div>
        </div>

        <div className="mt-6 rounded-xl border border-slate-100 bg-slate-50 p-4">
          <p className="text-sm text-slate-700">
            <strong>Reason:</strong>{" "}
            {failureData?.error || "Transaction could not be completed."}
          </p>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-slate-100 bg-white p-4">
            <p className="text-xs font-semibold text-slate-500 uppercase">
              Plan
            </p>
            <p className="text-lg font-bold text-slate-900">
              {failureData?.planName || "N/A"}
            </p>
          </div>
          <div className="rounded-xl border border-slate-100 bg-white p-4">
            <p className="text-xs font-semibold text-slate-500 uppercase">
              Total Amount
            </p>
            <p className="text-lg font-bold text-slate-900">
              Rs. {Number(failureData?.total || 0).toLocaleString("en-IN")}
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => navigate("/service")}
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-white font-bold hover:bg-slate-800"
          >
            <RefreshCw size={18} />
            Try Again
          </button>
          <button
            onClick={() => navigate(-1)}
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-5 py-3 text-slate-800 font-bold hover:bg-slate-50"
          >
            <ArrowLeft size={18} />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlanPaymentFailed;
