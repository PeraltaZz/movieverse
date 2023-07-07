import { useEffect, useState } from 'react';
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
    const favorites = localStorage.getItem('favorites');
    if (favorites) {
      const parsedFavorites = JSON.parse(favorites);
      const movieKeys = Object.keys(parsedFavorites);
      const moviePromises = movieKeys.map((movieKey) =>
        fetch(`https://www.omdbapi.com/?i=${movieKey}&apikey=5862fd8f`)
          .then((response) => response.json())
          .catch((error) => {
            console.error(`Error fetching movie data for ID ${movieKey}:`, error);
            return null;
          })
      );

      Promise.all(moviePromises)
        .then((moviesData) => {
          const filteredMoviesData = moviesData.filter((data) => data !== null);
          const formattedMovies = filteredMoviesData.map((data) => {
            const { Poster, Title, imdbRating, Runtime, Released, Genre, imdbID } = data;
            return { Poster, Title, imdbRating, Runtime, Released, Genre, imdbID };
          });
          setMovies(formattedMovies);
        })
        .catch((error) => {
          console.error('Error fetching movie data:', error);
        });
    }
  }, []);

  return (
    <div className='movie-bg favorite-bg'>
      {movies.map((movie, index) => (
         <div className="movie-all container favorite-all" key={index}>
           <div className="movie-img">
             <Image width={260} height={355} src={movie.Poster} alt="" />
           </div>
           <div className="favorites">
             <div className="movie-infos ">
               <div className="main-infos">
                 <div className="title">
                   <h1>{movie.Title}</h1>
                   
                 </div>
                 <div className="movie-favorite-icon">
                   <FavoriteIcon movieKey={movie.imdbID} />
                 </div>
               </div>
               <p>
                     <span className="imdb-style">IMDb:</span>{" "}
                     <span className="score-style">{movie.imdbRating}</span>
                   </p>
               <div className="favorite-infos">
                 <div className="runtime">
                   <p>
                     Runtime: <span className="runtime-style">{movie.Runtime}</span>
                   </p>
                   <p>
                     Released: <span className="release-style">{movie.Released}</span>
                   </p>
                 </div>
                 <div className="genre">
                   <p>
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
