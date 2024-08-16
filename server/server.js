require("dotenv").config({
  path: require("path").resolve(__dirname, `.env${process.env.NODE_ENV === "production" ? ".production" : ""}`),
});

const express = require("express");
const cors = require("cors");
const path = require("path");
const favicon = require("serve-favicon");

const app = express();
const PORT = process.env.PORT || 4000;
const HOST = process.env.HOST || "localhost";
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

// Set favicon
app.use(favicon(path.join(__dirname, "public", "UltopiaIcon.png")));

// Configure CORS
app.use(
  cors({
    origin: [FRONTEND_URL],
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    allowedHeaders: "Content-Type,Authorization",
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

// Handle pre-flight requests for all routes
app.options("*", cors());

// Middleware for parsing JSON bodies
app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.send(
    "Welcome to the Ultopia AI Business Portal API. Navigate using the available routes."
  );
});

// Routes
const employeeRoutes = require("./src/routes/employeeRoutes");
const profileRoutes = require("./src/routes/profileRoutes");

app.use("/api/employees", employeeRoutes);
app.use("/api/profile", profileRoutes);


// Middleware for error handling
app.use((err, req, res, next) => {
  console.error("Error occurred:", err);
  res.status(500).send("Something went wrong. Please try again later.");
});

// Middleware for handling 404 errors
app.use((req, res) => {
  res.status(404).send("404: Page not found");
});

app.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});

module.exports = app;
