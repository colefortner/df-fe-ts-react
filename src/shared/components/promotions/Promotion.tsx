import React, { useState, useContext } from "react";

import { AuthContext } from "../../context/auth-context";
import styled from "styled-components";

interface PromotionProps {
  // key: string;
  id: string;
  eventDate: string;
  eventLink: string;
}

const PromotionCard = styled.li`
  margin-top: 30px;
`;

const EventDate = styled.p`
  font-size: 20px;
  font-weight: bold;
`;

const Promotion: React.FC<PromotionProps> = (props) => {
  const auth = useContext(AuthContext);

  return (
    <PromotionCard>
      <EventDate>{props.eventDate}</EventDate>
      <img src={props.eventLink} alt="event" style={{ width: 400 }} />
      <hr></hr>
    </PromotionCard>
  );
};

export default Promotion;
