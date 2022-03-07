import React from "react";
import { useParams, useLocation } from "react-router-dom";
import Rating from "../../shared/components/UIElements/Rating";
import Comments from "../../shared/components/comments/Comments";
// import RatingForm from "../../shared/components/comments/RatingForm";
// import Map from "../../shared/components/UIElements/Maps/Map";

interface Business {
  cardData: {
    // key: string;
    businessId: string;
    name: string;
    image: string;
    rating: number;
    // location: {
    //   lat: number;
    //   lng: number;
    // };
    comments: {
      userId: string;
      comment: string;
    }[];
  };
}

const BusinessShowPage: React.FC = () => {
  const params = useParams();
  const location = useLocation();
  const state = location.state as Business;
  const { cardData } = state;

  return (
    <>
      <p>{params.businessId}</p>
      <p>{cardData.name}</p>
      <img src={cardData.image} alt={cardData.name} style={{ width: 200 }} />
      <Rating rating={cardData.rating} />
      <Comments businessId={cardData.businessId} />
      {/* <RatingForm /> */}
      {/* <div style={{ width: "400px", height: "400px" }}>
        <Map center={cardData.location} zoom={10} />
      </div> */}
    </>
  );
};

export default BusinessShowPage;
