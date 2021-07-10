import React, { Component } from "react";
import Radio from "./common/radio";

class PaymentMethod extends Component {
  state = { paymentMethod: "", deliveryAddress: "" };

  handleChange = (e) => {
    // console.log(e.target.value);
    this.setState({ paymentMethod: e.target.value });
  };

  isDisabled = () => {
    return this.state.paymentMethod === "";
  };

  handleSubmit = (e) => {
    e.preventDefault();

    if (this.state.paymentMethod === "cashOnDelivery") {
      this.props.history.push(
        `/confirmPurchase?paymentMetod=cashOnDelivery&deliveryType=homeDelivery`
      );
    } else if (this.state.paymentMethod === "mobileBanking") {
      this.props.history.push("/mobileBanking");
    } else {
      this.props.history.push("/creditDebitCard");
    }
  };

  handleDeliveryAddressChange = ({ currentTarget: input }) => {
    this.setState({ deliveryAddress: input.value });
  }

  render() {
    return (
      <div id="paymentMethod">
        <form onSubmit={this.handleSubmit}>
          <div>
            <h3 style={{ marginTop: 10 }}>Choose payment method</h3>
            <div className="form-check" onChange={this.handleChange}>
              <Radio
                name="payment-method"
                id="cashOnDelivery"
                value="cashOnDelivery"
                label="Cash on delivery"
                onChange={this.handleChange}
              />
              <Radio
                name="payment-method"
                label="Mobile banking"
                id="mobileBanking"
                value="mobileBanking"
                onChange={this.handleChange}
              />
              <Radio
                name="payment-method"
                id="creditDebitCard"
                value="creditDebitCard"
                label="Credit/Debit card"
                onChange={this.handleChange}
              />
            </div>
            <div style={{ marginTop: 10 }}>
              <button disabled={this.isDisabled()} className="btn btn-primary">
                Next
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default PaymentMethod;
