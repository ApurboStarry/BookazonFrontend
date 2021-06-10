import React, { Component } from "react";
import { Link } from "react-router-dom";

import genreService from "../apiServices/genreService";
class Genres extends Component {
  state = { genres: [] };

  async componentDidMount() {
    const genres = await genreService.getAllNonParentGenres();
    console.log(genres);
    this.setState({ genres });
  }

  handleGenreClick(genreId) {
    const filteredGenres = this.state.genres.filter(g => g._id === genreId);
    const genre = filteredGenres[0];

    if(genre.children.length === 0) {
      this.props.history.push("/search/byGenre/" + genreId);
    } else {
      this.props.history.push("/subGenres/" + genreId);
    }
  }

  render() {
    return (
      <div id="displayGenre">
        <ul>
          {this.state.genres.map((genre) => {
            return (
              <h3 key={genre._id}>
                <li>
                  <Link onClick={() => this.handleGenreClick(genre._id)}>
                    {genre.name}
                  </Link>
                </li>
              </h3>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default Genres;
