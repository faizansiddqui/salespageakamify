import React from "react";
import {
  Calendar,
  Eye,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { gigData } from "../../data/data"; // Ensure this matches your file structure
import AboutGig2 from "./AboutGig2";
import PackageComparisonSection from "./PackageComparisonChart";

const AboutGig = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-8xl mx-auto px-0 sm:px-6 lg:px-0 py-8 text-gray-800 font-sans">
      {/* --- Header Section --- */}
      <div className="max-w-4xl">
        <AboutGig2 />
      </div>

      {/* --- PACKAGE COMPARISON SECTION --- */}
      <div>
        <PackageComparisonSection />
      </div>

      {/* --- SELLER PROFILE SECTION --- */}
      <section className="mt-16 bg-white border border-gray-200 rounded-2xl p-2 md:p-10 transition-shadow duration-300">
        {/* <h3 className="text-2xl font-bold mb-8 text-gray-900">Get to know {gigData.seller.name}</h3> */}
        <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
          <img
            src={gigData.seller.logo}
            alt="Logo"
            className="w-28 h-28 rounded-full border-4 border-gray-50 p-2 object-cover  transition-transform duration-300 hover:scale-105"
          />
          <div className="text-center md:text-left flex-1">
            <h4 className="text-2xl font-bold text-gray-900">
              {gigData.seller.name}
            </h4>
            <p className="text-gray-500 mt-1 mb-4">
              {gigData.seller.about.substring(0, 100)}...
            </p>
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              <button
                onClick={() => navigate("/contact")}
                className="flex items-center gap-2 px-6 py-2.5 border border-gray-900 rounded-lg font-semibold text-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-300 active:scale-95"
              >
                <Calendar size={18} /> Contact Me
              </button>
              <button
                onClick={() => navigate("/view-demo")}
                className="flex items-center gap-2 px-6 py-2.5 border border-gray-900 rounded-lg font-semibold text-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-300 active:scale-95"
              >
                <Eye size={18} /> View Demo
              </button>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-left md:text-left">
              <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">
                From
              </p>
              <p className="font-bold text-gray-900">{gigData.seller.from}</p>
            </div>
            <div className="text-left md:text-left">
              <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">
                Member Since
              </p>
              <p className="font-bold text-gray-900">
                {gigData.seller.memberSince}
              </p>
            </div>
            <div className="text-left md:text-left">
              <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">
                Avg. Response
              </p>
              <p className="font-bold text-gray-900">
                {gigData.seller.avgResponse}
              </p>
            </div>
            <div className="text-left md:text-left">
              <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">
                Languages
              </p>
              <p
                className="font-bold text-gray-900 truncate"
                title={gigData.seller.languages}
              >
                {gigData.seller.languages}
              </p>
            </div>
          </div>
          <div className="mt-2 border-t border-gray-200 pt-6">
            <p className="text-gray-600 leading-relaxed text-sm md:text-base">
              {gigData.seller.about}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutGig;
