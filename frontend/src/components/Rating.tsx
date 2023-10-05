import React from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

export const Rating = ({ rating }: { rating: number }) => {
  return (
    <span>
      {Array(5)
        .fill(0)
        .map((el, index) =>
          rating < index + 1 ? (
            <AiOutlineStar key={index} size={20} />
          ) : (
            <AiFillStar key={index} color="orange" size={20} />
          )
        )}({rating.toFixed(2)})
    </span>
  );
};
