import React, { useContext } from "react";
import { AuthContext } from "../../shared/context/auth-context";
import Business from "./Business";

interface BusinessListProps {
  dashboard: boolean;
  landing: boolean;
  businesses: {
    _id: string;
    name: string;
    image: string;
    rating: number;
    users: [string];
    location: {
      lat: number;
      lng: number;
    };
  }[];
}

const BusinessList: React.FC<BusinessListProps> = (props) => {
  const auth = useContext(AuthContext);

  if (props.businesses === undefined) {
    return <h2>No businesses found</h2>;
  }
  return (
    <ul>
      {props.businesses.map((business) => (
        <Business
          key={business._id}
          businessId={business._id}
          name={business.name}
          image={business.image}
          rating={business.rating}
          location={business.location}
          dashboard={props.dashboard}
          landing={props.landing}
          saved={auth.userId ? business.users.includes(auth.userId) : false}
        />
      ))}
    </ul>
  );
};

export default BusinessList;
