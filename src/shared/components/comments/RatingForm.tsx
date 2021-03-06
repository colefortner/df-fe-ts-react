import React, { useState } from "react";
import styled from "styled-components";
import PawRatingUntouched from "../UIElements/Paws/PawRatingUntouched";
import PawRatingHovered from "../UIElements/Paws/PawRatingHovered";
import PawRatingSelected from "../UIElements/Paws/PawRatingSelected";

const RatingBox = styled.div`
  background: #fff;
  display: flex;
  justify-content: left;
  flex-direction: row-reverse;

  input {
    display: none;
  }

  label {
    cursor: pointer;
    width: 1.9rem;
    height: 1.7rem;
    background-image: url("data:image/svg+xml;charset=UTF-8,${PawRatingUntouched}");
    background-repeat: no-repeat;
    // background-position: center;
    background-size: 80%;
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
interface RatingProps {
  childCallback: (something: number | undefined) => void;
}

const RatingForm: React.FC<RatingProps> = (props) => {
  const [review, setReview] = useState<undefined | number>();

  const setRating = (
    ratingSelection: number,
    event: React.MouseEvent<HTMLLabelElement>
  ) => {
    event.preventDefault();
    setReview(ratingSelection);
    props.childCallback(ratingSelection);
    // debugger;
    // console.log(review);
  };

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    fetch("http://localhost:5050/ratings", {
      method: "POST",
      body: JSON.stringify({
        rating: review,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  const ratingMenu = [5, 4, 3, 2, 1].map((ratingSelection, index) => {
    return (
      <>
        <input
          type="radio"
          value={ratingSelection}
          checked={review === ratingSelection}
          onChange={() => console.log("selected", ratingSelection)}
          id={`rating-${ratingSelection}`}
        />
        <label onClick={setRating.bind(this, ratingSelection)}></label>
      </>
    );
  });

  return (
    <form onSubmit={submitHandler}>
      <RatingBox>{ratingMenu}</RatingBox>
      {/* <button type="submit">Submit Rating</button> */}
    </form>
  );
};
export default RatingForm;
