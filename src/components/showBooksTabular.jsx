import React, { Component } from 'react';
import { Link } from "react-router-dom";

class ShowBooksTabular extends Component {
  state = {};

  getGenresOfBook = (book) => {
    let genres = "";
    genres += book.genres[0].name;

    for (let i = 1; i < book.genres.length; i++) {
      genres += ", " + book.genres[i].name;
    }

    return genres;
  };

  getAuthors = (book) => {
    let authors = "";
    if (book.authors.length === 0) return authors;

    if (book.authors.length === 1) {
      return book.authors[0].name;
    } else {
      authors += book.authors[0].name;
      for (let i = 1; i < book.authors.length; i++) {
        authors += ", " + book.authors[i].name;
      }
    }

    return authors;
  };

  getBookCondition = (book) => {
    return (
      book.bookCondition.charAt(0).toUpperCase() + book.bookCondition.slice(1)
    );
  };

  render() {
    const { books } = this.props;

    if (books.length === 0) {
      return <h3>No books to show</h3>;
    }

    console.log(books);

    return (
      <div className="booksTable">
        <table className="table">
          <thead>
            <tr>
              <th className="tableHeader" scope="col">
                Title
              </th>
              <th className="tableHeader" scope="col">
                Genres
              </th>
              <th className="tableHeader" scope="col">
                Authors
              </th>
              <th className="tableHeader" scope="col">
                Condition
              </th>
              <th className="tableHeader" scope="col">
                Unit Price
              </th>
              <th className="tableHeader" scope="col">
                In Stock
              </th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => {
              const bookLink = `/book/${book._id}`;
              const genres = this.getGenresOfBook(book);
              return (
                <tr key={book._id}>
                  <td>
                    <Link to={bookLink}>{book.name}</Link>
                  </td>
                  <td>{genres}</td>
                  <td>{this.getAuthors(book)}</td>
                  <td>{this.getBookCondition(book)}</td>
                  <td>{book.unitPrice}</td>
                  <td>{book.quantity}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
 
export default ShowBooksTabular;