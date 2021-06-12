import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class NavBarBottom extends Component {
  state = {};
  render() {
    const user = this.props.user;

    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          {/* <Link className="navbar-brand" to="#">
            Navbar
          </Link> */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul
              className="navbar-nav me-auto mb-2 mb-lg-0"
              style={{ marginLeft: 100 }}
            >
              <li className="nav-item">
                <NavLink className="nav-link" to="/genres">
                  Genres
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/authors">
                  Authors
                </NavLink>
              </li>
              {/* <li className="nav-item">
                <NavLink className="nav-link" to="/publishers">
                  Publishers
                </NavLink>
              </li> */}

              {user && (
                <li className="nav-item">
                  <NavLink className="nav-link" to="/sellbook">
                    Sell Book
                  </NavLink>
                </li>
              )}
              {user && (
                <li className="nav-item">
                  <NavLink className="nav-link" to="/cart">
                    Cart
                  </NavLink>
                </li>
              )}
              {user && (
                <li className="nav-item">
                  <NavLink className="nav-link" to="/profile">
                    Profile
                  </NavLink>
                </li>
              )}
              {user && (
                <li className="nav-item">
                  <NavLink className="nav-link" to="/logout">
                    Logout
                  </NavLink>
                </li>
              )}
              {!user && (
                <li className="nav-item">
                  <NavLink className="nav-link" to="/login">
                    Login
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default NavBarBottom;
