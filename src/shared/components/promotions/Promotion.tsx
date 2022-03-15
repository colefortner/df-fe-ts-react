import React, { useState, useContext } from "react";

import { AuthContext } from "../../context/auth-context";
import styled from "styled-components";

interface PromotionProps {
  key: string;
  id: string;
  eventDate: string;
  eventLink: string;
}

const PromotionCard = styled.li`
  margin-top: 20px;
`;

const Promotion: React.FC<PromotionProps> = (props) => {
  const auth = useContext(AuthContext);

  return (
    <PromotionCard>
      <p>{props.eventDate}</p>
      <img src={props.eventLink} alt="event" style={{ width: 400 }} />
    </PromotionCard>
  );
};

export default Promotion;
