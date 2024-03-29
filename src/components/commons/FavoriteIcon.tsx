import React, { useState, useEffect } from "react";
import Image from "next/image";

interface FavoriteIconProps {
  movieKey: string;
}

export const FavoriteIcon = ({ movieKey }: FavoriteIconProps) => {
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

      prevIsFavorite
        ? delete updatedFavorites[movieKey]
        : (updatedFavorites[movieKey] = true);

      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      return !prevIsFavorite;
    });
  };

  return (
    <div
      className="search-list-item-icon"
      onClick={toggleFavorite}
      data-testid="favorite-icon"
    >
      {isFavorite ? (
        <Image
          className="icon"
          src="/starfill.svg"
          alt="Marked Favorite"
          width={20}
          height={20}
        />
      ) : (
        <Image
          className="icon"
          src="/star.svg"
          alt="Unmarked Favorite"
          width={20}
          height={20}
        />
      )}
    </div>
  );
};
