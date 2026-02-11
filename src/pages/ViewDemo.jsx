import React, { useState } from "react";
import {
  ExternalLink,
  ShoppingCart,
  Grid,
  Store,
  MessageSquare,
  Zap,
  ArrowUpRight,
  ShieldCheck,
  Sparkles,
  ChevronLeft,
  Layout,
  Box,
  Layers,
} from "lucide-react";

const ViewDemo = () => {
  const [activeTab, setActiveTab] = useState("demos"); // 'demos' or 'components'
  const [hoveredId, setHoveredId] = useState(null);

  const demos = [
    {
      id: 1,
      title: "Global Storefront",
      desc: "Next-gen shopping experience with lightning fast edge-delivery.",
      icon: <ShoppingCart className="text-blue-500" size={24} />,
      badge: "Bestseller",
      img: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=600",
      span: "md:col-span-2 md:row-span-2",
    },
    {
      id: 2,
      title: "Admin Panel",
      desc: "Smart inventory & analytics.",
      icon: <Grid className="text-purple-500" size={20} />,
      img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600",
      span: "md:col-span-1 md:row-span-1",
    },
    {
      id: 3,
      title: "AI Support",
      desc: "Automated customer success.",
      icon: <MessageSquare className="text-emerald-500" size={20} />,
      img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=400",
      span: "md:col-span-1 md:row-span-1",
    },
    {
      id: 4,
      title: "Analytics Deck",
      desc: "Deep data visualization for scaling faster.",
      icon: <Zap className="text-orange-500" size={24} />,
      img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600",
      span: "md:col-span-3 md:row-span-1",
    },
  ];

  const components = [
    { id: "c1", name: "Navigation Bar", type: "UI Kit", status: "Ready" },
    { id: "c2", name: "Product Grid", type: "Commerce", status: "Beta" },
    { id: "c3", name: "Auth Modals", type: "Security", status: "Ready" },
    { id: "c4", name: "Checkout Form", type: "Finance", status: "Updated" },
    { id: "c5", name: "Smart Search", type: "AI", status: "Ready" },
    { id: "c6", name: "Footer Pro", type: "UI Kit", status: "Ready" },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 selection:bg-indigo-100 font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Background Blobs */}
      <div className="fixed inset-0 overflow-hidden -z-10">
        <div className="absolute top-[-5%] left-[-5%] w-[40%] h-[40%] bg-blue-100/50 blur-[100px] rounded-full"></div>
        <div className="absolute bottom-[-5%] right-[-5%] w-[40%] h-[40%] bg-indigo-100/50 blur-[100px] rounded-full"></div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Top Nav: Back Button & Tabs */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
          {/* Back Button */}
          <button
            onClick={() => window.history.back()}
            className="group flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-[8px] text-sm font-bold text-slate-600 hover:text-indigo-600 hover:border-indigo-200 transition-all active:scale-95"
          >
            <ChevronLeft
              size={18}
              className="group-hover:-translate-x-1 transition-transform"
            />
            Back
          </button>

          {/* Glass Tab Switcher */}
          <div className="bg-slate-200/50 backdrop-blur-md p-1.5 rounded-2xl flex gap-1 border border-white">
            <button
              onClick={() => setActiveTab("demos")}
              className={`px-6 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-all ${activeTab === "demos" ? "bg-white shadow-md text-indigo-600 scale-100" : "text-slate-500 hover:text-slate-700"}`}
            >
              <Layout size={16} /> Demos
            </button>
            <button
              onClick={() => setActiveTab("components")}
              className={`px-6 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-all ${activeTab === "components" ? "bg-white shadow-md text-indigo-600 scale-100" : "text-slate-500 hover:text-slate-700"}`}
            >
              <Layers size={16} /> Components
            </button>
          </div>
        </div>

        {/* Dynamic Content Heading */}
        <div className="mb-10 animate-in fade-in duration-500">
          <h2 className="text-4xl font-black tracking-tight flex items-center gap-3">
            {activeTab === "demos" ? "Live Demos" : "UI Components"}
            <Sparkles className="text-indigo-500" size={24} />
          </h2>
          <p className="text-slate-500 mt-2 font-medium">
            {activeTab === "demos"
              ? "Fully functional templates for your next project."
              : "Modular blocks to build your custom interface."}
          </p>
        </div>

        {/* --- TABS CONTENT --- */}

        {activeTab === "demos" ? (
          /* Bento Grid for Demos */
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 auto-rows-[220px] animate-in slide-in-from-bottom-4 duration-500">
            {demos.map((demo) => (
              <div
                key={demo.id}
                className={`group relative rounded-[8px] overflow-hidden bg-white border border-slate-200 transition-all duration-500 hover:border-indigo-400 hover:shadow-2xl hover:shadow-indigo-100 cursor-pointer ${demo.span}`}
              >
                <div className="absolute inset-0 z-0">
                  <img
                    src={demo.img}
                    alt=""
                    className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-white/95 via-white/40 to-transparent z-10"></div>
                </div>
                <div className="absolute inset-0 z-20 p-8 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div className="p-3 bg-white rounded-2xl shadow-sm border border-slate-100 group-hover:bg-indigo-600 hover:text-white transition-all">
                      {demo.icon}
                    </div>
                  </div>
                  <div className="flex justify-between items-end">
                    <div>
                      <h3 className="text-xl font-extrabold text-white">
                        {demo.title}
                      </h3>
                      <p className="text-white text-xs font-semibold mt-1 opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                        {demo.desc}
                      </p>
                    </div>
                    <div className="w-10 h-10 bg-slate-900 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-lg">
                      <ArrowUpRight size={18} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Component List View */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-in slide-in-from-bottom-4 duration-500">
            {components.map((comp) => (
              <div
                key={comp.id}
                className="group p-5 bg-white border border-slate-200 rounded-[8px] flex items-center justify-between hover:border-indigo-400 transition-all cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                    <Box size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">{comp.name}</h4>
                    <span className="text-[10px] uppercase tracking-widest font-bold text-slate-400">
                      {comp.type}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="text-[10px] px-2 py-0.5 bg-emerald-50 text-emerald-600 font-bold rounded-md">
                    {comp.status}
                  </span>
                  <ExternalLink
                    size={14}
                    className="text-slate-300 group-hover:text-indigo-600"
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Compact Footer */}
        <footer className="mt-10 p-6 bg-white/60 backdrop-blur-md border border-gray-200 rounded-[32px] flex flex-wrap items-center justify-between gap-4">
          <div className="flex gap-6">
            <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-widest">
              <ShieldCheck size={16} /> Secured
            </div>
            <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-widest">
              <Zap size={16} /> Fast
            </div>
          </div>
          <p className="text-slate-400 text-xs font-medium">
            © 2026 Akamify AI Showcase
          </p>
        </footer>
      </div>
    </div>
  );
};

export default ViewDemo;
