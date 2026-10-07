import { Fragment, useEffect, useRef, useState } from "react";
import { queueItems } from "../utils/mock";
import "../styles/Queue.css";
import QueueItem from "./QueueItem";

const Queue = () => {
  const [items, setItems] = useState<QueueItem[]>(queueItems);
  const [dragged, setDragged] = useState<number | null>(null);
  const draggedRef = useRef<number | null>(null);
  const [mouse, setMouse] = useState<[number, number]>([0, 0]);
  const mouseRef = useRef<[number, number]>([0, 0]);
  const [dropZone, setDropZone] = useState(0);
  const dropZoneRef = useRef(0);
  const frameRef = useRef<null | number>(null);
  const pointerIdRef = useRef<number | null>(null);

  const startDragging = (index: number, pointerId: number) => {
    pointerIdRef.current = pointerId;
    setDragged(index);
    updateDropZone(index);
  };

  const updateDropZone = (dragged: number | null) => {
    if (dragged !== null) {
      const elements = Array.from(document.getElementsByClassName("drop-zone"));

      const pos = elements.map((e) => e.getBoundingClientRect().top);
      const absDiff = pos.map((v) => Math.abs(v - mouseRef.current[1]));

      let result = absDiff.indexOf(Math.min(...absDiff));
      if (result > dragged) result += 1;
      dropZoneRef.current = result;
      setDropZone((current) => (current === result ? current : result));
    }
  };

  useEffect(() => {
    draggedRef.current = dragged;
  }, [dragged]);

  useEffect(() => {
    const handler = (e: PointerEvent) => {
      // Stop cancelling drag from accidental touches
      if (pointerIdRef.current !== null && e.pointerId !== pointerIdRef.current)
        return;

      mouseRef.current = [e.clientX, e.clientY];

      if (frameRef.current !== null) return;

      frameRef.current = requestAnimationFrame(() => {
        setMouse(mouseRef.current);

        const currentDragged = draggedRef.current;
        if (currentDragged !== null) {
          updateDropZone(currentDragged);
        }

        frameRef.current = null;
      });
    };

    document.addEventListener("pointermove", handler);
    return () => {
      document.removeEventListener("pointermove", handler);

      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
    };
  }, []);

  // Potential to be loop, but because we set dragged = null it will not
  useEffect(() => {
    const handler = (e: PointerEvent) => {
      // Stop cancelling drag from accidental touches
      if (pointerIdRef.current !== null && e.pointerId !== pointerIdRef.current)
        return;

      if (draggedRef.current === null) return;

      e.preventDefault();

      setItems((currentItems) => {
        const res = [...currentItems];
        const dropped =
          dropZoneRef.current >= res.length
            ? res.length - 1
            : dropZoneRef.current;
        [res[dropped], res[draggedRef.current as number]] = [
          res[draggedRef.current as number],
          res[dropped],
        ];
        return res;
      });

      setDragged(null);
    };

    document.addEventListener("pointerup", handler);
    document.addEventListener("pointercancel", handler);
    return () => {
      document.removeEventListener("pointerup", handler);
      document.removeEventListener("pointercancel", handler);
    };
  }, []);

  return (
    <div className="queue-container">
      <span className="container-header">Queue:</span>
      {dragged !== null && (
        <QueueItem index={-1} item={items[dragged]} mouse={mouse} />
      )}
      <div
        className={
          "drop-zone " + (dragged === null || dropZone !== 0 ? "hidden" : "")
        }
      />
      {items.map((item, index) => (
        <Fragment key={index}>
          {dragged !== index && (
            <>
              <QueueItem index={index} item={item} setDragged={startDragging} />
              <div
                className={
                  "drop-zone " +
                  (dragged === null || dropZone !== index + 1 ? "hidden" : "")
                }
              />
            </>
          )}
        </Fragment>
      ))}
    </div>
  );
};

export default Queue;
