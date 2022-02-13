import React from "react";

const RatingForm = () => {
  const ratingMenu = [5, 4, 3, 2, 1].map((ratingSelection, index) => {
    return (
      <>
        <input
          type="radio"
          onChange={() => console.log("selected", ratingSelection)}
          id={`rating-${ratingSelection}`}
        />
      </>
    );
  });

  return <>{ratingMenu}</>;
};

export default RatingForm;
