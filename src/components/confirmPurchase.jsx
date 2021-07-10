import React, { Component } from "react";
import cartService from "../apiServices/cartService";
import buyService from "../apiServices/buyService";
import { toast } from "react-toastify";

class ConfirmPurchase extends Component {
  state = {
    paymentMethod: "",
    deliveryType: "",
    deliveryAddress: "",
    cart: {
      books: [],
      ownerId: "",
      _id: "",
    },
  };

  getIntelFromUrl = () => {
    const tokens = this.props.location.search.split("&");

    let paymentMethod = tokens[0].split("=")[1];
    
    if(paymentMethod === "cashOnPickup") paymentMethod = "Cash on pickup";
    else if(paymentMethod === "cashOnDelivery") paymentMethod = "Cash on delivery";

    let deliveryType = tokens[1].split("=")[1];
    deliveryType = deliveryType === "homeDelivery" ? "Home Delivery" : "Pickup";

    return { paymentMethod, deliveryType };
  };

  async componentDidMount() {
    const { paymentMethod, deliveryType } = this.getIntelFromUrl();
    const cart = await cartService.getAllBooksInCart();
    this.setState({ paymentMethod, deliveryType, cart });
  }

  getTotalPrice = () => {
    const { books } = this.state.cart;
    let totalPrice = 0;

    for (let i = 0; i < books.length; i++) {
      totalPrice += books[i].totalAmount;
    }

    return totalPrice;
  };

  getOrderPrice = () => {
    if(this.state.deliveryType === "Home Delivery") {
      return this.getTotalPrice() + 10;
    } else {
      return this.getTotalPrice();
    }
  }

  handleConfirmOrder = async () => {
    await buyService.buy({
      totalAmount: this.getOrderPrice(),
      paymentMethod: this.state.paymentMethod,
      deliveryType: this.state.deliveryType,
      deliveryAddress: this.state.deliveryAddress
    });

    toast.success("Order confirmed!");
    this.props.history.push("/");
  }

  handleDeliveryAddressChange = (e) => {
    this.setState({ deliveryAddress: e.target.value });
  }

  render() {
    return (
      <div id="cart">
        <h3 style={{ marginTop: 10 }}>Order Details</h3>
        {this.state.cart.books.map((book) => {
          return (
            <div id="booksInCart" key={book._id}>
              <div id="cartDetails">
                <div>{book.bookId.name}</div>
                <div>
                  Quantity:
                  {book.quantity}
                </div>
                <div>Unit Price: {book.unitPrice}</div>
              </div>
            </div>
          );
        })}

        <p>Delivery Type: {this.state.deliveryType}</p>
        {this.state.deliveryType === "Home Delivery" && (
          <div style={{ marginBottom: 20 }} class="form-group">
            <label for="exampleFormControlTextarea1">Delivery Address</label>
            <textarea
              class="form-control"
              id="exampleFormControlTextarea1"
              name="deliveryAddress"
              value={this.state.deliveryAddress}
              onChange={this.handleDeliveryAddressChange}
              rows="3"
            ></textarea>
          </div>
        )}
        <p>Payment Method: {this.state.paymentMethod}</p>
        <p>Total Price: {this.getOrderPrice()}</p>
        <button onClick={this.handleConfirmOrder} className="btn btn-success">
          Confirm Order
        </button>
      </div>
    );
  }
}

export default ConfirmPurchase;
