import React, { Component } from "react";
import bookService from "../apiServices/bookService";
import cartService from "../apiServices/cartService";

class Book extends Component {
  state = {
    book: {
      _id: "",
      name: "",
      authors: [],
      genres: [],
      unitPrice: 0,
      quantity: 0,
      tags: [],
      bookCondition: "",
      description: "",
      seller: "",
    },
    quantity: 1,
  };

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
    if (this.state.book.authors.length === 0) return authors;

    if (this.state.book.authors.length === 1) {
      return this.state.book.authors[0].name;
    } else {
      authors += this.state.book.authors[0].name;
      for (let i = 1; i < this.state.book.authors.length; i++) {
        authors += ", " + this.state.book.authors[i].name;
      }
    }

    return authors;
  };

  canDecreaseQuantity = () => {
    return this.state.quantity > 1;
  };

  canIncreaseQuantity = () => {
    console.log(this.state.book.quantity);
    return this.state.quantity < this.state.book.quantity;
  };

  handleQuantityDecrease = () => {
    const quantity = this.state.quantity - 1;
    this.setState({ quantity });
  }

  handleQuantityIncrease = () => {
    const quantity = this.state.quantity + 1;
    this.setState({ quantity });
  }

  handleAddToCart = async () => {
    await cartService.addBookToCart({
      bookId: this.state.book._id,
      quantity: this.state.quantity,
      unitPrice: this.state.book.unitPrice
    });

    this.props.history.push("/");
  }

  isProductAvailable = () => {
    return this.state.book.quantity > 0;
  }

  getTags = () => {
    let tags = "";
    const { book } = this.state;

    if(book.tags.length > 0) {
      tags += book.tags[0];
    }

    for(let i = 1; i < book.tags.length; i++) {
      tags += ", " + book.tags[i];
    }

    return tags;
  }

  handleBuyNow = async () => {
    await cartService.addBookToCart({
      bookId: this.state.book._id,
      quantity: this.state.quantity,
      unitPrice: this.state.book.unitPrice,
    });
    
    this.props.history.push(
      "/deliveryType?totalAmount=" + this.state.book.unitPrice * this.state.quantity
    );
  }

  getGenres = () => {
    let genres = "";
    
    if(this.state.book.genres.length > 0) {
      genres += this.state.book.genres[0].name;
    }

    for(let i = 1; i < this.state.book.genres.length; i++) {
      genres += ", " +  this.state.book.genres[i].name;
    }

    return genres;
  }

  getBookCondition = () => {
    return (
      this.state.book.bookCondition.charAt(0).toUpperCase() +
      this.state.book.bookCondition.slice(1)
    );
  }

  render() {
    const { book } = this.state;
    console.log(book);
    return (
      <div className="container">
        <div id="displayAParticularBook">
          <p>Title: {book.name}</p>
          <p>Authors: {this.getAuthors()}</p>
          <p>Price: {book.unitPrice}</p>
          <p>Genres: {this.getGenres()}</p>
          <p>Tags: {this.getTags()}</p>
          <p>Condition: {this.getBookCondition()}</p>
          <p>Description: {book.description}</p>
          <p>Seller: {book.seller}</p>
          <p>In Stock: {book.quantity}</p>

          <div
            style={{
              display: this.isProductAvailable() === false ? "block" : "none",
            }}
          >
            <h3 style={{ color: "red" }}>Book sold out</h3>
          </div>

          <div
            style={{
              display: this.isProductAvailable() === true ? "block" : "none",
            }}
          >
            <p>
              Quantity:
              <button
                disabled={!this.canDecreaseQuantity()}
                onClick={this.handleQuantityDecrease}
                className="btn btn-primary m-3"
              >
                -
              </button>
              {this.state.quantity}
              <button
                disabled={!this.canIncreaseQuantity()}
                onClick={this.handleQuantityIncrease}
                className="btn btn-primary m-3"
              >
                +
              </button>
            </p>
            <button onClick={this.handleAddToCart} className="btn btn-warning">
              Add to cart
            </button>
            <button onClick={this.handleBuyNow} className="btn btn-success m-3">Buy now</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Book;
