import React, { Component } from "react";
import Radio from "./common/radio";

class MobileBanking extends Component {
  state = { paymentMethod: "" };

  handleChange = (e) => {
    this.setState({ paymentMethod: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.history.push(`/confirmPurchase?paymentMethod=${this.state.paymentMethod}&deliveryType=homeDelivery`);
  }

  isDisabled = () => {
    return this.state.paymentMethod === "";
  }

  render() {
    return (
      <div id="chooseMoblieBankingMethod">
        <form onSubmit={this.handleSubmit}>
          <div>
            <h3 style={{ marginTop: 10 }}>Choose payment method</h3>
            <div className="form-check" onChange={this.handleChange}>
              <Radio
                name="mobile-banking"
                id="bKash"
                value="bKash"
                label="bKash"
                onChange={this.handleChange}
              />
              <Radio
                name="mobile-banking"
                id="Rocket"
                value="Rocket"
                label="Rocket"
                onChange={this.handleChange}
              />
              <Radio
                name="mobile-banking"
                id="Nagad"
                value="Nagad"
                label="Nagad"
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

export default MobileBanking;
