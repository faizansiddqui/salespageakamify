import React, { useState } from 'react';
import { gigData } from '../../data/gigData';
import {
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Layers,
  Zap,
  Star,
  Terminal
} from 'lucide-react';

const AboutGig = () => {
  const { about, whyMe, table } = gigData;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="max-w-4xl mx-auto bg-white text-slate-700 font-sans antialiased">

      {/* Header Section - Always Visible */}
      <header className="mb-4">
        <h1 className="text-2xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
          {about.title}
        </h1>

        {/* --- THE QUESTION DROPDOWN TRIGGER --- */}
        <div
          onClick={() => setIsOpen(!isOpen)}
          className={`group cursor-pointer rounded-md p-4 md:p-6 border-2 transition-all duration-300 ${isOpen
              ? 'border-gray-300 bg-gray-50/30'
              : 'border-slate-100 bg-slate-50 hover:border-gray-200'
            }`}
        >
          <div className="flex items-start justify-between gap-2">
            <p className="text-sm md:text-xl lg:text-xl font-semibold text-slate-800 leading-tight">
              {about.question}
            </p>
            <div className={`mt-1 p-1 rounded-full bg-white shadow-sm border border-slate-200 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
              <ChevronDown size={24} className={isOpen ? 'text-blue-600' : 'text-slate-400'} />
            </div>
          </div>

          {/* Hidden Content - Opens when question is clicked */}
          <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[2000px] opacity-100 mt-8' : 'max-h-0 opacity-0'}`}>

            {/* 1. Experience & Right Place */}
            <div className="space-y-6 mb-10 border-t border-slate-200 pt-8">
              <div className="inline-flex items-center bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full font-bold text-sm text-md font-semibold text-gray-700 border border-emerald-100">
                <Star size={16} className="mr-2 fill-emerald-700" />
                {about.rightPlace}
              </div>
              <p className="text-base md:text-lg leading-relaxed text-slate-600">
                {about.experience}
              </p>
            </div>

            {/* 2. Help & Tech Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
              <div>
                <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Zap size={18} className="text-blue-600" />
                  {about.helpTitle}
                </h2>
                <ul className="space-y-3">
                  {about.helpList.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-slate-600 text-sm md:text-base">
                      <CheckCircle2 size={18} className="text-blue-500 shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Terminal size={18} className="text-blue-600" />
                  {about.techTitle}
                </h2>
                <div className="flex flex-wrap gap-2">
                  {about.techList.map((item, index) => (
                    <span key={index} className="bg-white text-slate-700 px-3 py-1.5 rounded-lg text-xs font-semibold border border-slate-200 shadow-sm">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* 3. Why Me Section */}
            <div className="bg-slate-900 text-white p-6 md:p-8 rounded-2xl shadow-lg">
              <h2 className="text-xl font-bold mb-6 flex items-center  gap-2">
                <Layers size={20} className="text-blue-600" />
                <span className='text-white'>
                  {whyMe.title}
                </span>
              </h2>
              <div className="grid grid-cols-2 gap-4 mb-6">
                {whyMe.list.map((item, index) => (
                  <div key={index} className="flex items-center gap-2 border border-slate-700 p-3 rounded-xl bg-slate-800/50">
                    <CheckCircle2 size={16} className="text-blue-400" />
                    <span className="text-xs md:text-sm font-medium">{item}</span>
                  </div>
                ))}
              </div>
              <p className="text-blue-300 font-bold mb-1">{whyMe.workTogether}</p>
              <p className="text-slate-400 text-sm italic">{whyMe.contact}</p>
            </div>
          </div>
        </div>
      </header>

      {/* --- ALWAYS VISIBLE: Gig Specifications Table --- */}
      <div className="mt-12">
        <h3 className="text-lg font-bold text-slate-900 mb-4 px-1">Gig Specifications</h3>
        <div className="border border-slate-200 rounded-md overflow-hidden shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-100">
            {table.headers.map((header, index) => (
              <div key={header} className="p-4 text-md font-semibold text-gray-700 hover:bg-slate-50 transition-colors">
                <h4 className="text-[10px] uppercase tracking-widest font-black text-slate-400 mb-3">
                  {header}
                </h4>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                  {table.data[index]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutGig;