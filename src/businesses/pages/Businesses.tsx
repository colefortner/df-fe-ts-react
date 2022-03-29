import React, { useState, useEffect } from "react";
import styled from "styled-components";

import BusinessList from "../components/BusinessList";
import PromotionsList from "../../shared/components/promotions/PromotionsList";

const Businesses: React.FC = () => {
  const [businessesData, setBusinessesData] = useState([]);
  const [promotionsData, setPromotionsData] = useState<any[]>([]);
  const [barData, setBarData] = useState([]);

  const PromotionsContainer = styled.div`
    list-style: none;
    text-align: center;
    height: 500px;
    width: 425px;
    overflow-y: auto;
  `;

  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const res = await fetch("http://localhost:5050/businesses");
        const data = await res.json();
        setBusinessesData(data.businesses);
        // console.log(data.businesses);
      } catch (err) {
        console.log(err);
      }
    };
    fetchBusinesses();
  }, []);

  const getPromotionsData = (data: any) => {
    let newArr: any = [];

    data.forEach((item: { promotions: any[] }) =>
      newArr.push(...item.promotions)
    );
    setPromotionsData(newArr);
    return newArr;
  };
  // console.log(businessesData[1].);

  const getBarData = (data: any) => {
    let bar = data.filter((item: { type: any[] }) => item.type.includes("bar"));
    setBarData(bar);
  };

  useEffect(() => {
    getPromotionsData(businessesData);
    getBarData(businessesData);
  }, [businessesData]);

  // console.log(barData);

  return (
    <>
      <BusinessList
        businesses={businessesData}
        dashboard={false}
        landing={true}
        removeBusinessFromDashboard={(id: any) => {}}
      />
      <PromotionsContainer>
        <PromotionsList promotions={promotionsData} />
      </PromotionsContainer>
    </>
  );
};

export default Businesses;
