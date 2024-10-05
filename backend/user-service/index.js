import express from "express";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file

const app = express();

// Middleware for parsing JSON bodies
app.use(express.json());

// Basic route for testing
app.get("/", (req, res) => {
  res.send("User Service is running!");
});

// You can define more routes here as needed
// Example:
// app.post("/users", (req, res) => {
//   // Logic to create a user
// });

// Export the app to be used in server.js
export default app;
