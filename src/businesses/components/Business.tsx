import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Rating from "../../shared/components/UIElements/Rating";
import { AuthContext } from "../../shared/context/auth-context";

interface BusinessProps {
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

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    fetch("http://localhost:5050/users/save-business", {
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
    fetch("http://localhost:5050/users/delete-business/1", {
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
      <button onClick={submitHandler}>Add Business to Dashboard</button>
      <button onClick={deleteHandler}>Delete Business From Dashboard</button>
    </li>
  );
};

export default Business;
