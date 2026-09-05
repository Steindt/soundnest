import "../styles/Dropdown.css";
import { useEffect, useRef, useState } from "react";

const Dropdown = (props: {
  children: React.ReactNode;
  icon?: React.ReactNode;
  text?: React.ReactNode;
  style?: React.CSSProperties;
}) => {
  const [open, setOpen] = useState(false);
  const listRef = useRef<HTMLDivElement>(null!);

  useEffect(() => {
    const xPos = listRef.current.getBoundingClientRect().right;
    console.log(xPos);
    if (listRef.current.getBoundingClientRect().right > window.innerWidth)
      listRef.current.style.marginLeft =
        String(window.innerWidth - xPos) + "px";
  }, []);

  useEffect(() => {
    listRef.current.style.display = open ? "flex" : "none";
  }, [open]);

  return (
    <button
      onBlur={() => setOpen(false)}
      onClick={() => setOpen(!open)}
      className="dropdown-container"
    >
      {props.text && props.text}
      {!props.text && props.icon && props.icon}
      <div onClick={(e) => e.stopPropagation()} ref={listRef} className="list">
        {props.children}
      </div>
    </button>
  );
};

export default Dropdown;
