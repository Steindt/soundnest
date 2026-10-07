import { RefObject, useEffect } from "react";

const useClickOutside = (ref: RefObject<HTMLDivElement>, func: () => void) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        ref != null &&
        event.target instanceof Element &&
        ref.current &&
        !ref.current.contains(event.target)
      )
        func();
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [ref, func]);
};

export default useClickOutside;
