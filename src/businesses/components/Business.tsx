import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Rating from "../../shared/components/UIElements/Rating";
import { AuthContext } from "../../shared/context/auth-context";
import { ThemeContext } from "../../shared/context/theme-context";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import styled from "styled-components";

interface BusinessProps {
  removeBusinessFromDashboard: (id: string) => void;

  saved: boolean;
  dashboard: boolean;
  landing: boolean;
  key: string;
  businessId: string;
  name: string;
  image: string;
  rating: number;
  address: {
    street: string;
    city: string;
    state: string;
    zip: number;
  };
  type: [string];
  website: string;
  phone: string;
  hours: {
    day: string;
    open: string;
    close: string;
  }[];
  location: {
    lat: number;
    lng: number;
  };
}

const BusinessCard = styled.div`
  // border: 1px solid gray;
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
  border-radius: 6px;
  padding: 10px;
  height: 400px;
  width: 275px;
  margin: 10px;
  justify-content: center;
  text-align: center;
  display: flex;
  flex-wrap: wrap;
  font-weight: ${(props) => props.theme.fontWeights.medium};
  color: ${(props) => props.theme.colors.brand.primary};
`;

const BusinessCardLink = styled(Link)`
  text-decoration: none;
  font-size: ${(props) => props.theme.fontSizes.body};
  color: inherit;
  font-family: ${(props) => props.theme.fonts.body};
`;

const Image = styled.img`
  height: 225px;
  width: 225px;
  border-radius: 10px;
  margin-top: 8px;
  margin-bottom: 8px;
`;

const Phone = styled.div`
  margin-top: 5px;
  color: #445663;
`;

const Open = styled.div`
  margin-top: 5px;
  color: green;
`;

const SaveButton = styled.button`
  all: unset;
  position: absolute;
  font-size: 30px;
  margin-top: 45px;
  margin-left: 140px;
  color: white;
`;

const DeleteButton = styled.button`
  all: unset;
  position: absolute;
  font-size: 30px;
  margin-top: 45px;
  margin-left: 140px;
  color: red;
`;

const RestaurantName = styled.h2`
  color: #445663;
`;

const Type = styled.p`
  font-size: 12px;
  margin-top: 5px;
  margin-left: 8px;
  margin-right: 8px;
  color: #445663;
`;

const RatingContainer = styled.div`
  // color: white;
  color: #445663;
`;

const Business: React.FC<BusinessProps> = (props) => {
  const auth = useContext(AuthContext);
  const theme = useContext(ThemeContext);
  const [isDashboard, setIsDashboard] = useState<Boolean>();
  const [isLanding, setIsLanding] = useState<Boolean>();
  const [isSaved, setIsSaved] = useState<Boolean>();

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  let newDay = new Date();
  let dayName = newDay.getDay();
  console.log(newDay);
  console.log("DAY", daysOfWeek[dayName]);
  let day = daysOfWeek[dayName];
  // let hours = newDay.getHours();
  // let minutes = newDay.getMinutes();
  // console.log("hours", hours);
  // console.log("minutes", minutes);

  let openhours = 15;
  let openminutes = 30;

  let closehours = 22;
  let closeminutes = 30;

  // if (inhours > 12) {
  //   console.log(inhours - 12);
  // }
  let hours = 15;
  let minutes = 30;
  const formatDate = (
    hours: number,
    minutes: number,
    openhours: number,
    openminutes: number,
    closehours: number,
    closeminutes: number
  ) => {
    let output;
    console.log("hi", minutes > openminutes);
    if (
      (hours > openhours && hours < closehours) ||
      (hours === openhours && minutes >= openminutes) ||
      (hours === closehours && minutes < closeminutes)
    ) {
      output = "OPEN";
    } else {
      output = "CLOSED";
    }
    return output;
  };

  console.log(
    formatDate(hours, minutes, openhours, openminutes, closehours, closeminutes)
  );
  // console.log("Theme", theme);

  useEffect(() => {
    setIsDashboard(props.dashboard);
    setIsLanding(props.landing);
    setIsSaved(props.saved);
  }, []);

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    fetch("http://localhost:5050/dashboard/save-business", {
      method: "POST",
      body: JSON.stringify({
        businessId: props.businessId,
        userId: auth.userId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
    setIsSaved(true);
  };

  const deleteHandler = (event: React.FormEvent) => {
    event.preventDefault();
    fetch("http://localhost:5050/dashboard/delete-business/1", {
      method: "DELETE",
      body: JSON.stringify({
        businessId: props.businessId,
        userId: auth.userId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
    setIsSaved(false);
    props.removeBusinessFromDashboard(props.businessId);
  };

  return (
    <BusinessCard>
      <BusinessCardLink
        to={`/${props.businessId}/businesses`}
        // style={{ textDecoration: "none" }}
        state={{
          cardData: {
            // key: props.key,
            businessId: props.businessId,
            name: props.name,
            image: props.image,
            rating: props.rating,
            address: props.address,
            website: props.website,
            phone: props.phone,
            hours: props.hours,
            type: props.type,
          },
        }}
      >
        {/* <h2>Business Number: {props.businessId}</h2> */}
        <Image src={props.image} alt={props.name} />
        <RestaurantName>{props.name}</RestaurantName>

        <RatingContainer>
          <Rating rating={props.rating} />
        </RatingContainer>
        <div style={{ display: "flex", justifyContent: "center" }}>
          {props.type.map((item) => (
            <Type>{item}</Type>
          ))}
        </div>
        <Phone>{props.phone}</Phone>
        <Open>
          {/* {hours > inhours ? "OPEN" : "CLOSED"}{" "}
          {/* Open: {day} {props.hours[dayName].open} - {props.hours[dayName].close} */}
          {/* {inhours > 12 ? inhours - 12 : inhours}:{inmin}{" "} */}
          {/* {inhours >= 12 ? "PM" : "AM"} */}
        </Open>
      </BusinessCardLink>

      <br></br>
      {/* <div>Happy Hour</div> */}
      {/* <div>Outdoor dining Takeout Delivery</div> */}
      {!isSaved && auth.isLoggedIn && (
        <SaveButton onClick={submitHandler}>
          <AiOutlineHeart />
        </SaveButton>
      )}
      {isSaved && (
        <DeleteButton onClick={deleteHandler}>
          <AiFillHeart />
        </DeleteButton>
      )}
    </BusinessCard>
  );
};

export default Business;
