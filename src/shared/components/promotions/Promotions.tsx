import React, { useState, useEffect, useContext } from "react";

import { AuthContext } from "../../context/auth-context";
import PromotionsList from "./PromotionsList";

interface PromotionsProps {
  businessId: string | undefined;
}

const Promotions: React.FC<PromotionsProps> = (props) => {
  const auth = useContext(AuthContext);
  const [promotionsData, setPromotionsData] = useState<any[]>([]);

  useEffect(() => {
    fetch(`http://localhost:5050/promotions/${props.businessId}`)
      .then((res) => res.json())
      .then((data) => {
        setPromotionsData(data.promotions);
        console.log(data);
      });
  }, []);

  console.log(promotionsData);

  return (
    <>
      <PromotionsList
        // businessId={props.businessId}
        promotions={promotionsData}
      />
    </>
  );
};

export default Promotions;
