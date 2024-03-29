import React, { useState, useEffect, useRef, ChangeEvent } from "react";
import {SearchList} from "./SearchList";

interface SearchProps {
  onMovieClick: (movieKey: string) => void;
}

export const Search = ({ onMovieClick }: SearchProps) => {
  const [searchMovie, setSearchMovie] = useState<string>("");
  const [isInputFocused, setIsInputFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const searchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchMovie(event.target.value);
  };

  const inputFocus = () => {
    setIsInputFocused(true);
  };

  const handleClick = (event: MouseEvent) => {
    if (inputRef.current && inputRef.current.contains(event.target as Node)) {
      setIsInputFocused(true);
      return;
    }
    setIsInputFocused(false);
  };

  useEffect(() => {
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div className="search-bg">
      <section className="search-container container">
        <form className="d-flex column justify-content-center align-items-center g-20">
          <label className="font-large" htmlFor="">
            Search Movie
          </label>
          <input
            ref={inputRef}
            className="search-input"
            type="text"
            placeholder="Search..."
            value={searchMovie}
            onChange={searchChange}
            onFocus={inputFocus}
          />
        </form>

        <div className="d-flex column justify-content-center align-items-center">
          <SearchList
            movieTitle={searchMovie}
            focus={isInputFocused}
            onMovieClick={onMovieClick}
          />
        </div>
      </section>
    </div>
  );
};

