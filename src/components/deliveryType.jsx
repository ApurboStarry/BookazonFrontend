import React, { Component } from "react";
import Radio from "./common/radio";

class DeliveryType extends Component {
  state = { totalAmount: 0, deliveryType: "" };

  getTotalAmountFromUrl = () => {
    const tokens = this.props.location.search.split("=");
    const totalAmount = tokens[tokens.length - 1];

    return totalAmount;
  };

  componentDidMount() {
    const totalAmount = parseInt(this.getTotalAmountFromUrl());

    this.setState({ totalAmount });
  }

  handleChange = (e) => {
    this.setState({ deliveryType: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if(this.state.deliveryType === "pickup") {
      this.props.history.push(`/confirmPurchase?paymentMethod=cashOnPickup&deliveryType=pickup`);
    } else {
      this.props.history.push("/paymentMethod");
    }
  };

  isDisabled = () => {
    return this.state.deliveryType === "";
  };

  getTotalAmountIncludingDeliveryCharge = () => {
    return this.state.totalAmount + 10;
  };

  render() {
    return (
      <div id="deliveryType">
        <form onSubmit={this.handleSubmit}>
          <div>
            <h3 style={{ marginTop: 10 }}>Choose delivery type</h3>
            <div className="form-check" onChange={this.handleChange}>
              <Radio
                name="delivery-type"
                id="homeDelivery"
                value="homeDelivery"
                label={
                  "Home delivery: Tk " +
                  this.getTotalAmountIncludingDeliveryCharge() +
                  `(Tk ${this.state.totalAmount} + Tk 10(delivery charge))`
                }
                onChange={this.handleChange}
              />
              <Radio
                name="delivery-type"
                id="pickup"
                value="pickup"
                label={"Pickup: Tk " + this.state.totalAmount}
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

export default DeliveryType;
