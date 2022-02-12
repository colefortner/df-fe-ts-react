import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/auth-context";

const NavLinks: React.FC = () => {
  const auth = useContext(AuthContext);

  return (
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
    </ul>
  );
};

export default NavLinks;
