import { render, screen, fireEvent } from "@testing-library/react";
import { FavoriteIcon } from "../commons/FavoriteIcon";

describe("FavoriteIcon", () => {
  it("should toggle favorite status when clicked", () => {
    const movieKey = "tt0848228";
    render(<FavoriteIcon movieKey={movieKey} />);

    const favoriteIcon = screen.getByTestId("favorite-icon");

    expect(screen.getByAltText("Unmarked Favorite")).toBeInTheDocument();
    fireEvent.click(favoriteIcon);

    expect(screen.getByAltText("Marked Favorite")).toBeInTheDocument();
    fireEvent.click(favoriteIcon);

    expect(screen.getByAltText("Unmarked Favorite")).toBeInTheDocument();
  });
});
