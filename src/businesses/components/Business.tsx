import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Rating from "../../shared/components/UIElements/Rating";
import { AuthContext } from "../../shared/context/auth-context";
import { ThemeContext } from "../../shared/context/theme-context";

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
    <li>
      <Link
        to={`/${props.businessId}/businesses`}
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
        <h2>Business Number: {props.businessId}</h2>
        <h2
          style={{
            color: theme.colors.brand.primary,
            fontFamily: theme.fonts.fancy,
            fontSize: theme.fontSizes.h1,
            fontWeight: 100,
            fontStyle: "italic",
          }}
        >
          {props.name}
        </h2>
        <img src={props.image} alt={props.name} style={{ width: 200 }} />
        <Rating rating={props.rating} />
      </Link>
      {isLanding && !isSaved && auth.isLoggedIn && (
        <button onClick={submitHandler}>Add Business to Dashboard</button>
      )}
      {isDashboard && isSaved && (
        <button onClick={deleteHandler}>Delete Business From Dashboard</button>
      )}
    </li>
  );
};

export default Business;
