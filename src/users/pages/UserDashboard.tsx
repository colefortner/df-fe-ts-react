import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";

import { AuthContext } from "../../shared/context/auth-context";

import BusinessList from "../../businesses/components/BusinessList";
import PromotionsList from "../../shared/components/promotions/PromotionsList";

const Title = styled.h1`
  font-size: 50px;
  text-align: center;
`;

const PromotionsContainer = styled.div`
  list-style: none;
  text-align: center;
  height: 500px;
  width: 425px;
  overflow-y: auto;
`;

const Users: React.FC = () => {
  const [businessData, setBusinessData] = useState<any[]>([]);
  const [promotionsData, setPromotionsData] = useState<any[]>([]);
  const [username, setUsername] = useState<any>("");
  const auth = useContext(AuthContext);

  useEffect(() => {
    fetch(`http://localhost:5050/dashboard/${auth.userId}`)
      .then((res) => res.json())
      .then((data) => {
        setBusinessData(data.businesses);
        const username =
          auth.username![0].toUpperCase() +
          auth.username!.toLowerCase().slice(1);
        setUsername(username);
        getPromotionsData(data.businesses);
      });
  }, [auth]);

  const removeBusinessCardFromDashboard = (businessId: string) => {
    setBusinessData((prevState) => {
      const businesses = prevState.filter(
        (business) => business._id !== businessId
      );
      return businesses;
    });
  };

  useEffect(() => {
    getPromotionsData(businessData);
  }, [businessData]);

  const getPromotionsData = async (data: any) => {
    let newArr: any = [];

    await data.forEach((item: { promotions: any[] }) =>
      newArr.push(...item.promotions)
    );
    setPromotionsData(newArr);
    return newArr;
  };

  return (
    <div>
      <Title>{username}'s Dashboard</Title>
      <BusinessList
        businesses={businessData}
        dashboard={true}
        landing={false}
        removeBusinessFromDashboard={removeBusinessCardFromDashboard}
      />
      <PromotionsContainer>
        <PromotionsList promotions={promotionsData} />
      </PromotionsContainer>
      <h2>Friends Checked in ?</h2>
    </div>
  );
};

export default Users;
