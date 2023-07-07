import Image from "next/image";
import { useEffect, useState } from "react";
import FavoriteIcon from "../commons/FavoriteIcon";

interface MovieData {
  Poster: string;
  Title: string;
  imdbRating: string;
  Runtime: string;
  Released: string;
  Genre: string;
  Actors: string;
  Plot: string;
  Language: string;
  Awards: string;
}

interface MovieProps {
  movieKey: string;
}

const Movie: React.FC<MovieProps> = ({ movieKey }) => {
  const [movieData, setMovieData] = useState<MovieData | null>(null);

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const response = await fetch(
          `https://www.omdbapi.com/?i=${movieKey}&apikey=5862fd8f`
        );
        const data = await response.json();
        setMovieData(data);
      } catch (error) {
        console.log("Error fetching movie data:", error);
      }
    };

    fetchMovieData();
  }, [movieKey]);

  if (!movieData) {
    return null;
  }
  const posterUrl = movieData.Poster !== "N/A" ? movieData.Poster : "/placeholder.jpg";

  return (
    <section className="movie-bg">
      <div className="movie-all container">
        <div className="movie-img">
          <Image
          className="poster-img"
            width={300}
            height={410}
            unoptimized
            src={posterUrl}
            alt={movieData.Title}
          />
        </div>
        <div className="movie-infos">
          <div className="main-infos">
            <div className="title">
              <h1>{movieData.Title}</h1>
              <p>
                <span className="imdb-style">IMDb:</span>{" "}
                <span className="score-style">{movieData.imdbRating}</span>
              </p>
            </div>
            <div className="movie-favorite-icon">
              <FavoriteIcon movieKey={movieKey} />
            </div>
          </div>
          <div className="runtime">
            <p>
              Runtime:{" "}
              <span className="runtime-style">{movieData.Runtime}</span>
            </p>
            <p>
              Released:{" "}
              <span className="release-style">{movieData.Released}</span>
            </p>
          </div>
          <div className="genre">
            <p>
              Genre: <span className="genre-style">{movieData.Genre}</span>
            </p>
          </div>
          <div className="actors">
            <p>
              Actors: <span className="actors-style">{movieData.Actors}</span>
            </p>
          </div>
          <div className="plot">
            <p>
              Plot: <span className="plot-style">{movieData.Plot}</span>
            </p>
          </div>
          <div className="language">
            <p>
              Language:{" "}
              <span className="language-style">{movieData.Language}</span>
            </p>
          </div>
          <div className="awards">
            <p>
              Awards: <span className="awards-style">{movieData.Awards}</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Movie;
