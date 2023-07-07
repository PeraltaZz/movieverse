import { useState } from "react";
import Search from "@/components/home/Search";
import Movie from "@/components/home/Movie";
import Head from "next/head";

const Home = () => {
  const [selectedMovieKey, setSelectedMovieKey] = useState("");
  const [isMovieSelected, setIsMovieSelected] = useState(false);

  const onMovieClick = (movieKey: string) => {
    setSelectedMovieKey(movieKey);
    setIsMovieSelected(true);
  };

  return (
    <>
      <Head>
        <title>Home | MovieVerse</title>
      </Head>
      <div className="main-container">
        <Search onMovieClick={onMovieClick} />
        <div className="default-container">
          {isMovieSelected ? (
            <Movie movieKey={selectedMovieKey} />
          ) : (
            <div className=""></div>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
