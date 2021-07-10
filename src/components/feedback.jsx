import React, { Component } from "react";
import { toast } from "react-toastify";

class Feedback extends Component {
  state = { feedbackText: "" };

  isFeedbackSubmitDisabled = () => {
    return this.state.feedbackText === "";
  }

  handleFeedbackTextChange = (e) => {
    this.setState({ feedbackText: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    toast.success("Your response has been recorded");
    this.props.history.push("/");
  };

  render() {
    return (
      <div id="feedbackForm">
        <form onSubmit={this.handleSubmit}>
          <h3>Enter your feedback</h3>
          <div className="form-group">
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              value={this.state.feedbackText}
              onChange={this.handleFeedbackTextChange}
              rows="3"
            ></textarea>
          </div>
          <div style={{ textAlign: "center", marginTop: 10 }}>
            <button
              disabled={this.isFeedbackSubmitDisabled()}
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

export default Feedback;
