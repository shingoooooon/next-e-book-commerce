import React from 'react';

type StarRatingProps = {
  rating: number;
};

const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
  const totalStars = 5;
  const stars = [];

  for (let i = 0; i < totalStars; i++) {
    if (i < Math.floor(rating)) {
      stars.push(<span key={i} className="text-yellow-500">★</span>);
    } else if (i < rating) {
      stars.push(<span key={i} className="text-yellow-500">☆</span>);
    } else {
      stars.push(<span key={i} className="text-gray-400">☆</span>);
    }
  }

  return <div className="text-md text-slate-700">{stars}</div>;
};

export default StarRating;