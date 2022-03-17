import React, { useContext } from "react";
import { AuthContext } from "../../shared/context/auth-context";
import Business from "./Business";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";

interface BusinessListProps {
  dashboard: boolean;
  landing: boolean;
  removeBusinessFromDashboard: (id: string | any) => void;

  businesses: {
    _id: string;
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
    type: [string];
    users: [string];
    location: {
      lat: number;
      lng: number;
    };
  }[];
}

const BusinessCardsContainer = styled.ul`
  justify-content: center;
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  list-style: none;
`;

const BusinessList: React.FC<BusinessListProps> = (props) => {
  const auth = useContext(AuthContext);

  if (props.businesses === undefined) {
    return <h2>No businesses found</h2>;
  }
  return (
    <BusinessCardsContainer>
      {props.businesses.map((business) => (
        <Business
          key={uuidv4()}
          businessId={business._id}
          name={business.name}
          image={business.image}
          rating={business.rating}
          address={business.address}
          website={business.website}
          phone={business.phone}
          hours={business.hours}
          location={business.location}
          type={business.type}
          dashboard={props.dashboard}
          landing={props.landing}
          saved={auth.userId ? business.users.includes(auth.userId) : false}
          removeBusinessFromDashboard={props.removeBusinessFromDashboard}
        />
      ))}
    </BusinessCardsContainer>
  );
};

export default BusinessList;
