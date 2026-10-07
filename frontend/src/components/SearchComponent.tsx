import { Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import "../styles/Search.css";
import { searchResult } from "../utils/mock";
import SearchItem from "./SearchItem";

const SearchComponent = (props: {
  setOpen: (isNav: boolean, shouldOpen: boolean) => void;
  open: boolean;
}) => {
  const [searchValue, setSearchValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null!);
  const timeoutIdRef = useRef<undefined | number>(undefined);

  useEffect(() => {
    if (props.open) {
      inputRef.current.focus();
    }
  }, [props.open]);

  useEffect(() => {
    console.log("Searching for " + searchValue);
  }, [searchValue]);

  const closeFn = () => {
    props.setOpen(false, false);
  };

  return (
    <>
      <div className="search-header">
        {props.open && (
          <input
            type="text"
            id="search-input"
            ref={inputRef}
            onChange={() => {
              if (timeoutIdRef !== undefined)
                window.clearTimeout(timeoutIdRef.current);
              timeoutIdRef.current = window.setTimeout(() => {
                setSearchValue(inputRef.current.value);
              }, 500);
            }}
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
          {searchResult.map((result, index) => (
            <SearchItem key={index} data={result} closeFn={closeFn} />
          ))}
        </div>
      )}
    </>
  );
};

export default SearchComponent;
