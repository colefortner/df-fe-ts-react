import React, { useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import Rating from "../../shared/components/UIElements/Rating";
import Comments from "../../shared/components/comments/Comments";
import Promotions from "../../shared/components/promotions/Promotions";
// import RatingForm from "../../shared/components/comments/RatingForm";
// import Map from "../../shared/components/UIElements/Maps/Map";

interface Business {
  cardData: {
    // key: string;
    businessId: string;
    name: string;
    image: string;
    address: {
      street: string;
      city: string;
      state: string;
      zip: number;
    };
    website: string;
    phone: string;
    hours: {
      day: string;
      open: string;
      close: string;
    }[];

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

  const [avgRating, setAvgRating] = useState(cardData.rating);
  const [length, setLength] = useState<number | undefined>();
  console.log(cardData.website);

  const getRatingUpdates = (avg: number, length: number) => {
    setAvgRating(avg);
    setLength(length);
  };

  return (
    <>
      <p>{params.businessId}</p>
      <p>{cardData.name}</p>
      <img src={cardData.image} alt={cardData.name} style={{ width: 200 }} />
      <a href={`https://www.${cardData.website}`}>{cardData.website}</a>
      <div>{cardData.phone}</div>

      <div>
        <div>
          <h2>Hours</h2>
          {cardData.hours.map((hour) => (
            <p>
              {hour.day} {hour.open} - {hour.close}
            </p>
          ))}
        </div>
        <p>{cardData.address.street}</p>
        <p>
          {cardData.address.city}, {cardData.address.state}{" "}
          {cardData.address.zip}
        </p>
      </div>
      <Rating rating={avgRating} />
      <p>
        {avgRating} out of {length} reviews
      </p>
      <Comments
        businessId={cardData.businessId}
        getRatingUpdate={getRatingUpdates}
      />
      {/* <RatingForm /> */}
      {/* <div style={{ width: "400px", height: "400px" }}>
        <Map center={cardData.location} zoom={10} />
      </div> */}
      <Promotions businessId={params.businessId} />
    </>
  );
};

export default BusinessShowPage;
