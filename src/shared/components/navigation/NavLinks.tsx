import { NavLink, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/auth-context";
import AdoptionSwiperCube from "../../components/adoption-cube/AdoptionSwiperCube";
import styled from "styled-components";

const LinkList = styled.ul`
  display: flex;
  list-style: none;
  margin-top: 30px;
  margin-left: 20px;
  font-size: 30px;
  a {
    text-decoration: none;
    color: white;
    margin: 10px;
  }
`;

const ListItem = styled.li`
  color: #fff;
  // background: #333;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 4px;
  padding: 20px;
  margin-left: 4%;
  font-size: 25px;
  cursor: pointer;
  margin-top: 40px;
  transition: ease-in-out 0.1s;
  border: 1px solid #fff;
  float: right;
  height: 75px;

  &:hover {
    background: rgba(255, 255, 255, 0.4);

    // background: #fff;
    color: #000;
    border: 1px solid #fff;
  }
`;

const Button = styled.button`
  all: unset;
`;

const NavLinks: React.FC = () => {
  const auth = useContext(AuthContext);
  const location = useLocation();
  // console.log(auth.isLoggedIn);

  const isCurrentURL = (url: string) => {
    return location.pathname.toLowerCase() === url.toLowerCase();
  };

  return (
    <>
      {/* <AdoptionSwiperCube /> */}
      <LinkList>
        {!isCurrentURL("/") && (
          <ListItem>
            <NavLink to="/">Home</NavLink>
          </ListItem>
        )}
        {/* <li>
          <NavLink to="/businesses">All businesses</NavLink>
        </li> */}
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
    </>
  );
};

export default NavLinks;
