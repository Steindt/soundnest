import { Link } from "react-router-dom";
import "../styles/Nav.css";
import { Menu, X } from "lucide-react";

const Nav = (props: {
  setOpen: (isNav: boolean, shouldOpen: boolean) => void;
  open: boolean;
}) => {
  const handleClick = () => {
    props.setOpen(true, false);
  };

  return (
    <>
      <button
        id="nav"
        className="button"
        onClick={() => props.setOpen(true, !props.open)}
      >
        {!props.open && <Menu className="icon" />}
        {props.open && <X className="icon" />}
      </button>
      {props.open && (
        <nav>
          <Link onClick={handleClick} tabIndex={0} to="/">
            Home
          </Link>
          <Link onClick={handleClick} tabIndex={1} to="/admin">
            Admin
          </Link>
          <Link onClick={handleClick} tabIndex={2} to="/settings">
            Settings
          </Link>
          <Link onClick={handleClick} tabIndex={3} to="/profile">
            Profile
          </Link>
        </nav>
      )}
    </>
  );
};

export default Nav;
