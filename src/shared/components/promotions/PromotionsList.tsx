import React from "react";
import Promotion from "./Promotion";
import styled from "styled-components";

const PromotionsContainer = styled.ul`
  list-style: none;
  text-align: center;
  height: 500px;
  width: 425px;
  overflow-y: auto;
`;

interface PromotionsListProps {
  // businessId: string | undefined;
  promotions: {
    _id: string;
    eventDate: string;
    eventLink: string;
  }[];
}

const PromotionsList: React.FC<PromotionsListProps> = (props) => {
  if (props.promotions === undefined) {
    return <h2>No promotions yet</h2>;
  }
  return (
    <PromotionsContainer>
      {props.promotions.map((promotion, index) => (
        <>
          <Promotion
            key={promotion._id}
            eventDate={promotion.eventDate}
            id={promotion._id}
            eventLink={promotion.eventLink}
          />
        </>
      ))}
    </PromotionsContainer>
  );
};

export default PromotionsList;
