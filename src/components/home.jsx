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
    isSortedByLocation: false,
    location: {
      latitude: 0.0,
      longitude: 0.0,
    },
  };

  async componentDidMount() {
    const books = await bookService.getBooks(this.state.pageNumber);
    const numberOfPages = await bookService.getNumberOfPages();

    console.log(books);

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
    this.setState({ books, sortByTitle, sortByGenre: 0, sortByGenre: 0 });
  };

  handleSortByGenre = async () => {
    const sortByGenre =
      this.state.sortByGenre === 0 || this.state.sortByGenre === -1 ? 1 : -1;
    const order = sortByGenre === 1 ? "ascending" : "descending";
    const books = await bookService.getBooksSortedByGenre(order);
    this.setState({ books, sortByTitle: 0, sortByGenre, sortByUnitPrice: 0 });
  };

  handleSortByUnitPrice = async () => {
    const sortByUnitPrice =
      this.state.sortByUnitPrice === 0 || this.state.sortByUnitPrice === -1
        ? 1
        : -1;
    const order = sortByUnitPrice === 1 ? "ascending" : "descending";
    const books = await bookService.getBooksSortedByUnitPrice(order);
    this.setState({ books, sortByTitle: 0, sortByGenre: 0, sortByUnitPrice });
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

  getBookCondition = (book) => {
    return (
      book.bookCondition.charAt(0).toUpperCase() + book.bookCondition.slice(1)
    );
  };

  handleSortByLocation = async (e) => {
    e.preventDefault();

    if (navigator.geolocation) {
      const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      };

      const result = await navigator.permissions.query({ name: "geolocation" });

      if (result.state === "granted") {
        navigator.geolocation.getCurrentPosition(this.success);
      } else if (result.state === "prompt") {
        navigator.geolocation.getCurrentPosition(
          this.success,
          this.errors,
          options
        );
      } else {
        alert(
          "You have denied to access your location. So, books cannot be sorted based on your current location."
        );
      }
    } else {
      alert(
        "Cannot get your location from the browser. So, books cannot be sorted based on your current location."
      );
    }
  };

  errors = (err) => {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  };

  success = async (pos) => {
    var coordinate = pos.coords;

    // console.log("Your current position is:");
    // console.log(`Latitude : ${coordinate.latitude}`);
    // console.log(`Longitude: ${coordinate.longitude}`);
    // console.log(`More or less ${coordinate.accuracy} meters.`);

    const { location } = this.state;

    location.latitude = coordinate.latitude;
    location.longitude = coordinate.longitude;

    const isSortedByLocation = this.state.isSortedByLocation;
    let books;

    console.log(location);

    if (!isSortedByLocation) {
      // sort based on location
      books = await bookService.getBooksSortedByLocation(location.latitude, location.longitude);
    } else {
      // no sort
      books = await bookService.getBooks(this.state.pageNumber);
    }

    this.setState({ books, isSortedByLocation: !isSortedByLocation, location });
  };

  render() {
    return (
      <div>
        <div className="booksTable">
          <div style={{ marginTop: 10 }} className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="flexCheckDefault"
              checked={this.state.isSortedByLocation}
              onChange={this.handleSortByLocation}
            />
            <label className="form-check-label" htmlFor="flexCheckDefault">
              Sort books closest to your location
            </label>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th
                  onClick={this.handleSortByTitle}
                  className="tableHeader sortEnabledTableHeader"
                  scope="col"
                >
                  Title{" "}
                  {this.state.sortByTitle === 1 && (
                    <span>
                      <i className="fa fa-sort-asc" aria-hidden="true"></i>
                    </span>
                  )}
                  {this.state.sortByTitle === -1 && (
                    <span>
                      <i className="fa fa-sort-desc" aria-hidden="true"></i>
                    </span>
                  )}
                </th>
                <th
                  onClick={this.handleSortByGenre}
                  className="tableHeader sortEnabledTableHeader"
                  scope="col"
                >
                  Genre
                  {this.state.sortByGenre === 1 && (
                    <span style={{ padding: 5 }}>
                      <i className="fa fa-sort-asc" aria-hidden="true"></i>
                    </span>
                  )}
                  {this.state.sortByGenre === -1 && (
                    <span style={{ padding: 5 }}>
                      <i className="fa fa-sort-desc" aria-hidden="true"></i>
                    </span>
                  )}
                </th>
                <th className="tableHeader" scope="col">
                  Authors
                </th>
                <th className="tableHeader" scope="col">
                  Condition
                </th>
                <th
                  onClick={this.handleSortByUnitPrice}
                  className="tableHeader sortEnabledTableHeader"
                  scope="col"
                >
                  Unit Price
                  {this.state.sortByUnitPrice === 1 && (
                    <span style={{ padding: 5 }}>
                      <i className="fa fa-sort-asc" aria-hidden="true"></i>
                    </span>
                  )}
                  {this.state.sortByUnitPrice === -1 && (
                    <span style={{ padding: 5 }}>
                      <i className="fa fa-sort-desc" aria-hidden="true"></i>
                    </span>
                  )}
                </th>
                <th className="tableHeader" scope="col">
                  In Stock
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
                    <td>{this.getBookCondition(book)}</td>
                    <td>{book.unitPrice}</td>
                    <td>{book.quantity}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {!this.isSortApplied() && !this.state.isSortedByLocation && (
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
