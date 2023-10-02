import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";

const app = express();
// Middleware for parsing the request body as JSON
app.use(express.json());

// Middleware for handling CORS POLICY
// Option 1: Allow All Origins with Default of cors(*)
app.use(cors());

// Option 2: Allow Custom Origins
// app.use(
//   cors({
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type'],
//   })
// );

// Route to handle the root URL
app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Welcome To MERN Stack Tutorial");
});

// Using the 'booksRoute' for the '/books' route
app.use("/books", booksRoute);

// Connecting to the MongoDB database using the provided URL
mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to the database");
    // Starting the server and listening on the specified PORT
    app.listen(PORT, () => {
      console.log(`App is listening on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });