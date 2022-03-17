import React from "react";

import styled from "styled-components";

const Header = styled.header`
  background-image: url(https://offloadmedia.feverup.com/secretldn.com/wp-content/uploads/2018/03/18144114/DOG-COCKTAILS-Smith-Whistle-Max-dog-cocktail-menu-launch-for-National-Pet-Month.-4-e1522169808705-scaled.jpg);
  background-size: cover;
  background-position: 0, -250px;
  height: 400px;
  display: flex;
`;

const MainHeader: React.FC = (props) => {
  return <Header>{props.children}</Header>;
};

export default MainHeader;
