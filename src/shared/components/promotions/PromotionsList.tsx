import React from "react";
import Promotion from "./Promotion";

interface PromotionsListProps {
  businessId: string | undefined;
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
    <ul>
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
    </ul>
  );
};

export default PromotionsList;
