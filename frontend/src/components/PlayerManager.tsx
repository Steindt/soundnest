import { useState } from "react";
import PlayerSmall from "./PlayerSmall";
import PlayerLarge from "./PlayerLarge";
import "../styles/Player.css";
import { ChevronDown, ChevronUp } from "lucide-react";

// Manager for handling switching between large and small player
const PlayerManager = () => {
  const [large, setLarge] = useState(false);

  const handleClick = () => {
    setLarge(!large);
  };

  return (
    <div
      className={
        (!large ? "container-player-small" : "container-player-large") +
        " container-player"
      }
      onClick={handleClick}
    >
      {!large && <PlayerSmall />}
      {large && <PlayerLarge scrollFunction={handleClick} />}
      {large && <ChevronDown className="container-chevron" />}
      {!large && <ChevronUp className="container-chevron" />}
    </div>
  );
};

export default PlayerManager;
