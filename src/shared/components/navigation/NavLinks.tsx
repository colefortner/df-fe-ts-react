import { NavLink } from "react-router-dom";

const NavLinks: React.FC = () => {
  return (
    <ul>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/businesses">All businesses</NavLink>
      </li>
      <li>
        <NavLink to="/users">Some User Link</NavLink>
      </li>
    </ul>
  );
};

export default NavLinks;
