import Image from "next/image";
import React, { useEffect, useState } from "react";
import FavoriteIcon from "../commons/FavoriteIcon";

interface Movie {
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

const SearchList: React.FC<SearchListProps> = ({
  movieTitle,
  focus,
  onMovieClick,
}) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://www.omdbapi.com/?s=${movieTitle}&page=1&apikey=5862fd8f`
        );
        const data = await response.json();
        if (data && data.Search) {
          setMovies(data.Search);
        }
      } catch (error) {
        console.log("Error fetching movie data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [movieTitle]);

  return (
    <ul className="search-list d-flex column">
      {focus && !isLoading && movies.length > 0
        ? movies.map((movie) => {
            const posterUrl =
              movie.Poster !== "N/A" ? movie.Poster : "/placeholder.jpg";
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
                      src={posterUrl}
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
          })
        : null}
    </ul>
  );
};

export default SearchList;
