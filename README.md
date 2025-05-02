# Pastr - Online Clipboard 📋

Pastr is a web application that allows users to save and retrieve text snippets using a unique 4-digit ID. The saved text is stored temporarily and can be accessed within an hour. This project is built using **React**, **TypeScript**, **Vite**, **TailwindCSS**, and **Express.js** with a **MongoDB** backend.

## Features

- **Save Text**: Users can save text snippets and receive a unique 4-digit ID to retrieve them later.
- **Retrieve Text**: Users can retrieve their saved text using the 4-digit ID.
- **Text Transformations**: Options to transform text into uppercase, lowercase, or capitalize it.
- **Copy to Clipboard**: Easily copy the saved or retrieved text to the clipboard.
- **Dark Mode**: Toggle between light and dark themes for a better user experience.
- **Temporary Storage**: Text snippets are stored for 1 hour and automatically expire afterward.

## How to Use

### 1. Save Text
1. Navigate to the **Save Text** tab.
2. Enter your text in the input box.
3. Use the transformation options (uppercase, lowercase, capitalize).
4. Click the **Save Text** button.
5. A unique 4-digit ID will be generated. Use this ID to retrieve your text later.

### 2. Retrieve Text
1. Navigate to the **Retrieve Text** tab.
2. Enter the 4-digit ID in the input box.
3. Click the **Retrieve Text** button to fetch your saved text.
4. Use the transformation options (uppercase, lowercase, capitalize) or copy the text to your clipboard.

## Installation and Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB instance (local or cloud)

### Frontend Setup
1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

### Backend Setup
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend` directory with the following variables:
   ```env
   PORT=3000
   MONGODB_URL=<your_mongodb_connection_string>
   FRONTEND_URL=http://localhost:5173
   ```
4. Start the backend server:
   ```bash
   npm run dev
   ```

### Access the Application
- Open your browser and navigate to `http://localhost:5173`.

## Tech Stack

### Frontend
- **React**: For building the user interface.
- **TypeScript**: For type safety and better development experience.
- **Vite**: For fast development and build tooling.
- **TailwindCSS**: For styling the application.

### Backend
- **Express.js**: For handling API requests.
- **MongoDB**: For storing text snippets.
- **Mongoose**: For interacting with the MongoDB database.

## Folder Structure

### Frontend
- `src/`: Contains React components, styles, and utility files.
- `vite.config.ts`: Configuration for Vite.
- `tailwind.config.js`: Configuration for TailwindCSS.

### Backend
- `routes/`: Contains API route definitions.
- `controllers/`: Contains logic for handling API requests.
- `models/`: Contains Mongoose schemas for MongoDB.
- `middleware/`: Contains custom middleware like error handling.
- `config/`: Contains database connection logic.

---

<center>Enjoy using **Pastr**! 🎉</center>
