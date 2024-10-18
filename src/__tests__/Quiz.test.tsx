import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import Quiz from "../components/Quiz";
import "@testing-library/jest-dom";
import axios from "axios";

jest.mock("axios");

const mockResponse = {
  data: {
    country: "France",
    options: ["Berlin", "Paris", "Rome"],
    correctCapital: "Paris",
  },
};

test("renders Quiz component with loading state", () => {
  render(<Quiz />);

  const loadingElement = screen.getByText(/Loading/i);
  expect(loadingElement).toBeInTheDocument();
});

test("fetches and displays quiz data, allows user to guess, and gives feedback on correct answer", async () => {
  (axios.get as jest.Mock).mockResolvedValue(mockResponse);

  render(<Quiz />);

  await waitFor(() => {
    expect(screen.getByText(/France/i)).toBeInTheDocument();
    expect(screen.getByText(/Berlin/i)).toBeInTheDocument();
    expect(screen.getByText(/Paris/i)).toBeInTheDocument();
    expect(screen.getByText(/Rome/i)).toBeInTheDocument();
  });

  fireEvent.click(screen.getByText("Paris"));

  await waitFor(() => {
    expect(screen.getByText(/Correct!/i)).toBeInTheDocument();
  });
});

test("fetches and displays quiz data, allows user to guess, and gives feedback on incorrect answer", async () => {
  (axios.get as jest.Mock).mockResolvedValue(mockResponse);

  render(<Quiz />);

  await waitFor(() => {
    expect(screen.getByText(/France/i)).toBeInTheDocument();
    expect(screen.getByText(/Berlin/i)).toBeInTheDocument();
    expect(screen.getByText(/Paris/i)).toBeInTheDocument();
    expect(screen.getByText(/Rome/i)).toBeInTheDocument();
  });

  fireEvent.click(screen.getByText("Berlin"));

  await waitFor(() => {
    expect(screen.getByText(/Incorrect/i)).toBeInTheDocument();
    expect(
      screen.getByText(/The correct capital is Paris/i)
    ).toBeInTheDocument();
  });
});
