// ReviewSection.jsx
import React, { useState } from "react";


import { reviews } from "../data/reviewsData";
import {
  ChevronDown,
  Repeat,
  ThumbsUp,
  ThumbsDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";



/* --- Keep a custom StarIcon so we can show filled/unfilled nicely --- */
const StarIcon = ({ filled }) => (
  <svg
    className={`w-4 h-4 ${filled ? "text-yellow-400" : "text-gray-300"}`} // Made filled stars more realistic with yellow color
    fill="currentColor"
    viewBox="0 0 20 20"
    aria-hidden
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const ReviewCard = ({ review }) => {
    
  const [isHelpful, setIsHelpful] = useState(false);
  const [openResponse, setOpenResponse] = useState(false); // closed by default

  return (
    <div className="w-full bg-white border border-gray-200 rounded-2xl  transition-shadow duration-300 ease-in-out overflow-hidden mb-6 md:mb-8"> {/* Added responsive margins */}
      <div className="p-4 md:p-6"> {/* Responsive padding */}
        {/* Header: Avatar, Name, Country */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full ${review.reviewer.avatarColor} text-gray-700 text-lg font-semibold shadow-sm`} 
            >
              {review.reviewer.initial}
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-gray-900 text-base hover:underline cursor-pointer">
                  {review.reviewer.name}
                </h3>
                {review.reviewer.isRepeatClient && (
                  <span className="flex items-center text-gray-600 text-xs font-medium px-2 py-0.5 rounded-full bg-gray-100 border border-gray-200"> 
                    <Repeat className="w-3.5 h-3.5 mr-1" />
                    Repeat Client
                  </span>
                )}
              </div>
              <div className="flex items-center text-gray-500 text-sm mt-0.5">
                <img 
                  src={`https://flagsapi.com/${review.reviewer.countryCode.toUpperCase()}/shiny/32.png`} 
                  alt={`${review.reviewer.country} flag`} 
                  className="w-5 h-auto mr-1.5" 
                />
                <span>{review.reviewer.country}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Rating & Review Body */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center text-gray-900">
              {[...Array(5)].map((_, i) => (
                <StarIcon key={i} filled={i < review.rating} />
              ))}
              <span className="ml-2 font-semibold text-sm">{review.rating}</span>
            </div>
            <span className="text-gray-300 text-sm">|</span>
            <span className="text-gray-500 text-sm">{review.timeAgo}</span>
          </div>

          <p className="text-gray-700 leading-relaxed text-[15px]">
            {review.reviewText}
          </p>
        </div>

        {/* Project Meta Data (Price/Duration) */}
        <div className="flex items-center gap-6 mb-6 pt-4 pb-4 border-t border-b border-gray-100">
          <div>
            <p className="text-gray-900 font-semibold text-sm">
              {review.projectDetails.price}
            </p>
            <p className="text-gray-500 text-xs">Price</p>
          </div>
          <div className="w-px h-8 bg-gray-200" />
          <div>
            <p className="text-gray-900 font-semibold text-sm">
              {review.projectDetails.duration}
            </p>
            <p className="text-gray-500 text-xs">Duration</p>
          </div>
        </div>

        {/* Seller Response Section (collapsible) */}
        {review.sellerResponse.hasResponse && (
          <div className="mb-4">
            {/* Header row (clickable) */}
            <button
              aria-expanded={openResponse}
              onClick={() => setOpenResponse((s) => !s)}
              className="w-full flex items-center justify-between gap-4 px-4 py-3 rounded-lg bg-indigo-50/50 border border-indigo-100 hover:bg-indigo-50 transition-colors duration-200 ease-in-out" 
            >
              <div className="flex items-center gap-3">
                <img
                  src={review.sellerResponse.sellerAvatar}
                  alt={review.sellerResponse.sellerName || "Seller"}
                  className="w-8 h-8 rounded-full border border-gray-200 shadow-sm object-cover" 
                />
                <div className="text-left">
                  <div className="text-sm font-semibold text-gray-900">
                    Seller's Response
                  </div>
                  <div className="text-xs text-gray-500">
                    {review.sellerResponse.sellerName || ""}
                  </div>
                </div>
              </div>

              {/* chevron rotate */}
              <div
                className={`flex items-center transition-transform duration-300 ease-in-out ${
                  openResponse ? "rotate-180" : "rotate-0"
                }`}
              >
                <ChevronDown className="w-5 h-5 text-gray-500" />
              </div>
            </button>

            {/* Collapsible content: animated height + fade */}
            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                openResponse ? "max-h-[500px] opacity-100 mt-3" : "max-h-0 opacity-0"
              }`} 
              aria-hidden={!openResponse}
            >
              <div className="pl-4 ml-2 border-l-4 border-indigo-200 bg-gray-50 rounded-r-lg p-4">
                <p className="text-gray-600 text-sm leading-relaxed">
                  {review.sellerResponse.responseText}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Footer: Helpful Action */}
        <div className="flex items-center gap-4 mt-2">
          <span className="text-sm font-semibold text-gray-900">Helpful?</span>
          <button
            onClick={() => setIsHelpful(!isHelpful)}
            className={`flex items-center gap-1.5 text-sm transition-colors ${
              isHelpful ? "text-indigo-600 font-medium" : "text-gray-500 hover:text-gray-900"
            }`}
          >
            <ThumbsUp className="w-4 h-4" />
            <span>Yes</span>
          </button>
          <button className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors">
            <ThumbsDown className="w-4 h-4" />
            <span>No</span>
          </button>

          {review.helpfulCount > 0 && (
            <span className="text-gray-400 text-sm ml-auto">
              {isHelpful ? review.helpfulCount + 1 : review.helpfulCount} people found this review helpful
            </span>
          )}
        </div>
      </div>
    </div>
  );
}; 

export default function ReviewSection() {
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 10;
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);

  return (
    <div className=" py-8 md:py-12 px-0"> {/* Light gray background like Fiverr, responsive padding */}
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 md:mb-8">Client Reviews</h2> {/* Added heading for realism */}
        <div className="space-y-6 md:space-y-8"> {/* Added spacing */}
          {currentReviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
        {/* Pagination Controls */}
        <div className="flex items-center justify-center mt-8 gap-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 rounded-md bg-white border border-gray-300 hover:bg-gray-100 disabled:opacity-50"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`px-4 py-2 rounded-md ${
                currentPage === index + 1
                  ? "bg-indigo-600 text-white"
                  : "bg-white border border-gray-300 hover:bg-gray-100"
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 rounded-md bg-white border border-gray-300 hover:bg-gray-100 disabled:opacity-50"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );
}