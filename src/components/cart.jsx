import React, { Component } from "react";
import cartService from "../apiServices/cartService";
import { toast } from "react-toastify";

class Cart extends Component {
  state = {
    cart: {
      books: [],
      ownerId: "",
      _id: "",
    },
    totalPrice: 0,
  };

  getTotalPrice = () => {
    const { books } = this.state.cart;
    let totalPrice = 0;

    for (let i = 0; i < books.length; i++) {
      totalPrice += books[i].totalAmount;
    }

    return totalPrice;
  };

  calculateTotalPrice = (cart) => {
    if(!cart) return 0;

    const { books } = cart;
    let totalPrice = 0;

    for (let i = 0; i < books.length; i++) {
      totalPrice += books[i].quantity * books[i].unitPrice;
    }

    return totalPrice;
  }

  async componentDidMount() {
    const cart = await cartService.getAllBooksInCart();
    const totalPrice = this.calculateTotalPrice(cart);
    this.setState({ cart, totalPrice });
  }

  getBookIndex = (bookId) => {
    const { books } = this.state.cart;
    let index;
    for (let i = 0; i < books.length; i++) {
      if (books[i]._id === bookId) {
        index = i;
      }
    }

    return index;
  };

  canIncrease = (bookId) => {
    const index = this.getBookIndex(bookId);

    const { books } = this.state.cart;
    return books[index].quantity < books[index].bookId.quantity;
  };

  handleQuantityIncrease = (bookId) => {
    const index = this.getBookIndex(bookId);
    const { books } = this.state.cart;

    books[index].quantity += 1;

    const cart = {...this.state};
    cart.books = books;

    this.setState({ books });
  };

  canDecrease = (bookId) => {
    const index = this.getBookIndex(bookId);

    const { books } = this.state.cart;
    return books[index].quantity > 1;
  };

  handleQuantityDecrease = (bookId) => {
    const index = this.getBookIndex(bookId);
    const { books } = this.state.cart;

    books[index].quantity -= 1;

    this.setState({ books });
  };

  handleQuantityUpdate = async (bookInCartId) => {
    const index = this.getBookIndex(bookInCartId);
    const { books } = this.state.cart;
    await cartService.updateQuantityOfABook(
      bookInCartId,
      books[index].quantity
    );

    toast.success("Updated!");

    const totalPrice = this.calculateTotalPrice(this.state.cart);
    this.setState({ totalPrice });
  };

  handleBookDelete = async (bookInCartId) => {
    const index = this.getBookIndex(bookInCartId);
    const { books } = this.state.cart;
    books.splice(index, 1);
    await cartService.deleteBook(bookInCartId);

    toast.error("Deleted!");
    this.setState({ books });
  };

  handleProceedToPayment = () => {
    this.props.history.push(
      "/deliveryType?totalAmount=" + this.getTotalPrice()
    );
  };

  render() {
    if (!this.state.cart || this.state.cart.books.length === 0) {
      return <h3 style={{width: "80%", margin: "0 auto"}}>Nothing in the cart right now</h3>;
    }

    return (
      <div id="cart">
        {this.state.cart.books.map((book) => {
          return (
            <div id="booksInCart" key={book._id}>
              <div style={{ float: "left" }} id="cartDetails">
                <div>{book.bookId.name}</div>
                <div>
                  Quantity:
                  <button
                    disabled={!this.canDecrease(book._id)}
                    onClick={() => this.handleQuantityDecrease(book._id)}
                    className="btn btn-primary cartQuantityButton"
                  >
                    -
                  </button>
                  {book.quantity}
                  <button
                    disabled={!this.canIncrease(book._id)}
                    onClick={() => this.handleQuantityIncrease(book._id)}
                    className="btn btn-primary cartQuantityButton"
                  >
                    +
                  </button>
                </div>
                <div>Unit Price: {book.unitPrice}</div>
                <div>
                  <button
                    onClick={() => this.handleQuantityUpdate(book._id)}
                    className="btn btn-success"
                  >
                    Update
                  </button>
                </div>
              </div>
              <div style={{ float: "right" }} id="cartBookDelete">
                <button
                  onClick={() => this.handleBookDelete(book._id)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </div>
              <div style={{ clear: "both" }}></div>
            </div>
          );
        })}

        <h5>Total Price: {this.state.totalPrice}</h5>
        <button
          onClick={this.handleProceedToPayment}
          className="btn btn-warning"
        >
          Proceed to payment
        </button>
      </div>
    );
  }
}

export default Cart;
