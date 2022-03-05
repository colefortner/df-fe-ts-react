import React, { useState, useEffect } from "react";

import BusinessList from "../components/BusinessList";

const Businesses: React.FC = () => {
  const [businessesData, setBusinessesData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5050/businesses")
      .then((res) => res.json())
      .then((data) => {
        setBusinessesData(data.businesses);
        console.log(data.businesses[1].users);
      });
  }, []);

  // console.log(businessesData[1].);

  return (
    <BusinessList
      businesses={businessesData}
      dashboard={false}
      landing={true}
    />
  );
};

export default Businesses;
