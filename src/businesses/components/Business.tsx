import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Rating from "../../shared/components/UIElements/Rating";
import { AuthContext } from "../../shared/context/auth-context";
import { ThemeContext } from "../../shared/context/theme-context";
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
  border: 2px solid black;
  border-radius: 6px;
  padding: 10px;
  height: 400px;
  width: 275px;
  margin: 20px;
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
  height: 200px;
  border-radius: 10px;
  margin-top: 8px;
  margin-bottom: 8px;
`;

const RatingContainer = styled.div``;

const Business: React.FC<BusinessProps> = (props) => {
  const auth = useContext(AuthContext);
  const theme = useContext(ThemeContext);
  const [isDashboard, setIsDashboard] = useState<Boolean>();
  const [isLanding, setIsLanding] = useState<Boolean>();
  const [isSaved, setIsSaved] = useState<Boolean>();

  console.log("Theme", theme);

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
          },
        }}
      >
        {/* <h2>Business Number: {props.businessId}</h2> */}
        <h2>{props.name}</h2>
        <Image src={props.image} alt={props.name} style={{ width: 200 }} />
        <RatingContainer>
          <Rating rating={props.rating} />
        </RatingContainer>
      </BusinessCardLink>
      {isLanding && !isSaved && auth.isLoggedIn && (
        <button onClick={submitHandler}>Add Business to Dashboard</button>
      )}
      {isDashboard && isSaved && (
        <button onClick={deleteHandler}>Delete Business From Dashboard</button>
      )}
    </BusinessCard>
  );
};

export default Business;
