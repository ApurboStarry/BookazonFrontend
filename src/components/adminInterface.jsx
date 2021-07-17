import React, { Component } from "react";
import authService from "../services/authService";
import { Link } from "react-router-dom";

class AdminPanel extends Component {
  state = {
    isAdmin: "",
  };

  async componentDidMount() {
    try {
      const isAdmin = await authService.isAdmin();
      this.setState({ isAdmin });
    } catch (ex) {}
  }

  render() {
    if (this.state.isAdmin !== true) {
      return (
        <div id="adminInterface">
          <h3>Sorry, you don't have admin privilages</h3>
        </div>
      );
    }

    return (
      <div id="adminInterface">
        <h3>Bookazon Admin Interface</h3>
        <ul>
          <li>
            <Link to="/adminInterface/genres">Genres</Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default AdminPanel;
