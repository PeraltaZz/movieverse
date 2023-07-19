import { render, screen } from "@testing-library/react";
import { SearchList } from "../home/SearchList";
import fetchMock from "jest-fetch-mock";
describe("SearchList component", () => {
  beforeEach(() => {
    fetchMock.enableMocks();
  });

  afterEach(() => {
    fetchMock.resetMocks();
  });

  it("Verify if the list of results is generated correctly when typing text in the input.", async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({
        Search: [
          {
            Title: "The Avengers",
            Year: "2012",
            imdbID: "tt0848228",
            Type: "movie",
            Poster:
              "https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg",
          },
          {
            Title: "Avengers: Endgame",
            Year: "2019",
            imdbID: "tt4154796",
            Type: "movie",
            Poster:
              "https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_SX300.jpg",
          },
        ],
        totalResults: "147",
        Response: "True",
      })
    );

    render(
      <SearchList movieTitle="Avengers" focus={true} onMovieClick={() => {}} />
    );

    await screen.findByText("The Avengers");
    await screen.findByText("2012");
    await screen.findByText("Avengers: Endgame");
    await screen.findByText("2019");
  });
});
