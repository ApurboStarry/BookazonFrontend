import React, { Component } from 'react';
import { Link } from "react-router-dom";

class NavBarTop extends Component {
  state = { searchText: "" }

  componentDidMount() {
    
  }

  // componentDidUpdate(prevProps, prevState) {
  //   console.log(prevProps, this.props);
  //   if(prevProps.history.location !== this.props.history.location) {
  //     console.log("$$$", this.state.searchText);
  //   }
  // }

  handleSearchChange = ({ currentTarget: input }) => {
    const searchText = input.value;
    this.setState({ searchText });
  };

  handleSearchSubmit = () => {
    this.props.history.push("/search/byTitle/" + this.state.searchText);
  };

  checkSearchButtonDisability = () => {
    return this.state.searchText === "";
  }

  getLink = () => {
    return this.state.searchText;
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Bookazon
          </Link>
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
            <div className="input-group m-3">
              {/* <form onSubmit={this.handleSearchSubmit}>
                
              </form> */}
              <input
                type="text"
                name="searchByTitle"
                value={this.state.searchText}
                onChange={this.handleSearchChange}
                className="form-control"
                placeholder="Search book by title"
              />
              <button
                disabled={this.checkSearchButtonDisability()}
                onClick={this.handleSearchSubmit}
                className="btn btn-primary"
                id="basic-addon2"
              >
                Search
              </button>
            </div>
          </div>
          <Link to="/advancedSearch">
            <button className="btn btn-success">Advanced Search</button>
          </Link>
        </div>
      </nav>
    );
  }
}
 
export default NavBarTop;