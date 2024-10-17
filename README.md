# Capital Cities Quiz Application - Frontend Documentation

## Overview

The Capital Cities Quiz application is a React-based quiz that helps users learn the capital cities of various countries. The application communicates with a Laravel backend to fetch quiz data and display it to users in an interactive format.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript, providing static typing and improved code quality.
- **Vite**: A build tool that provides a fast development environment and optimized production builds.
- **Tailwind CSS**: A utility-first CSS framework for creating custom designs without leaving your HTML.
- **Axios**: A promise-based HTTP client for making requests to the backend API.

## Installation

### Prerequisites

Before running the application, ensure that you have the following installed:

- [Node.js](https://nodejs.org/) (v12 or later)

### Steps to Install

1. **Clone the Repository**

   ```bash
   git clone https://github.com/josenymad/capitals-quiz-front-end.git
   cd capitals-quiz-front-end
   ```

2. **Install dependencies**

   `npm install`

3. **Start development server**

   `npm run dev`

The application should now be running on http://localhost:5173.

## Usage

- When the application loads, it fetches a random country and displays three options for the user to guess its capital city.
- Users can click on any option to submit their guess. Feedback is provided immediately, indicating whether the guess was correct or incorrect.
- If the guess is incorrect, the correct capital city is displayed.
- Users can play again by clicking the “Play Again” button, which fetches a new country and options.
- In case of an error (e.g., network issues), an error message will be displayed along with a “Retry” button.

## API Integration

The frontend communicates with the Laravel backend through the following endpoint:

- **GET** `/quiz`: Fetches quiz data, including a random country and an array of options for the capital city.

Ensure that the backend is running on [http://localhost:8000](http://localhost:8000), you can find the repository [here](https://github.com/josenymad/capital-quiz-backend).

## Error Handling

The application handles errors gracefully:

- If a request fails (e.g., due to CORS issues or network problems), an error message is displayed to the user, along with a “Retry” button to fetch the data again.
