import React from "react";

import MainHeader from "./MainHeader";
import NavLinks from "./NavLinks";

const MainNavigation: React.FC = () => {
  return (
    <div style={{ margin: "0px" }}>
      <MainHeader>
        <NavLinks />
      </MainHeader>
    </div>
  );
};

export default MainNavigation;
