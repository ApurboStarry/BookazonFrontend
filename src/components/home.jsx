import React, { Component } from "react";
import bookService from "../apiServices/bookService";
import { Link } from "react-router-dom";

class Home extends Component {
  state = { pageNumber: 1, pages: [], books: [] };

  async componentDidMount() {
    const books = await bookService.getBooks(this.state.pageNumber);
    const numberOfPages = await bookService.getNumberOfPages();

    const pages = [];
    for (let i = 1; i <= numberOfPages; i++) {
      pages.push(i);
    }

    this.setState({ pageNumber: 1, pages, books });
  }

  handlePageChange = async  (pageNumber) => {
    const books = await bookService.getBooks(pageNumber);
    this.setState({ pageNumber, books });
  };

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
                const bookLink = `/book/${book._id}`
                return (
                  <tr key={book._id}>
                    <td>
                      <Link to={bookLink}>{book.name}</Link>
                    </td>
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

          <nav aria-label="Page navigation example">
            <ul className="pagination">
              {this.state.pages.map((page) => {
                return (
                  <li
                    style={{ cursor: "pointer" }}
                    className={
                      page === this.state.pageNumber ? "page-item active" : "page-item"
                    }
                    key={page}
                  >
                    <a onClick={() => this.handlePageChange(page)} className="page-link">
                      {page}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>
    );
  }
}

export default Home;
