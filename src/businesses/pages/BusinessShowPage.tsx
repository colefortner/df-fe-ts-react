import React, { useState, useContext } from "react";
import { useParams, useLocation } from "react-router-dom";
import styled from "styled-components";

import { ThemeContext } from "../../shared/context/theme-context";

import Rating from "../../shared/components/UIElements/Rating";
import Comments from "../../shared/components/comments/Comments";
import Promotions from "../../shared/components/promotions/Promotions";
// import RatingForm from "../../shared/components/comments/RatingForm";
import Map from "../../shared/components/UIElements/Maps/Map";

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
    location: {
      lat: number;
      lng: number;
    };
    comments: {
      userId: string;
      comment: string;
    }[];
  };
}

const Title = styled.h1`
  font-size: 30px;
  // background: blue;
  font-family: ${(props) => props.theme.fonts.body};
  font-size: ${(props) => props.theme.fontSizes.h2};
  margin-bottom: ${(props) => props.theme.space[3]};
  margin-top: ${(props) => props.theme.space[3]};
  margin-left: ${(props) => props.theme.space[5]};
`;

const TopContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: ${(props) => props.theme.space[5]};
`;

const Image = styled.img`
  width: 500px;
  border-radius: 10px;
  diplay: inline-block;
`;

const ContactHours = styled.div`
  margin-left: ${(props) => props.theme.space[4]};
`;

const WebAddress = styled.a`
  color: inherit;
  text-decoration: none;
  font-size: 28px;
  font-weight: bold;
  display: block;
  margin-bottom: ${(props) => props.theme.space[3]};
`;

const Phone = styled.div`
  font-size: 25px;
  margin-top: ${(props) => props.theme.space[3]};
  p {
    margin-left: ${(props) => props.theme.space[3]};
  }

  h2 {
    font-size: 25px;
    margin-bottom: ${(props) => props.theme.space[3]};
  }
`;

const Address = styled.div`
  font-size: 25px;
  margin-bottom: ${(props) => props.theme.space[3]};

  p {
    margin-left: ${(props) => props.theme.space[3]};
  }

  h2 {
    font-size: 25px;
    margin-bottom: ${(props) => props.theme.space[3]};
  }
`;

const Hours = styled.div`
  margin-top: ${(props) => props.theme.space[3]};

  h2 {
    font-size: 25px;
    margin-bottom: ${(props) => props.theme.space[3]};
  }

  p {
    margin-left: ${(props) => props.theme.space[3]};
    font-size: 25px;
  }
`;

const MapContainer = styled.div`
  width: 400px;
  height: 330px;
  margin-left: ${(props) => props.theme.space[4]};
`;

const CommentsPromotionsContainer = styled.div`
  display: flex;
  width: 100%;
`;

const CommentsContainer = styled.div`
  margin-top: ${(props) => props.theme.space[4]};
  // margin-left: ${(props) => props.theme.space[5]};
  width: 50%;

  h2 {
    font-size: 25px;
    margin-bottom: ${(props) => props.theme.space[3]};
  }
`;

const CommentContainer = styled.div`
  margin-left: ${(props) => props.theme.space[3]};
`;

const PromotionsContainer = styled.div`
  margin-top: ${(props) => props.theme.space[4]};
  margin-left: ${(props) => props.theme.space[5]};

  h2 {
    font-size: 25px;
    margin-bottom: ${(props) => props.theme.space[3]};
  }
`;

const BusinessShowPage: React.FC = (props) => {
  const params = useParams();
  const location = useLocation();
  const state = location.state as Business;
  const { cardData } = state;

  const theme = useContext(ThemeContext);

  const [avgRating, setAvgRating] = useState(cardData.rating);
  const [length, setLength] = useState<number | undefined>();
  console.log(cardData.website);

  const getRatingUpdates = (avg: number, length: number) => {
    setAvgRating(avg);
    setLength(length);
  };

  const displayRating = (Math.round(avgRating * 100) / 100).toFixed(2);

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  const newDay = new Date();
  const dayName = newDay.getDay();

  // const day = daysOfWeek[dayName];
  // const hours = newDay.getHours();
  // const minutes = newDay.getMinutes();

  // console.log(props.hours[dayName].open);

  const convertTime = (militaryHrs: string, militaryMin: string) => {
    if (militaryHrs === "closed") {
      return "Closed";
    }
    if (Number(militaryHrs) > 12) {
      if (Number(militaryHrs) === 24) {
        return `${Number(militaryHrs) - 12}:${militaryMin} AM`;
      }
      if (Number(militaryHrs) > 24) {
        return `${Number(militaryHrs) - 24}:${militaryMin} AM`;
      }
      return `${Number(militaryHrs) - 12}:${militaryMin} PM`;
    } else if (Number(militaryHrs) === 12) {
      return `${militaryHrs}:${militaryMin} PM`;
    }
    return `${militaryHrs}:${militaryMin} AM`;
  };
  console.log(cardData.hours);

  const hoursData = cardData.hours.map((hour) => {
    const openthrowaway = hour.open.split(":");
    const closethrowaway = hour.close.split(":");

    const [openhours, openminutes] = openthrowaway;
    const [closehours, closeminutes] = closethrowaway;

    return [
      hour.day,
      convertTime(openhours, openminutes),
      convertTime(closehours, closeminutes),
    ];
  });

  return (
    <>
      {/* <p>{params.businessId}</p> */}
      <Title>{cardData.name}</Title>
      <TopContainer>
        <Image src={cardData.image} alt={`${cardData.name}`} />
        <ContactHours>
          <WebAddress href={`https://www.${cardData.website}`}>
            {cardData.website}
          </WebAddress>
          <Rating rating={avgRating} />
          {!length ? (
            <p>No reviews yet</p>
          ) : (
            <p>
              {displayRating} out of {length} reviews
            </p>
          )}
          <Phone>
            <h2>Phone</h2>
            <p>{cardData.phone}</p>
          </Phone>

          <Hours>
            <h2>Hours</h2>
            {hoursData.map((hour) => (
              <div style={{ display: "flex" }}>
                <p style={{ width: "45px" }}>{hour[0]}</p>
                {hour[1] === "Closed" ? (
                  <p>Closed</p>
                ) : (
                  <p>
                    {hour[1]} - {hour[2]}
                  </p>
                )}
              </div>
            ))}
          </Hours>
        </ContactHours>
        <MapContainer>
          <Address>
            <h2>Address</h2>

            <p>{cardData.address.street}</p>
            <p>
              {cardData.address.city}, {cardData.address.state}{" "}
              {cardData.address.zip}
            </p>
          </Address>
          <Map center={cardData.location} zoom={15} />
        </MapContainer>
        <CommentsPromotionsContainer>
          <CommentsContainer>
            <h2>Reviews</h2>
            <CommentContainer>
              <Comments
                businessId={cardData.businessId}
                getRatingUpdate={getRatingUpdates}
              />
            </CommentContainer>
          </CommentsContainer>
          {/* <RatingForm /> */}
          <PromotionsContainer>
            <h2 style={{ fontSize: "25px" }}>Events/Promotions</h2>
            <div style={{ marginLeft: "8px" }}>
              <Promotions businessId={params.businessId} />
            </div>
          </PromotionsContainer>
        </CommentsPromotionsContainer>
      </TopContainer>

      <a href="https://www.flaticon.com/free-icons/paw" title="paw icons">
        Paw icon used as google map marker created by deemakdaksina - Flaticon
      </a>
    </>
  );
};

export default BusinessShowPage;
