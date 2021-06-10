import React, { Component } from "react";
import genreService from "../apiServices/genreService";
import {Link} from "react-router-dom";

class SubGenres extends Component {
  state = { genres: [] };

  getGenreIdFromUrl = () => {
    const tokens = this.props.location.pathname.split("/");
    const genreId = tokens[tokens.length - 1];

    return genreId;
  };

  async componentDidMount() {
    const genreId = this.getGenreIdFromUrl();
    const genres = await genreService.getSubgenres(genreId);

    this.setState({ genres });
  }

  async handleGenreClick(genreId) {
    const filteredGenres = this.state.genres.filter((g) => g._id === genreId);
    const genre = filteredGenres[0];

    if (genre.children.length === 0) {
      this.props.history.push("/search/byGenre/" + genreId);
    } else {
      const genres = await genreService.getSubgenres(genreId);
      this.setState({ genres });
    }
  }

  render() {
    console.log("genres", this.state.genres);
    return (
      <div id="displayGenre">
        <ul>
          {this.state.genres.map((genre) => {
            // const searchLink = "/subGenres/" + genre._id;
            // console.log("searchLink", searchLink);
            return (
              <h3 key={genre._id}>
                <li>
                  <p style={{ cursor: "pointer" }} onClick={() => this.handleGenreClick(genre._id)}>
                    {genre.name}
                  </p>
                  {/* <Link to={searchLink}>
                    {genre.name}
                  </Link> */}
                </li>
              </h3>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default SubGenres;
