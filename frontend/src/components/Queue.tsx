import { useEffect, useState } from "react";
import { queueItems } from "../utils/mock";
import "../styles/Queue.css";
import QueueItem from "./QueueItem";

const Queue = () => {
  const [items, setItems] = useState<QueueItem[]>(queueItems);
  const [dragged, setDragged] = useState<number | null>(null);
  const [mouse, setMouse] = useState<[number, number]>([0, 0]);
  const [dropZone, setDropZone] = useState(0);

  useEffect(() => {
    if (dragged !== null) {
      const elements = Array.from(document.getElementsByClassName("drop-zone"));

      const pos = elements.map((e) => e.getBoundingClientRect().top);
      const absDiff = pos.map((v) => Math.abs(v - mouse[1]));

      let result = absDiff.indexOf(Math.min(...absDiff));
      if (result > dragged) result += 1;

      setDropZone(result);
    }
  }, [dragged, mouse]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      setMouse([e.x, e.y]);
    };

    document.addEventListener("mousemove", handler);
    return () => document.removeEventListener("mousemove", handler);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dragged !== null) {
        e.preventDefault();
        const res = [...items];
        const dropped = dropZone == res.length ? dropZone - 1 : dropZone;
        const tmp = res[dropped];
        res[dropped] = res[dragged];
        res[dragged] = tmp;
        console.log(dropped + " " + dragged);
        setItems(res);
        setDragged(null);
      }
    };

    document.addEventListener("mouseup", handler);
    return () => document.removeEventListener("mouseup", handler);
  }, [dragged, dropZone, items]);

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
        <>
          {dragged !== index && (
            <>
              <QueueItem
                key={index}
                index={index}
                item={item}
                setDragged={(a: number) => setDragged(a)}
              />
              <div
                key={index + "drop"}
                className={
                  "drop-zone " +
                  (dragged === null || dropZone !== index + 1 ? "hidden" : "")
                }
              />
            </>
          )}
        </>
      ))}
    </div>
  );
};

export default Queue;
