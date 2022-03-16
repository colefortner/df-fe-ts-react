import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/auth-context";
import AdoptionSwiperCube from "../../components/adoption-cube/AdoptionSwiperCube";

const NavLinks: React.FC = () => {
  const auth = useContext(AuthContext);
  console.log(auth.isLoggedIn);
  return (
    <>
      <AdoptionSwiperCube />
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/businesses">All businesses</NavLink>
        </li>
        {auth.isLoggedIn && (
          <li>
            <NavLink to="/users">Dashboard</NavLink>
          </li>
        )}
        <li>
          <NavLink to="/auth">Login/Signup</NavLink>
        </li>
        {auth.isLoggedIn && (
          <li>
            <button onClick={auth.logout}>Logout</button>
          </li>
        )}
      </ul>
    </>
  );
};

export default NavLinks;
