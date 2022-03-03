import React from "react";
import Business from "./Business";

interface BusinessListProps {
  businesses: {
    id: string;
    name: string;
    image: string;
    rating: number;
    location: {
      lat: number;
      lng: number;
    };
  }[];
}

const BusinessList: React.FC<BusinessListProps> = (props) => {
  if (props.businesses === undefined) {
    return <h2>No businesses found</h2>;
  }
  return (
    <ul>
      {props.businesses.map((business) => (
        <Business
          key={business.id}
          businessId={business.id}
          name={business.name}
          image={business.image}
          rating={business.rating}
          location={business.location}
        />
      ))}
    </ul>
  );
};

export default BusinessList;
