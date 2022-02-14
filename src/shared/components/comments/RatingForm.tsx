import React from "react";
import styled from "styled-components";
import PawRatingUntouched from "../UIElements/Paws/PawRatingUntouched";
import PawRatingHovered from "../UIElements/Paws/PawRatingHovered";
import PawRatingSelected from "../UIElements/Paws/PawRatingSelected";

const RatingBox = styled.div`
  background: #fff;
  display: flex;
  justify-content: center;
  flex-direction: row-reverse;
  position: relative;
  margin-top: 12px;

  input {
    display: none;
  }

  label {
    cursor: pointer;
    width: 40px;
    height: 40px;
    background-image: url("data:image/svg+xml;charset=UTF-8,${PawRatingUntouched}");
    background-repeat: no-repeat;
    background-position: center;
    background-size: 70%;
  }

  input: checked ~ label,
  input: checked ~ label ~ label {
    background-image: url("data:image/svg+xml;charset=UTF-8,${PawRatingSelected}");
  }

  input:not(:checked) ~ label:hover,
  input:not(:checked) ~ label:hover ~ label {
  background-image: url("data:image/svg+xml;charset=UTF-8,${PawRatingHovered}");
  }
`;

const RatingForm: React.FC = () => {
  const ratingMenu = [5, 4, 3, 2, 1].map((ratingSelection, index) => {
    return (
      <>
        <input
          type="radio"
          onChange={() => console.log("selected", ratingSelection)}
          id={`rating-${ratingSelection}`}
        />
        <label></label>
      </>
    );
  });

  return <RatingBox>{ratingMenu}</RatingBox>;
};

export default RatingForm;
