import React, { Component } from 'react';
import authorService from "../apiServices/authorService";
import { Link } from "react-router-dom";
class Authors extends Component {
  state = { authors: [] }
  
  async componentDidMount() {
    const authors = await authorService.getAllAuthors();
    this.setState({ authors });
  }  

  render() { 
    return (
      <div id="displayAuthor">
        <ul>
          {this.state.authors.map((author) => {
            const searchLink = "/search/byAuthor/" + author._id;
            return (
              <h3 key={author._id}>
                <li>
                  <Link to={searchLink}>{author.name}</Link>
                </li>
              </h3>
            );
          })}
        </ul>
      </div>
    );
  }
}
 
export default Authors;