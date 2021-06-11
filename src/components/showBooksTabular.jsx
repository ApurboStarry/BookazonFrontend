import React, { Component } from 'react';
import { Link } from "react-router-dom";

class ShowBooksTabular extends Component {
  state = {  }
  render() { 
    const { books } = this.props;

    if(books.length === 0) {
      return <h3>No books to show</h3>;
    }

    return (
      <div className="booksTable">
        <table className="table">
          <thead>
            <tr>
              <th className="tableHeader" scope="col">
                Title
              </th>
              <th className="tableHeader" scope="col">
                Genre
              </th>
              <th className="tableHeader" scope="col">
                Unit Price
              </th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => {
              const bookLink = `/book/${book._id}`;
              return (
                <tr key={book._id}>
                  <td>
                    <Link to={bookLink}>{book.name}</Link>
                  </td>
                  <td>{book.genreId.name}</td>
                  <td>{book.unitPrice}</td>
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