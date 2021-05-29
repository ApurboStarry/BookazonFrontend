import React, { Component } from "react";
import bookService from "../apiServices/bookService";

class Book extends Component {
  state = { book: {name: "", unitPrice: 0, genre: "", seller: "", authors: []} };

  getBookIdFromUrl = () => {
    const tokens = this.props.location.pathname.split("/");
    const bookId = tokens[tokens.length - 1];

    return bookId;
  };

  async componentDidMount() {
    const bookId = this.getBookIdFromUrl();
    const book = await bookService.getBookById(bookId);
    console.log(book);

    this.setState({ book });
  }

  getAuthors = () => {
    let authors = "";
    if(this.state.book.authors.length === 1) {
      return this.state.book.authors;
    } else {
      for(let i = 0; i < this.state.book.authors.length; i++) {
        authors += this.state.book.authors[i].name + ", ";
      }
    }

    return authors;
  }

  render() {
    const {book} = this.state;
    console.log(book);
    return (
      <div id="displayAParticularBook">
        <h2>Title: {book.name}</h2>
        <h2>Authors: {this.getAuthors()}</h2>
        <h2>Unit Price: {book.unitPrice}</h2>
        <h2>Genre: {book.genre}</h2>
        <h2>Seller: {book.seller}</h2>
      </div>
    );
  }
}

export default Book;
