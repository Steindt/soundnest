import { RefObject, useEffect } from "react";

const useDraggable = (ref: RefObject<HTMLDivElement>, func: () => void) => {
  let isDragging = false;
  let offsetX = 0;
  let offsetY = 0;

  useEffect(() => {
    document.addEventListener("mousedown", (event: MouseEvent) => {
      isDragging = true;
      offsetX = event.clientX - ref.current.offsetLeft;
      offsetY = event.clientY - ref.current.offsetTop;
    });

    document.addEventListener("mousemove", (event: MouseEvent) => {
      if (isDragging) {
        ref.current.style.left = event.clientX - offsetX + "px";
        ref.current.style.top = event.clientY - offsetY + "px";
      }
    });

    document.addEventListener("mouseup", () => {
      isDragging = false;
    });
  }, [ref]);
};

export default useDraggable;
