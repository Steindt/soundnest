import { Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import "../styles/Search.css";
import { searchResult } from "../utils/mock";
import useSwipe from "../utils/useSwipe";

const SearchComponent = (props: {
  setOpen: (isNav: boolean, shouldOpen: boolean) => void;
  open: boolean;
}) => {
  const [searchValue, setSearchValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null!);
  const swipeHandler = useSwipe({
    onSwipedRight: () => {
      console.log("test");
    },
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

  useEffect(() => {
    if (props.open) {
      inputRef.current.focus();
    }
  }, [props.open]);

  useEffect(() => {
    console.log("Searching for " + searchValue);
  }, [searchValue]);

  const handleSwipe = () => {};

  return (
    <>
      <div className="search-header">
        {props.open && (
          <input
            type="text"
            id="search-input"
            ref={inputRef}
            onChange={() => setSearchValue(inputRef.current.value)}
          />
        )}
        <button
          id="search"
          className="button"
          onClick={() => props.setOpen(false, !props.open)}
        >
          {!props.open && <Search />}
          {props.open && <X />}
        </button>
      </div>
      {props.open && (
        <div className="container-search">
          {searchResult.map((result) => (
            <div className="search-item-container" {...swipeHandler}>
              <div className="search-item">
                <span className="search-title">{result.title}</span>
                <div>
                  <span className="search-artists">
                    {artistDisplay(result.artists)}
                  </span>
                </div>
                <div className="search-info-row">
                  <span className="search-misc">{result.length}</span>
                  <span className="search-misc">{result.source}</span>
                </div>
              </div>
              <div className="search-buttons">
                <button className="search-add"></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default SearchComponent;
