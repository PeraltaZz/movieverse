import React, { useState, useEffect } from "react";
import Image from "next/image";
import Star from "../../../public/star.svg";
import StarFill from "../../../public/starfill.svg";

interface FavoriteIconProps {
  movieKey: string;
}

const FavoriteIcon: React.FC<FavoriteIconProps> = ({ movieKey }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = localStorage.getItem("favorites");
    if (favorites) {
      const parsedFavorites = JSON.parse(favorites);
      setIsFavorite(parsedFavorites[movieKey] || false);
    }
  }, [movieKey]);

  const toggleFavorite = () => {
    setIsFavorite((prevIsFavorite) => {
      const favorites = localStorage.getItem("favorites");
      const parsedFavorites = favorites ? JSON.parse(favorites) : {};
      const updatedFavorites = { ...parsedFavorites };

      prevIsFavorite ? delete updatedFavorites[movieKey] : (updatedFavorites[movieKey] = true);

      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      return !prevIsFavorite;
    });
  };

  return (
    <div className="search-list-item-icon" onClick={toggleFavorite}>
      {isFavorite ? (
        <Image
          className="icon"
          src={StarFill}
          alt="Favorite Icon"
          width={20}
          height={20}
        />
      ) : (
        <Image
          className="icon"
          src={Star}
          alt="Favorite Icon"
          width={20}
          height={20}
        />
      )}
    </div>
  );
};

export default FavoriteIcon;
