import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FavoriteIcon } from "../commons/FavoriteIcon";

interface MoviesData {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
}

interface SearchListProps {
  movieTitle: string;
  focus: boolean;
  onMovieClick: (imdbID: string) => void;
}

export const SearchList = ({
  movieTitle,
  focus,
  onMovieClick,
}: SearchListProps) => {
  const [moviesData, setMoviesData] = useState<MoviesData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://www.omdbapi.com/?s=${movieTitle}&page=1&apikey=5862fd8f`
        );
        const data = await response.json();
        if (data && data.Search) {
          setMoviesData(data.Search);
        }
      } catch (error) {
        console.log("Error fetching movie data:", error);
      }
    };

    fetchData();
  }, [movieTitle]);

  return (
    <>
      {focus && moviesData.length > 0 ? (
        <ul className="search-list d-flex column">
          {moviesData.map((movie) => {
            return (
              <li
                key={movie.imdbID}
                className="search-list-item d-flex justify-content-between align-items-center g-20"
                onClick={() => onMovieClick(movie.imdbID)}
              >
                <div className="search-list-item-content d-flex justify-content-center align-items-center g-20">
                  <div className="search-list-item-img">
                    <Image
                      width={50}
                      height={74}
                      src={
                        movie.Poster !== "N/A"
                          ? movie.Poster
                          : "/placeholder.jpg"
                      }
                      alt={movie.Title}
                    />
                  </div>
                  <div className="search-list-item-infos">
                    <h3 className="small-font">{movie.Title}</h3>
                    <h4 className="mini-font">{movie.Year}</h4>
                  </div>
                </div>
                <div>
                  <FavoriteIcon movieKey={movie.imdbID} />
                </div>
              </li>
            );
          })}
        </ul>
      ) : null}
    </>
  );
};
