import { useState } from "react";
import useSwipe from "../utils/useSwipe";
import { Check, Plus } from "lucide-react";

const SearchItem = (props: { data: SearchResult; closeFn: () => void }) => {
  const [added, setAdded] = useState(false);
  const swipeHandler = useSwipe({
    onSwipedLeft: () => setAdded(true),
    onSwipedRight: () => props.closeFn(),
  });

  // Handle multiple artists, adding a comma inbetween except for the last one
  const artistDisplay = (artists: string[]) => {
    let result: string = "";
    for (let i = 0; i < artists.length; i++) {
      result += artists[i];
      if (i < artists.length - 1) {
        result += ", ";
      }
    }
    return result;
  };

  return (
    <div
      className={"search-item-container " + (added ? "added" : "")}
      {...swipeHandler}
    >
      <div className="search-item">
        <span className="search-title">{props.data.title}</span>
        <div>
          <span className="search-artists">
            {artistDisplay(props.data.artists)}
          </span>
        </div>
        <div className="search-info-row">
          <span className="search-misc">{props.data.length}</span>
          <span className="search-misc">{props.data.source}</span>
        </div>
      </div>
      <div>
        <button onClick={() => setAdded(true)} className="search-add">
          {!added && <Plus />}
          {added && <Check />}
        </button>
      </div>
    </div>
  );
};

export default SearchItem;
