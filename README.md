# Exploding Kitten Game

Exploding Kitten is a single-player card game built using **React + Redux** for the frontend and **Golang** for the backend.

**Live Demo**: [Exploding Kitten Game](https://exploding-kitten-413916.netlify.app/)

---

## Table of Contents

1. [Frontend Setup (React + Redux)](#frontend-setup)
2. [Backend Setup (Golang)](#backend-setup)
3. [Running the Application](#running-the-application)

---

### Frontend Setup (React + Redux)

The frontend is located in the `exploding-kitten` folder. It uses React and Redux to manage game state and user interactions.

#### Prerequisites

- **Node.js** and **npm**: Make sure you have Node.js and npm installed. [Download Node.js](https://nodejs.org/).

#### Installation

1. **Clone the Repository**:
   ```bash
   https://github.com/JatinKumar001/Game_Exploding_kitten
   cd exploding-kitten
   ```
2. **Install Dependencies: Ensure you have npm installed. Then, run**:
   ```bash
   npm install
   ```

#### Running the Frontend

**To start the Vite server and run the frontend**:
   ```bash
   npm run dev
   ```

### Backend Setup (Golang)

#### Installation

1. **Go Installation**: Ensure Go is installed on your machine. If not, download it from [Download GoLang](https://golang.org/dl/).
 
2. **Dependencies: Navigate to the backend directory**:
   ```bash
   cd epBackend
   ```
   Then, install necessary Go dependencies:
   ```bash
   go mod init github.com/my/repo
   ```

#### Running the Backend
   ```bash
   go build -tags netgo -ldflags '-s -w' -o main
   go run main.go
   ```

---

### Running the Application

1. **Start the Backend**: Follow instructions in the Backend Setup section.
2. **Start the Frontend**: Follow instructions in the Frontend Setup section.

---

Enjoy the game!
