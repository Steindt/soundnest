import { Ellipsis } from "lucide-react";
import Dropdown from "./Dropdown";
import { artistDisplay } from "../utils/funcs";

const QueueItem = (props: {
  index: number;
  item: QueueItem;
  setDragged?: (index: number, pointerId: number) => void;
  mouse?: [x: number, y: number];
}) => {
  return (
    <div
      className="queue-item-container"
      onPointerDown={(e) => {
        if (props.setDragged) {
          e.preventDefault();
          e.currentTarget.setPointerCapture(e.pointerId);
          props.setDragged(props.index, e.pointerId);
        }
      }}
      style={
        props.mouse
          ? {
              position: "fixed",
              left: `${props.mouse[0]}px`,
              top: `${props.mouse[1]}px`,
              cursor: "grabbing",
            }
          : {
              cursor: "grab",
            }
      }
    >
      <div className="queue-item-cover queue-item-info"></div>
      <span className="queue-item-info" id="title">
        {props.item.song.title}
      </span>
      <span className="queue-item-info" id="artists">
        {artistDisplay(props.item.song.artists)}
      </span>
      <span className="queue-item-info" id="length">
        {props.item.song.length}
      </span>
      <span className="queue-item-info" id="release">
        2026-09-21
      </span>
      <Dropdown style={{ marginLeft: "auto" }} icon={<Ellipsis />}>
        <button className="dropdown-button" onClick={() => console.log("play")}>
          Play now
        </button>
        <button className="dropdown-button">Move to top</button>
        <button className="dropdown-button">Remove from queue</button>
      </Dropdown>
    </div>
  );
};

export default QueueItem;
