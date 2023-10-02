// Importing the 'mongoose' library
import mongoose from 'mongoose';

// Defining a schema for a book using 'mongoose.Schema'
const bookSchema = mongoose.Schema(
  {
    // Defining a field 'title' of type String, which is required
    title: {
      type: String,
      required: true,
    },
    
    // Defining a field 'author' of type String, which is required
    author: {
      type: String,
      required: true,
    },
    
    // Defining a field 'publishYear' of type Number, which is required
    publishYear: {
      type: Number,
      required: true,
    },
  },
  
  // Providing additional options for the schema, in this case, setting 'timestamps' to true
  {
    timestamps: true,
  }
);

// Creating a model named 'Book' using the defined schema
export const Book = mongoose.model('Book', bookSchema);
