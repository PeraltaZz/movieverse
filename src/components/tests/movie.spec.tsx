import React from "react";
import { render, screen } from "@testing-library/react";
import { Movie } from "../home/Movie";
import fetchMock from "jest-fetch-mock";

describe("Movie Component", () => {
  beforeAll(() => {
    fetchMock.enableMocks();
  });

  afterEach(() => {
    fetchMock.resetMocks();
  });

  it("should display loading state when movie data is being fetched", async () => {
    const movieKey = "tt0848228";
    fetchMock.mockResponseOnce(() => new Promise(() => {})); 

    render(<Movie movieKey={movieKey} />);

    const loadingElement = screen.getByTestId("loading-element");
    expect(loadingElement).toBeInTheDocument();
  });

  it("should display movie data correctly when movieData is available", async () => {
    const movieKey = "tt0848228";
    const mockMovieData = {
      Title: "The Avengers",
      imdbRating: "8.0",
      Runtime: "143 min",
      Released: "04 May 2012",
      Genre: "Action, Sci-Fi",
      Actors: "Robert Downey Jr., Chris Evans, Scarlett Johansson",
      Plot: "Earth's mightiest heroes must come together and learn to fight as a team if they are going to stop the mischievous Loki and his alien army from enslaving humanity.",
      Language: "English, Russian",
      Awards: "Nominated for 1 Oscar. 38 wins & 80 nominations total.",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg",
    };

    fetchMock.mockResponseOnce(JSON.stringify(mockMovieData));

    render(<Movie movieKey={movieKey} />);
    await screen.findByText("The Avengers");
    await screen.findByText("8.0");
    await screen.findByText("143 min");
    await screen.findByText("04 May 2012");
    await screen.findByText("Action, Sci-Fi");
    await screen.findByText(
      "Robert Downey Jr., Chris Evans, Scarlett Johansson"
    );
    await screen.findByText(
      "Earth's mightiest heroes must come together and learn to fight as a team if they are going to stop the mischievous Loki and his alien army from enslaving humanity."
    );
    await screen.findByText("English, Russian");
    await screen.findByText(
      "Nominated for 1 Oscar. 38 wins & 80 nominations total."
    );
    const movieImage = await screen.findByRole("img", {
      name: /The Avengers/i,
    });
    expect(movieImage).toBeInTheDocument();
    expect(movieImage.getAttribute("src")).toBe(
      "https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg"
    );
  });

  it("should display empty div when movieData is null", () => {
    const movieKey = "invalid";

    render(<Movie movieKey={movieKey} />);

    const emptyDiv = screen.queryByTestId("empty-div");
    expect(emptyDiv).toBeInTheDocument();
  });
});
