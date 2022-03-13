import React, { useState, useContext } from "react";

import { AuthContext } from "../../context/auth-context";

interface PromotionProps {
  key: string;
  id: string;
  eventDate: string;
  eventLink: string;
}

const Promotion: React.FC<PromotionProps> = (props) => {
  const auth = useContext(AuthContext);

  return (
    <li>
      <p>{props.eventDate}</p>
      <img src={props.eventLink} alt="event" style={{ width: 400 }} />
    </li>
  );
};

export default Promotion;
