import React from "react";
import { Link } from "react-router-dom";
import Rating from "../../shared/components/UIElements/Rating";

interface BusinessProps {
  key: string;
  businessId: string;
  name: string;
  image: string;
  rating: number;
}

const Business: React.FC<BusinessProps> = (props) => {
  return (
    <li>
      <Link to={`/${props.businessId}/businesses`} state={{ cardData: props }}>
        <h2>Business Number: {props.businessId}</h2>
        <h2>{props.name}</h2>
        <img src={props.image} alt={props.name} style={{ width: 200 }} />
        <Rating rating={props.rating} />
      </Link>
    </li>
  );
};

export default Business;
