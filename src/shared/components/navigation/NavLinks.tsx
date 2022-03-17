import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/auth-context";
import AdoptionSwiperCube from "../../components/adoption-cube/AdoptionSwiperCube";
import styled from "styled-components";

const LinkList = styled.ul`
  display: flex;
  list-style: none;
  margin-top: 30px;
  margin-left: 20px;
  a {
    text-decoration: none;
    color: white;
    margin: 10px;
  }
`;

const NavLinks: React.FC = () => {
  const auth = useContext(AuthContext);
  console.log(auth.isLoggedIn);
  return (
    <>
      <AdoptionSwiperCube />
      <LinkList>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/businesses">All businesses</NavLink>
        </li>
        {auth.isLoggedIn && (
          <li>{auth.isLoggedIn && <NavLink to="/users">Dashboard</NavLink>}</li>
        )}
        <li>
          {!auth.isLoggedIn && <NavLink to="/auth">Login/Signup</NavLink>}
        </li>
        {auth.isLoggedIn && (
          <li>
            <button onClick={auth.logout}>Logout</button>
          </li>
        )}
      </LinkList>
    </>
  );
};

export default NavLinks;
