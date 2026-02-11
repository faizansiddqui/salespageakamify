// ✅ FILE: PackageComparisonSection.jsx
// Section component that consumes the data above. Shows ticks/crosses and inline text when provided.
import React, { useMemo, useState } from "react";
import { Check, X, ChevronDown } from "lucide-react";
import { gigData } from "../../data/data"; // Ensure this matches your file structure

export default function PackageComparisonSection() {
  const [selectedDelivery, setSelectedDelivery] = useState(() =>
    gigData.packages.reduce((acc, _, i) => ({ ...acc, [i]: 0 }), {})
  );
  const rowKeyByPkgIndex = useMemo(() => ["starter", "standard", "enterprise"], []);
  const formatPrice = (num) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(num);
  const calculateTotal = (pkg, pkgIndex) => {
    const add = pkg.deliveryOptions?.[selectedDelivery[pkgIndex]]?.additional || 0;
    return pkg.basePrice + add;
  };
  const handleSelectPackage = (pkg, idx) => {
    const planKey = pkg.id === "enterprise" ? "enterprises" : pkg.id;
    const detail = {
      planKey,
      deliveryOptionIndex: selectedDelivery[idx] ?? 0,
    };
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("plan:select", { detail }));
    }
  };
  // helper to render cell: accepts value (bool|string)
  const RenderCell = ({ value }) => {
    // boolean false or empty string -> cross
    if (value === false || value === null || value === undefined) {
      return <X className="mx-auto text-red-400" size={18} />;
    }
    // if value is a string but can be something like "25/50" (should show text without icon?)
    // We'll treat short numeric/text values like product limits as plain text (no icon),
    // but if the string contains words like 'Quick' 'Advanced' we'll show a tick + small label.
    if (typeof value === "string") {
      const lower = value.toLowerCase();
      const isLabelOnly = /\d|\/|unlimited|scalable/.test(lower);
      if (isLabelOnly) {
        // show centered text (for product counts)
        return <div className="text-sm font-semibold text-gray-700">{value}</div>;
      }
      // otherwise show tick with text below
      return (
        <div className="flex flex-col items-center gap-1">
          <Check className="text-green-600" size={18} />
          <span className="text-xs text-gray-500 text-center max-w-[120px]">{value}</span>
        </div>
      );
    }
    // otherwise truthy -> check
    return <Check className="mx-auto text-green-600" size={18} />;
  };

  return (
    <section className="mt-16 mb-20">
      <h3 className="text-2xl font-bold mb-2">Compare Packages</h3>
      <p className="md:hidden text-left text-gray-500 mb-4 text-sm">Swipe left/right to compare packages</p>
      <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-sm ring-1 ring-gray-200">
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left border-collapse table-fixed min-w-[720px]">
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-200 backdrop-blur-sm sticky top-0 z-10">
                <th className="w-1/4 p-6 text-gray-500 font-medium align-top pt-8 sticky left-0 bg-gray-50/80 z-20">Feature</th>
                {gigData.packages.map((pkg, i) => (
                  <th key={i} className="w-1/4 p-6 border-l border-gray-200 align-top hover:bg-white">
                    <span className="text-2xl font-bold text-gray-900 block mb-1">{pkg.name}</span>
                    <span className="text-sm font-semibold text-gray-600 block mb-4 uppercase tracking-wider">{pkg.title}</span>
                    <p className="text-sm font-normal text-gray-500 leading-relaxed h-16 overflow-hidden text-ellipsis">{pkg.desc}</p>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {gigData.tableRows.map((row, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors duration-200 group">
                  <td className="p-4 px-6 text-gray-600 font-medium group-hover:text-gray-900 sticky left-0 bg-white z-10">{row.label}</td>
                  {gigData.packages.map((pkg, pkgIndex) => {
                    const key = rowKeyByPkgIndex[pkgIndex];
                    const value = row[key];
                    return (
                      <td key={pkg.id} className="p-4 text-center border-l border-gray-100 bg-white group-hover:bg-gray-50 transition-colors">
                        <RenderCell value={value} />
                      </td>
                    );
                  })}
                </tr>
              ))}
              {/* Numeric stats rows */}
              {[{ label: "Number of Pages", key: "pages" }, { label: "Products", key: "products" }, { label: "Plugins/Extensions", key: "plugins" }, { label: "Revisions", key: "revisions" }].map((stat, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors duration-200 group">
                  <td className="p-4 px-6 text-gray-600 font-medium group-hover:text-gray-900 sticky left-0 bg-white z-10">{stat.label}</td>
                  {gigData.packages.map((pkg, idx) => (
                    <td key={idx} className="p-4 text-center border-l border-gray-100 bg-white group-hover:bg-gray-50 font-semibold text-gray-700">{pkg[stat.key]}</td>
                  ))}
                </tr>
              ))}
              {/* Delivery selector */}
              <tr className="bg-white">
                <td className="p-4 px-6 font-medium text-gray-600 align-middle sticky left-0 bg-white z-10">Delivery Time</td>
                {gigData.packages.map((pkg, i) => (
                  <td key={i} className="p-4 text-center border-l border-gray-100 px-6 align-middle">
                    <div className="relative group max-w-xs mx-auto">
                      <select className="w-full bg-white border border-gray-300 rounded-lg py-2.5 px-3 text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-black transition-all cursor-pointer shadow-sm hover:border-gray-400" value={selectedDelivery[i]} onChange={(e) => setSelectedDelivery({ ...selectedDelivery, [i]: parseInt(e.target.value) })}>
                        {pkg.deliveryOptions.map((opt, idx) => (
                          <option key={idx} value={idx}>{opt.label} {opt.additional > 0 ? `(+${formatPrice(opt.additional)})` : ""}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-3 text-gray-400 pointer-events-none group-hover:text-gray-600" size={16} />
                    </div>
                  </td>
                ))}
              </tr>
              {/* Total row */}
              <tr className="bg-gray-50 sticky bottom-0 z-10">
                <td className="p-6 px-6 font-bold text-gray-700 sticky left-0 bg-gray-50 z-20">Total</td>
                {gigData.packages.map((pkg, i) => (
                  <td key={pkg.id} className="p-6 border-l border-gray-200">
                    <div className="flex flex-col gap-4">
                      <div className="text-center text-2xl font-bold text-gray-900">{formatPrice(calculateTotal(pkg, i))}</div>
                      <button onClick={() => handleSelectPackage(pkg, i)} className="w-full bg-black text-white py-3 rounded-lg font-bold hover:bg-gray-800 transition-all duration-200 active:scale-95 shadow-md">Select</button>
                    </div>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
