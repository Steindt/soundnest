import { ArrowLeftCircle, ArrowRightCircle, PlayCircle } from "lucide-react";
import "../styles/Player.css";
import useSwipe from "../utils/useSwipe";

const PlayerLarge = (props: { scrollFunction: () => void }) => {
  const swipeHandler = useSwipe({ onSwipedDown: () => props.scrollFunction() });

  return (
    <div
      {...swipeHandler}
      onClick={(e) => e.stopPropagation()}
      className="player player-large"
    >
      <div className="cover-large"></div>
      <div className="info-large">
        <span>Piercing Light</span>
        <span>League of Legends, Mako</span>
      </div>
      <div className="controls">
        <ArrowLeftCircle />
        <PlayCircle />
        <ArrowRightCircle />
      </div>
      <input type="range" />
      <input type="range" />
    </div>
  );
};

export default PlayerLarge;
