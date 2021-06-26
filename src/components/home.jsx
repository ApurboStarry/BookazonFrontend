import React, { Component } from "react";
import bookService from "../apiServices/bookService";
import { Link } from "react-router-dom";

class Home extends Component {
  state = {
    pageNumber: 1,
    pages: [],
    books: [],
    sortByTitle: 0,
    sortByGenre: 0,
    sortByUnitPrice: 0,
  };

  async componentDidMount() {
    const books = await bookService.getBooks(this.state.pageNumber);
    const numberOfPages = await bookService.getNumberOfPages();

    const pages = [];
    for (let i = 1; i <= numberOfPages; i++) {
      pages.push(i);
    }

    this.setState({ pageNumber: 1, pages, books });
  }

  handlePageChange = async (pageNumber) => {
    const books = await bookService.getBooks(pageNumber);
    this.setState({ pageNumber, books });
  };

  handleSortByTitle = async () => {
    const sortByTitle =
      this.state.sortByTitle === 0 || this.state.sortByTitle === -1 ? 1 : -1;
    const order = sortByTitle === 1 ? "ascending" : "descending";
    const books = await bookService.getBooksSortedByTitle(order);
    this.setState({ books, sortByTitle });
  };

  handleSortByGenre = async () => {
    const sortByGenre =
      this.state.sortByGenre === 0 || this.state.sortByGenre === -1 ? 1 : -1;
    const order = sortByGenre === 1 ? "ascending" : "descending";
    const books = await bookService.getBooksSortedByGenre(order);
    this.setState({ books, sortByGenre });
  };

  handleSortByUnitPrice = async () => {
    const sortByUnitPrice =
      this.state.sortByUnitPrice === 0 || this.state.sortByUnitPrice === -1
        ? 1
        : -1;
    const order = sortByUnitPrice === 1 ? "ascending" : "descending";
    const books = await bookService.getBooksSortedByUnitPrice(order);
    this.setState({ books, sortByUnitPrice });
  };

  isSortApplied = () => {
    return (
      this.state.sortByTitle !== 0 ||
      this.state.sortByGenre !== 0 ||
      this.state.sortByUnitPrice !== 0
    );
  };

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

  render() {
    return (
      <div>
        <div className="booksTable">
          <table className="table">
            <thead>
              <tr>
                <th
                  onClick={this.handleSortByTitle}
                  className="tableHeader sortEnabledTableHeader"
                  scope="col"
                >
                  Title
                </th>
                <th
                  onClick={this.handleSortByGenre}
                  className="tableHeader sortEnabledTableHeader"
                  scope="col"
                >
                  Genre
                </th>
                <th className="tableHeader sortEnabledTableHeader" scope="col">
                  Authors
                </th>
                <th
                  onClick={this.handleSortByUnitPrice}
                  className="tableHeader sortEnabledTableHeader"
                  scope="col"
                >
                  Unit Price
                </th>
              </tr>
            </thead>
            <tbody>
              {this.state.books.map((book) => {
                const bookLink = `/book/${book._id}`;
                return (
                  <tr key={book._id}>
                    <td>
                      <Link to={bookLink}>{book.name}</Link>
                    </td>
                    <td>{this.getGenresOfBook(book)}</td>
                    <td>{this.getAuthors(book)}</td>
                    <td>{book.unitPrice}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {!this.isSortApplied() && (
            <nav aria-label="Page navigation example">
              <ul className="pagination">
                {this.state.pages.map((page) => {
                  return (
                    <li
                      style={{ cursor: "pointer" }}
                      className={
                        page === this.state.pageNumber
                          ? "page-item active"
                          : "page-item"
                      }
                      key={page}
                    >
                      <a
                        onClick={() => this.handlePageChange(page)}
                        className="page-link"
                      >
                        {page}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>
          )}
        </div>
      </div>
    );
  }
}

export default Home;
