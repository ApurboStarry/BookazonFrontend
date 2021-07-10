import React, { Component } from "react";
import buyService from "../apiServices/buyService";

class ReportTransaction extends Component {
  state = { transactionId: "", transactionReportText: "" };

  getTransactionIdFromUrl = () => {
    const tokens = this.props.location.pathname.split("/");
    const transactionId = tokens[tokens.length - 1];

    console.log(transactionId);
    return transactionId;
  };

  componentDidMount() {
    this.setState({ transactionId: this.getTransactionIdFromUrl() });
  }

  handleChange = (e) => {
    this.setState({ transactionReportText: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    await buyService.reportTransaction(this.state.transactionId, {
      transactionReportText: this.state.transactionReportText,
    });
    
    this.props.history.push("/");
  };

  isReportSubmitDisabled = () => {
    return this.state.transactionReportText === "";
  };

  render() {
    return (
      <div id="reportTransaction">
        <form onSubmit={this.handleSubmit}>
          <h3>Enter your complain</h3>
          <div className="form-group">
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              value={this.state.transactionReportText}
              onChange={this.handleChange}
              rows="3"
            ></textarea>
          </div>

          <div style={{ textAlign: "center", marginTop: 10 }}>
            <button
              disabled={this.isReportSubmitDisabled()}
              className="btn btn-primary"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default ReportTransaction;
