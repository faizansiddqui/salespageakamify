import React from "react";
import { Star, StarHalf } from "lucide-react";
import "./ReviewsTab.css";

const ReviewsTab = ({ reviews }) => {
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="star full" fill="#ffc107" size={20} />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <StarHalf key="half" className="star half" fill="#ffc107" size={20} />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="star empty" size={20} />);
    }

    return stars;
  };

  return (
    <div className="reviews-section">
      <div className="reviews">
        {reviews.map((review) => (
          <div key={review.id} className="review">
            <div className="review-header">
              <h4>{review.user}</h4>
              <span className="country">{review.country}</span>
            </div>
            <div className="review-rating">
              {renderStars(review.rating)}
              <span className="date">{review.date}</span>
            </div>
            <p className="review-comment">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewsTab;
