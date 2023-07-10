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

  useEffect(() => {
    const favorites = localStorage.getItem("favorites");
    if (favorites) {
      const parsedFavorites = JSON.parse(favorites);
      const movieKeys = Object.keys(parsedFavorites);
      const moviePromises = movieKeys.map((movieKey) =>
        fetch(`https://www.omdbapi.com/?i=${movieKey}&apikey=5862fd8f`)
          .then((response) => response.json())
          .catch((error) => {
            console.error(
              `Error fetching movie data for ID ${movieKey}:`,
              error
            );
            return null;
          })
      );

      Promise.all(moviePromises)
        .then((moviesData) => {
          const filteredMoviesData = moviesData.filter((data) => data !== null);
          const formattedMovies = filteredMoviesData.map((data) => {
            const {
              Poster,
              Title,
              imdbRating,
              Runtime,
              Released,
              Genre,
              imdbID,
            } = data;
            return {
              Poster,
              Title,
              imdbRating,
              Runtime,
              Released,
              Genre,
              imdbID,
            };
          });
          setMovies(formattedMovies);
        })
        .catch((error) => {
          console.error("Error fetching movie data:", error);
        });
    }
  }, []);

  return (
    <div className="favorite-bg d-flex column g-20">
      {movies.map((movie, index) => (
        <div
          className="favorite-all container d-grid align-items-center g-40"
          key={index}
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
      ))}
    </div>
  );
};

export default Favorites;
