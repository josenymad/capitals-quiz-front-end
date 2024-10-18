import { render, screen } from "@testing-library/react";
import Quiz from "../components/Quiz";
import "@testing-library/jest-dom";

test("renders Quiz component with loading state", () => {
  render(<Quiz />);

  // Assert that the loading message appears initially
  const loadingElement = screen.getByText(/Loading/i);
  expect(loadingElement).toBeInTheDocument();
});
