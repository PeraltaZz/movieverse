import { render, screen } from "@testing-library/react";
import { Header } from "../commons/Header";

describe("Header", () => {
  it("should render correctly", () => {
    render(<Header />);
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Favorites")).toBeInTheDocument();
  });
});
