import { useState } from "react";
import {Search} from "@/components/home/Search";
import {Movie} from "@/components/home/Movie";
import Head from "next/head";

const Home = () => {
  const [selectedMovieKey, setSelectedMovieKey] = useState("");


  const onMovieClick = (movieKey: string) => {
    setSelectedMovieKey(movieKey);
  };

  return (
    <>
      <Head>
        <title>Home | MovieVerse</title>
      </Head>

      <div className="main-container">
        <Search onMovieClick={onMovieClick} />
        <Movie movieKey={selectedMovieKey} />
      </div>
    </>
  );
};

export default Home;
