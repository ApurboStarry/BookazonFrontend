import React, { Component } from "react";
import Radio from "./common/radio";

class PaymentMethod extends Component {
  state = { paymentMethod: "" };

  handleChange = (e) => {
    // console.log(e.target.value);
    this.setState({ paymentMethod: e.target.value });
  };

  isDisabled = () => {
    return this.state.paymentMethod === "";
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state.paymentMethod);
  };

  render() {
    return (
      <div id="paymentMethod">
        <form onSubmit={this.handleSubmit}>
          <div>
            <h3 style={{ marginTop: 10 }}>Choose payment method</h3>
            <div class="form-check" onChange={this.handleChange}>
              <Radio
                name="payment-method"
                id="cashOnDelivery"
                value="cashOnDelivery"
                label="Cash on delivery"
                onChange={this.handleChange}
              />
              <Radio
                name="payment-method"
                id="mobileBanking"
                value="mobileBanking"
                label="Mobile banking"
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
              <button disabled={this.isDisabled()} className="btn btn-primary">Next</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default PaymentMethod;
