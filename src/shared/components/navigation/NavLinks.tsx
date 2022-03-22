import { NavLink, useLocation } from "react-router-dom";
import { useContext } from "react";
import styled from "styled-components";

import { AuthContext } from "../../context/auth-context";
import { ThemeContext } from "../../context/theme-context";

import AdoptionSwiperCube from "../../components/adoption-cube/AdoptionSwiperCube";

const TitleContainer = styled.div`
  position: absolute;
  margin-top: 3vw;
  background-color: rgba(0, 0, 0, 0.5);
  height: 21vw;
  width: 46vw;
  border-radius: 100%;
  transform: rotate(-2.3deg);
  text-align: center;
  margin-left: 20px;
  border: 1px solid white;
`;

const Title = styled.h1`
  position: absolute;
  color: white;
  margin-left: 5vw;
  margin-top: 3vw;
  font-family: ${(props) => props.theme.fonts.body};
  font-size 6.5vw;
  padding: .5vw;
  border-radius: 100%;
`;

const SubTitle = styled.h2`
  position: absolute;
  color: white;
  margin-top: 10.5vw;
  margin-left: 2.5vw;
  font-weight: 200;
  font-family: ${(props) => props.theme.fonts.fancy};
  font-size: 3.3vw;
  // transform: rotate(-2.3deg);
`;

const ListContainer = styled.div`
  width: 100%;
  margin-top: 25px;
  margin-right: 25px;
`;

const LinkList = styled.ul`
  list-style: none;
  float: right;

  a {
    text-decoration: none;
    color: white;
    width: 100%;
    &:hover {
      color: #000;
    }
  }
`;

const ListItem = styled.li`
  color: #fff;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 4px;
  padding: 20px;
  font-size: 25px;
  cursor: pointer;
  transition: ease-in-out 0.1s;
  border: 1px solid #fff;
  float: left;
  height: 75px;

  &:hover {
    background: rgba(255, 255, 255, 0.4);
    color: #000;
    border: 1px solid #fff;
  }
`;

const Button = styled.button`
  // all: unset;
  background: none;
  color: white;
  border: none;
  font-size: 25px;
  &:hover {
    color: #000;
  }
`;

const NavLinks: React.FC = () => {
  const auth = useContext(AuthContext);
  const theme = useContext(ThemeContext);
  const location = useLocation();

  const isCurrentURL = (url: string) => {
    return location.pathname.toLowerCase() === url.toLowerCase();
  };

  return (
    <>
      <ListContainer>
        {/* <AdoptionSwiperCube /> */}
        <LinkList>
          {!isCurrentURL("/") && (
            <ListItem>
              <NavLink to="/">Home</NavLink>
            </ListItem>
          )}
          {auth.isLoggedIn && !isCurrentURL("/users") && (
            <ListItem>
              {auth.isLoggedIn && <NavLink to="/users">Dashboard</NavLink>}
            </ListItem>
          )}
          {!auth.isLoggedIn && (
            <ListItem>
              <NavLink to="/auth">Login/Signup</NavLink>
            </ListItem>
          )}
          {auth.isLoggedIn && (
            <ListItem>
              <Button onClick={auth.logout}>Logout</Button>
            </ListItem>
          )}
        </LinkList>
      </ListContainer>
      <TitleContainer>
        <Title>Sasha's List</Title>
        <SubTitle>Your Guide to Dogfriendly St. Pete</SubTitle>
      </TitleContainer>
    </>
  );
};

export default NavLinks;
