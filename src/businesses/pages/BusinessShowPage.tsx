import React from "react";
import { useParams, useLocation } from "react-router-dom";

interface Business {
  cardData: {
    key: string;
    businessId: string;
    name: string;
    image: string;
  };
}

const BusinessShowPage: React.FC = () => {
  const params = useParams();
  const location = useLocation();
  // const { businessCardData } = location.state;
  const state = location.state as Business;
  const { cardData } = state;
  console.log(cardData);

  return (
    <>
      <p>{params.businessId}</p>
      <p>{cardData.name}</p>
      <img src={cardData.image} alt={cardData.name} style={{ width: 200 }} />
    </>
  );
};

export default BusinessShowPage;
