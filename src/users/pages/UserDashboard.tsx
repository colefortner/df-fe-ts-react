import React, { useState, useEffect, useContext } from "react";
import BusinessList from "../../businesses/components/BusinessList";
import { AuthContext } from "../../shared/context/auth-context";
import PromotionsList from "../../shared/components/promotions/PromotionsList";
import styled from "styled-components";

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
  const auth = useContext(AuthContext);
  console.log(auth.userId);

  const username = auth.username![0].toUpperCase() + auth.username!.slice(1);

  useEffect(() => {
    fetch(`http://localhost:5050/dashboard/${auth.userId}`)
      .then((res) => res.json())
      .then((data) => {
        setBusinessData(data.businesses);
        // console.log(data.businesses);
      });
  }, []);

  const removeBusinessCardFromDashboard = (businessId: string) => {
    setBusinessData((prevState) => {
      const businesses = prevState.filter(
        (business) => business._id !== businessId
      );
      return businesses;
    });
  };

  const getPromotionsData = (data: any) => {
    let newArr: any = [];

    data.forEach((item: { promotions: any[] }) =>
      newArr.push(...item.promotions)
    );
    setPromotionsData(newArr);
    return newArr;
  };

  useEffect(() => {
    getPromotionsData(businessData);
  }, [businessData]);

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
