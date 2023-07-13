import Image from "next/image";
import { useEffect, useState } from "react";
import {FavoriteIcon} from "../commons/FavoriteIcon";

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

export const Movie = ({ movieKey }: MovieProps) => {
  const [movieData, setMovieData] = useState<MovieData | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMovieData = async () => {
      setMovieData(null)
      try {
        if (!movieKey) {
          return;
        }
        setLoading(true);
        const response = await fetch(
          `https://www.omdbapi.com/?i=${movieKey}&apikey=5862fd8f`
        );
        const data = await response.json();
        setMovieData(data);
      } catch (error) {
        console.log("Error fetching movie data:", error);
      } finally {
        
        setTimeout(() => {
          setLoading(false);
        }, 500);
      }
    };

    fetchMovieData();
  }, [movieKey]);

  return (
    <div className="default-container ">
    {loading && <div className="c-loader"></div>}
      {movieData && !loading ? (
        <section className="movie-bg appear-animation">
          <div className="movie-all container d-grid justify-content-center align-items-center g-40">
            <div className="movie-img">
              <Image
                className="poster-img"
                width={300}
                height={410}
                unoptimized
                src={
                  movieData.Poster !== "N/A"
                    ? movieData.Poster
                    : "/placeholder.jpg"
                }
                alt={movieData.Title}
              />
            </div>
            <div className="movie-infos d-flex column g-20">
              <div className="main-infos d-flex justify-content-between align-items-center g-20">
                <div className="title d-flex align-items-center g-40">
                  <h1 className="font-large">{movieData.Title}</h1>
                  <p>
                    <span className="imdb-style">IMDb:</span>{" "}
                    <span className="score-style">{movieData.imdbRating}</span>
                  </p>
                </div>
                <div className="movie-favorite-icon">
                  <FavoriteIcon movieKey={movieKey} />
                </div>
              </div>
              <div className="runtime d-flex align-items-center g-40">
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
                  Actors:{" "}
                  <span className="actors-style">{movieData.Actors}</span>
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
                  Awards:{" "}
                  <span className="awards-style">{movieData.Awards}</span>
                </p>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <div></div>
      )}
    </div>
  );
};


