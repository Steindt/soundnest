import { useState } from "react";
import "../styles/Dropdown.css";

const Dropdown = (children: React.ReactNode) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="dropdown-container" onClick={() => setOpen(!open)}>
      {children}
    </div>
  );
};

export default Dropdown;
