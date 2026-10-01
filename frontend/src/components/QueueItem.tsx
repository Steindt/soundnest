import { Ellipsis } from "lucide-react";
import "../styles/Queue.css";
import { artistDisplay } from "../utils/funcs";
import Dropdown from "./Dropdown";

const QueueItem = (props: { data: QueueItem }) => {
  return (
    <div className="queue-item-container">
      <div className="queue-item-cover queue-item-info"></div>
      <span className="queue-item-info" id="title">
        {props.data.song.title}
      </span>
      <span className="queue-item-info" id="artists">
        {artistDisplay(props.data.song.artists)}
      </span>
      <span className="queue-item-info" id="length">
        {props.data.song.length}
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
