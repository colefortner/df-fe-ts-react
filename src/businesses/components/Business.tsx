import React from "react";

interface BusinessProps {
  key: string;
  businessId: string;
  name: string;
  image: string;
}

const Business: React.FC<BusinessProps> = (props) => {
  return (
    <>
      <h2>Business Number: {props.businessId}</h2>
      <h2>{props.name}</h2>
      <img src={props.image} alt={props.name} style={{ width: 200 }} />
    </>
  );
};

export default Business;
