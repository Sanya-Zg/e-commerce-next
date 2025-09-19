'use client';
import { StarIcon } from 'lucide-react';
import { useState } from 'react';

const Rating = () => {
  const [rating, setRating] = useState<number>(0);
  const [hover, setHover] = useState<number>(0);

  const handleClick = (currIndex: number) => {
    setRating(currIndex);
  };

  const handleMouseEnter = (currIndex: number) => {
    setHover(currIndex);
  };

  const handleMouseLeave = () => {
    setHover(rating);
  };

  return (
    <div className="flex">
      {[...Array(5)].map((_, index) => {
        index += 1;
        return (
          <StarIcon
            key={index}
            className="text-brown_dark"
            fill={index <= (hover || rating) ? '#B88E2F' : 'white'}
            onClick={() => handleClick(index)}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          />
        );
      })}
    </div>
  );
};
export default Rating;
