import React, { Component } from "react";
import { Link } from "react-router-dom";
import userService from "../apiServices/userService";

class Profile extends Component {
  state = { email: "", username: "" };

  async componentDidMount() {
    const { email, username } = await userService.getUserDetails();
    this.setState({ email, username });
  }
  
  render() {
    return (
      <div id="showProfile">
        <h3>Email: {this.state.email}</h3>
        <h3>Username: {this.state.username}</h3>
        <h3>
          <Link to="/transactionHistory">Transaction History</Link>
        </h3>
      </div>
    );
  }
}

export default Profile;
