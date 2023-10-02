// Importing the 'express' library
import express from "express";

// Importing the 'Book' model from the specified path
import { Book } from "../models/bookModel.js";

// Creating an instance of an Express Router
const router = express.Router();

// Route for saving a new book
router.post("/", async (request, response) => {
  try {
    // Checking if all required fields are provided in the request body
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response.status(400).send({
        message: "Send all required fields: title, author, publishYear",
      });
    }

    // Creating a new book based on the request body
    const newBook = {
      title: request.body.title,
      author: request.body.author,
      publishYear: request.body.publishYear,
    };

    // Creating a new book entry in the database
    const book = await Book.create(newBook);

    // Sending the newly created book as the response
    return response.status(201).send(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for getting all books from the database
router.get("/", async (request, response) => {
  try {
    // Finding all books in the database
    const books = await Book.find({});

    // Sending the list of books as the response
    return response.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for getting one book from the database by id
router.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    // Finding a book by its id
    const book = await Book.findById(id);

    // Sending the book as the response
    return response.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for updating a book
router.put("/:id", async (request, response) => {
  try {
    // Checking if all required fields are provided in the request body
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response.status(400).send({
        message: "Send all required fields: title, author, publishYear",
      });
    }

    // Extracting the id from the request parameters
    const { id } = request.params;

    // Updating the book based on the id and request body
    const result = await Book.findByIdAndUpdate(id, request.body);

    // Handling if the book was not found
    if (!result) {
      return response.status(404).json({ message: "Book not found" });
    }

    // Sending success message as the response
    return response.status(200).send({ message: "Book updated successfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for deleting a book
router.delete("/:id", async (request, response) => {
  try {
    // Extracting the id from the request parameters
    const { id } = request.params;

    // Deleting the book based on the id
    const result = await Book.findByIdAndDelete(id);

    // Handling if the book was not found
    if (!result) {
      return response.status(404).json({ message: "Book not found" });
    }

    // Sending success message as the response
    return response.status(200).send({ message: "Book deleted successfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Exporting the router for use in other parts of the application
export default router;
