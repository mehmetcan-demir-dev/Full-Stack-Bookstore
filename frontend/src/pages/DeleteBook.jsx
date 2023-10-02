import React, { useState } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";

const DeleteBook = () => {
  // Initializing loading state and a function to set loading state
  const [loading, setLoading] = useState(false);

  // Getting the navigation function from the router
  const navigate = useNavigate();

  // Extracting the 'id' parameter from the URL
  const { id } = useParams();

  // Getting the enqueueSnackbar function from the Snackbar provider
  const { enqueueSnackbar } = useSnackbar();

  // Function to handle book deletion
  const handleDeleteBook = () => {
    // Setting loading state to true
    setLoading(true);

    // Making a DELETE request to delete a book by its 'id'
    axios
      .delete(`http://localhost:5555/books/${id}`)
      .then(() => {
        // On success: updating loading state, showing success message, and navigating to home
        setLoading(false);
        enqueueSnackbar("Book Deleted successfully", { variant: "success" });
        navigate("/");
      })
      .catch((error) => {
        // On error: updating loading state, showing error message, and logging the error
        setLoading(false);
        enqueueSnackbar("Error", { variant: "error" });
        console.log(error);
      });
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Delete Book</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto">
        <h3 className="text-2xl">Are You Sure You want to delete this book?</h3>

        <button
          className="p-4 bg-red-600 text-white m-8 w-full"
          onClick={handleDeleteBook}
        >
          Yes, Delete it
        </button>
      </div>
    </div>
  );
};

export default DeleteBook;
