import React, { useContext, useEffect, useState } from "react";
import Rating from "../../shared/components/UIElements/Rating";
import { AuthContext } from "../../shared/context/auth-context";
import { ThemeContext } from "../../shared/context/theme-context";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { v4 as uuidv4 } from "uuid";
import { BusinessProps } from "./business-interface";
import {
  BusinessCard,
  BusinessCardLink,
  Image,
  Phone,
  Open,
  SaveButton,
  DeleteButton,
  RestaurantName,
  Type,
  RatingContainer,
} from "./business-styles";

const Business: React.FC<BusinessProps> = (props) => {
  const auth = useContext(AuthContext);
  const theme = useContext(ThemeContext);
  const [isDashboard, setIsDashboard] = useState<Boolean>();
  const [isLanding, setIsLanding] = useState<Boolean>();
  const [isSaved, setIsSaved] = useState<Boolean>();

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  const newDay = new Date();
  const dayName = newDay.getDay();

  const day = daysOfWeek[dayName];
  const hours = newDay.getHours();
  const minutes = newDay.getMinutes();

  // console.log(props.hours[dayName].open);
  const openthrowaway = props.hours[dayName].open.split(":");
  const closethrowaway = props.hours[dayName].close.split(":");

  const [openhours, openminutes] = openthrowaway;
  const [closehours, closeminutes] = closethrowaway;

  const formatDate = (
    hours: number,
    minutes: number,
    openhours: string,
    openminutes: string,
    closehours: string,
    closeminutes: string
  ) => {
    let output;
    const openHrsConverted = Number(openhours);
    const openMinConverted = Number(openminutes);
    const closeHrsConverted = Number(closehours);
    const closeMinConverted = Number(closeminutes);
    if (openhours === "closed") {
      return false;
    }
    if (
      (hours > openHrsConverted && hours < closeHrsConverted) ||
      (hours === openHrsConverted && minutes >= openMinConverted) ||
      (hours === closeHrsConverted && minutes < closeMinConverted)
    ) {
      output = true;
    } else {
      output = false;
    }
    return output;
  };

  const convertTime = (militaryHrs: string, militaryMin: string) => {
    if (militaryHrs === "closed") {
      return;
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

  const isOpen = formatDate(
    hours,
    minutes,
    openhours,
    openminutes,
    closehours,
    closeminutes
  );

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
            location: props.location,
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
            <Type key={uuidv4()}>{item}</Type>
          ))}
        </div>
        <Phone>{props.phone}</Phone>
        <Open>
          {isOpen && (
            <p>
              <span style={{ color: "green" }}>Open</span> until{" "}
              {convertTime(closehours, closeminutes)}
            </p>
          )}
          {!isOpen && (
            <p>
              <span style={{ color: "red" }}>Closed</span>
            </p>
          )}
        </Open>
      </BusinessCardLink>
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
