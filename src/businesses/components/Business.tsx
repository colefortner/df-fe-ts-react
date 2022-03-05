import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Rating from "../../shared/components/UIElements/Rating";
import { AuthContext } from "../../shared/context/auth-context";

interface BusinessProps {
  saved: boolean;
  dashboard: boolean;
  landing: boolean;
  key: string;
  businessId: string;
  name: string;
  image: string;
  rating: number;
  location: {
    lat: number;
    lng: number;
  };
}

const Business: React.FC<BusinessProps> = (props) => {
  const auth = useContext(AuthContext);
  const [isDashboard, setIsDashboard] = useState<Boolean>();
  const [isLanding, setIsLanding] = useState<Boolean>();
  const [isSaved, setIsSaved] = useState<Boolean>();

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
  };

  return (
    <li>
      <Link to={`/${props.businessId}/businesses`} state={{ cardData: props }}>
        <h2>Business Number: {props.businessId}</h2>
        <h2>{props.name}</h2>
        <img src={props.image} alt={props.name} style={{ width: 200 }} />
        <Rating rating={props.rating} />
      </Link>
      {isLanding && !isSaved && auth.isLoggedIn && (
        <button onClick={submitHandler}>Add Business to Dashboard</button>
      )}
      {isDashboard && (
        <button onClick={deleteHandler}>Delete Business From Dashboard</button>
      )}
    </li>
  );
};

export default Business;
