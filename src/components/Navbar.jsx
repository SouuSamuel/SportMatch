import { NavLink } from "react-router-dom";
import { Activity } from "lucide-react";

function Navbar({ activeAccess, onResetAccess }) {
  return (
    <nav className="top-nav brand-only" aria-label="Identidade SportMatch">
      <NavLink className="brand" to="/">
        <span className="brand-icon">
          <Activity size={22} />
        </span>
        <span>
          <strong>SportMatch</strong>
          <small>startup sports app</small>
        </span>
      </NavLink>
      <button className="access-switch" type="button" onClick={onResetAccess}>
        {activeAccess?.label ?? "Login"}
      </button>
    </nav>
  );
}

export default Navbar;
