import { useState } from "react";
import useSwipe from "../utils/useSwipe";
import { Check, Plus } from "lucide-react";
import { artistDisplay } from "../utils/funcs";

const SearchItem = (props: {
  data: Song;
  closeFn: () => void;
  blurred?: boolean;
}) => {
  const [added, setAdded] = useState(false);
  const swipeHandler = useSwipe({
    onSwipedLeft: () => setAdded(true),
    onSwipedRight: () => props.closeFn(),
  });

  return (
    <div
      className={
        "search-item-container " +
        (added ? "added " : "") +
        (props.blurred ? "blurred" : "")
      }
      {...swipeHandler}
    >
      <div className="search-item">
        <span className="search-title">{props.data.title}</span>
        <div>
          <span className="search-artists">
            {props.data.uploader ? artistDisplay(props.data.uploader) : ""}
          </span>
        </div>
        <div className="search-info-row">
          <span className="search-misc">
            {(props.data.duration / 60) >> 0}:{(props.data.duration % 60) >> 0}
          </span>
          <span className="search-misc">{props.data.ie_key}</span>
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
