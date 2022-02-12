import React from "react";
import { useParams, useLocation } from "react-router-dom";
import Rating from "../../shared/components/UIElements/Rating";
import CommentForm from "../../shared/components/comments/ComentForm";

interface Business {
  cardData: {
    key: string;
    businessId: string;
    name: string;
    image: string;
    rating: number;
  };
}

const BusinessShowPage: React.FC = () => {
  const params = useParams();
  const location = useLocation();
  const state = location.state as Business;
  const { cardData } = state;
  // console.log(cardData);

  return (
    <>
      <p>{params.businessId}</p>
      <p>{cardData.name}</p>
      <img src={cardData.image} alt={cardData.name} style={{ width: 200 }} />
      <Rating rating={cardData.rating} />
      <CommentForm />
    </>
  );
};

export default BusinessShowPage;
