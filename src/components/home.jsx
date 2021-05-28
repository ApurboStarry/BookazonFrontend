import React, { Component } from "react";
import bookService from "../apiServices/bookService";

class Home extends Component {
  state = { pageNumber: 1, books: [] };

  async componentDidMount() {
    const books = await bookService.getBooks(this.state.pageNumber);
    books.map((book) => console.log(book));
    this.setState({ books: books });
  }

  render() {
    return (
      <div>
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
                <th className="tableHeader" scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {this.state.books.map((book) => {
                return (
                  <tr key={book._id}>
                    <td>{book.name}</td>
                    <td>{book.genreId.name}</td>
                    <td>{book.unitPrice}</td>
                    <td>
                      <button className="btn btn-success">Add to cart</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Home;
