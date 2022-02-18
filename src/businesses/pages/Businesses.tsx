import React, { useState, useEffect } from "react";

import BusinessList from "../components/BusinessList";

const Businesses: React.FC = () => {
  const [businessesData, setBusinessesData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5050/businesses")
      .then((res) => res.json())
      .then((data) => setBusinessesData(data.businesses));
  }, []);

  return <BusinessList businesses={businessesData} />;
};

export default Businesses;
