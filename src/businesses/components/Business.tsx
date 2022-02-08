import React from "react";

interface BusinessProps {
  key: string;
  name: string;
  image: string;
}

const Business: React.FC<BusinessProps> = (props) => {
  return <h1>{props.name}</h1>;
};

export default Business;
