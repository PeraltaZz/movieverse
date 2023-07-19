import { render, screen } from "@testing-library/react";
import { Footer } from "../commons/Footer";

describe("Footer", () => {
  it("should render correctly", () => {
    render(<Footer />);
    expect(screen.getByText("©MovieVerse 2023")).toBeInTheDocument();
  });
});
