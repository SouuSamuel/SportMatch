import { NavLink } from "react-router-dom";
import SportMatchLogo from "./SportMatchLogo";

function Navbar({ activeAccess, onResetAccess }) {
  return (
    <nav className="top-nav brand-only" aria-label="Identidade SportMatch">
      <NavLink className="brand" to="/">
        <SportMatchLogo />
      </NavLink>
      <button className="access-switch" type="button" onClick={onResetAccess}>
        {activeAccess?.label ?? "Login"}
      </button>
    </nav>
  );
}

export default Navbar;
