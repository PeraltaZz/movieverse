import { useEffect, useState } from "react";
import Image from "next/image";

import FavoriteIcon from "../commons/FavoriteIcon";

interface Movie {
  Poster: string;
  Title: string;
  imdbRating: string;
  Runtime: string;
  Released: string;
  Genre: string;
  imdbID: string;
}

const Favorites: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  const fetchMoviesData = async (movieKeys: string[]) => {
    const moviePromises = movieKeys.map(async (movieKey) => {
      try {
        const response = await fetch(
          `https://www.omdbapi.com/?i=${movieKey}&apikey=5862fd8f`
        );

        const movieData = await response.json();
        return movieData;
      } catch (error) {
        console.error(`Erro ao buscar dados do filme com ID ${movieKey}:`);
      }
    });

    const moviesData = await Promise.all(moviePromises);
    return moviesData;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const favorites = localStorage.getItem("favorites");
        if (favorites) {
          const parsedFavorites = JSON.parse(favorites);
          const movieKeys = Object.keys(parsedFavorites);
          const moviesData = await fetchMoviesData(movieKeys);
          setMovies(moviesData as Movie[]);
        }
      } catch (error) {
        console.error("Error fetching movie data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="favorite-bg d-flex column g-20">
      {movies.length > 0 ? (
        movies.map((movie) => (
          <div
            className="favorite-all container d-grid align-items-center g-40"
            key={movie.imdbID}
          >
            <div className="favorite-img">
              <Image
                width={260}
                height={355}
                src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.jpg"}
                alt=""
              />
            </div>
            <div className="favorites d-flex column justify-content-between ">
              <div className="movie-infos  d-flex column g-20">
                <div className="main-infos">
                  <div className="d-flex justify-content-between align-items-center ">
                    <h1 className="font-large">{movie.Title}</h1>
                    <div className="movie-favorite-icon">
                      <FavoriteIcon movieKey={movie.imdbID} />
                    </div>
                  </div>
                </div>
                <p>
                  <span className="imdb-style">IMDb:</span>{" "}
                  <span className="score-style">{movie.imdbRating}</span>
                </p>
                <div className="favorite-infos d-flex column g-20">
                  <div className="runtime d-flex align-items-center g-40">
                    <p>
                      Runtime:{" "}
                      <span className="runtime-style">{movie.Runtime}</span>
                    </p>
                    <p>
                      Released:{" "}
                      <span className="release-style">{movie.Released}</span>
                    </p>
                  </div>
                  <div className="genre">
                    <p className="">
                      Genre: <span className="genre-style">{movie.Genre}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="default-message d-flex column g-20 justify-content-center align-items-center font-large">
          You have not added any movies to your favorites yet
        </div>
      )}
    </div>
  );
};

export default Favorites;
