import "../styles/Dropdown.css";
import { MouseEvent, useEffect, useRef, useState } from "react";
import clickOutside from "../utils/useClickOutside";

const Dropdown = (props: {
  children: React.ReactNode;
  icon?: React.ReactNode;
  text?: React.ReactNode;
  style?: React.CSSProperties;
}) => {
  const [open, setOpen] = useState(false);
  const listRef = useRef<HTMLDivElement>(null!);

  clickOutside(listRef, () => setOpen(false));

  // Stops dropdown list from appearing outside the window for smaller screens
  useEffect(() => {
    let width = 0;
    if (open) {
      width = window.innerWidth;
    }
    listRef.current.style.display = open ? "flex" : "none";
    if (open) {
      const xPos = listRef.current.getBoundingClientRect().right;
      if (xPos > width)
        listRef.current.style.marginLeft = String(width - xPos) + "px";
    }
  }, [open]);

  useEffect(() => {});

  return (
    <div className="dropdown-container-parent" style={props.style}>
      <button
        onMouseDown={(e: MouseEvent) => e.stopPropagation()}
        onPointerDown={(e: MouseEvent) => e.stopPropagation()}
        onClick={() => setOpen(!open)}
        className="dropdown-container"
      >
        {props.text && props.text}
        {!props.text && props.icon && props.icon}
      </button>
      <div onClick={() => setOpen(false)} ref={listRef} className="list">
        {props.children}
      </div>
    </div>
  );
};

export default Dropdown;
