import React, { Component } from "react";

import genreService from "../apiServices/genreService";

class Genres extends Component {
  state = { genres: [] };

  async componentDidMount() {
    const genres = await genreService.getAllGenres();
    console.log(genres);
    this.setState({ genres });
  }

  render() {
    return (
      <div id="displayGenre">
        <ul>
          {this.state.genres.map((genre) => {
            return (
              <h3>
                <li>{genre.name}</li>
              </h3>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default Genres;
