import { LoaderCircle, Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import "../styles/Search.css";
import SearchItem from "./SearchItem";
import { searchResult } from "../utils/mock";

const SearchComponent = (props: {
  setOpen: (isNav: boolean, shouldOpen: boolean) => void;
  open: boolean;
}) => {
  const [searchValue, setSearchValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null!);
  const timeoutIdRef = useRef<undefined | number>(undefined);
  const [results, setResults] = useState<Song[]>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (props.open) {
      inputRef.current.focus();
    }
  }, [props.open]);

  useEffect(() => {
    if (searchValue === "") {
      if (loading) setLoading(false);
      return;
    }

    fetch(`/search?query=${encodeURIComponent(searchValue)}`, {
      credentials: "include",
    })
      .then((res: Response) => {
        return res.json();
      })
      .then((data: Song[]) => setResults(data))
      .catch((reject) => {
        console.error(reject);
      })
      .finally(() => setLoading(false));
  }, [searchValue]);

  const closeFn = () => {
    props.setOpen(false, false);
  };

  const loadingVisual = [];

  for (let i = 0; i < 10; i++) {
    loadingVisual.push(
      <SearchItem
        key={i}
        data={searchResult[i % 3]}
        closeFn={() => {}}
        blurred
      />,
    );
  }

  return (
    <>
      <div className="search-header">
        {props.open && (
          <input
            type="text"
            id="search-input"
            ref={inputRef}
            onChange={() => {
              setResults(undefined);
              if (inputRef.current.value !== "") setLoading(true);
              else setLoading(false);
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
          {loading && loadingVisual}
          {!loading &&
            results?.map((value, index) => (
              <SearchItem key={index} data={value} closeFn={closeFn} />
            ))}
        </div>
      )}
    </>
  );
};

export default SearchComponent;
