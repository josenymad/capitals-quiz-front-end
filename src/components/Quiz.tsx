import React, { useState, useEffect } from "react";
import axios from "axios";

interface QuizData {
  country: string;
  options: string[];
  correctCapital: string;
}

const Quiz: React.FC = () => {
  const [quizData, setQuizData] = useState<QuizData | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchQuizData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("/quiz");
      setQuizData(response.data);
      setSelectedOption(null);
      setFeedback(null);
    } catch (error) {
      console.error("Error fetching quiz data", error);
      setError("Failed to load quiz data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    if (option === quizData?.correctCapital) {
      setFeedback("Correct! Well done.");
    } else {
      setFeedback(
        `Incorrect. The correct capital is ${quizData?.correctCapital}.`
      );
    }
  };

  useEffect(() => {
    fetchQuizData();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-4">
          Capital Cities Quiz
        </h1>

        {loading && <p className="text-center text-lg">Loading...</p>}

        {error && (
          <div className="text-center text-red-600">
            <p>{error}</p>
            <button
              onClick={fetchQuizData}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition-colors duration-300"
            >
              Retry
            </button>
          </div>
        )}

        {!loading && !error && quizData && (
          <>
            <h2 className="text-xl font-semibold text-center mb-6">
              What is the capital of{" "}
              <span className="text-indigo-600">{quizData.country}</span>?
            </h2>
            <div className="flex flex-col space-y-4">
              {quizData.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleOptionClick(option)}
                  disabled={!!feedback}
                  className={`px-4 py-2 text-lg font-medium border rounded-lg transition-colors duration-300 ${
                    selectedOption === option
                      ? "bg-indigo-600 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>

            {feedback && (
              <p className="mt-4 text-lg text-center font-medium">
                {feedback.includes("Correct") ? (
                  <span className="text-green-600">{feedback}</span>
                ) : (
                  <span className="text-red-600">{feedback}</span>
                )}
              </p>
            )}

            <button
              onClick={fetchQuizData}
              className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition-colors duration-300"
            >
              Play Again
            </button>
          </>
        )}

        {!loading && !error && !quizData && (
          <p className="text-center text-lg">No quiz data available.</p>
        )}
      </div>
    </div>
  );
};

export default Quiz;
