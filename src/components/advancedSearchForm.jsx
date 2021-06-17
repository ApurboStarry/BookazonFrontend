import React, { Component } from "react";
import Input from "./common/input";
import ShowBooksTabular from "./showBooksTabular";
import searchService from "../apiServices/searchService";
import genreService from "../apiServices/genreService";

class AdvancedSearchForm extends Component {
  state = {
    data: {
      name: "",
      author: "",
      genres: [{ _id: "1", name: "" }],
      tags: [""],
      minPrice: 0,
      maxPrice: 10000,
    },
    submitted: false,
    books: [],
    availableGenres: [[{ _id: "1", name: "" }]],
  };

  handleAddNewGenre = async (e) => {
    e.preventDefault();

    const allGenres = await this.getAllNonParentGenres();
    const { availableGenres } = this.state;
    console.log("availableGenres", availableGenres);
    availableGenres.push(allGenres);

    const data = { ...this.state.data };
    data.genres.push(availableGenres[0][0]._id);

    this.setState({ data, availableGenres });
  };

  async getAllNonParentGenres() {
    const genres = await genreService.getAllNonParentGenres();
    console.log("length", this.state.availableGenres.length);
    genres.splice(0, 0, {
      _id: this.state.availableGenres.length + 1,
      name: "",
    });
    console.log(genres);

    return genres;
  }

  async componentDidMount() {
    const genres = [];
    const allGenres = await this.getAllNonParentGenres();
    genres.push(allGenres);

    const data = {
      name: "",
      author: "",
      genres: [genres[0][0]._id],
      tags: [""],
      minPrice: 0,
      maxPrice: 10000,
    };

    this.setState({
      data,
      submitted: false,
      books: [],
      availableGenres: genres,
    });
  }

  getGenreName = (index, genreId) => {
    console.log("bull", index);
    for (let i = 0; i < this.state.availableGenres.length; i++) {
      if (this.state.availableGenres[index][i]._id === genreId)
        return this.state.availableGenres[index][i].name;
    }
  };

  getSubgenres = async (genreId) => {
    const genres = await genreService.getSubgenres(genreId);
    return genres;
  };

  getFromAvailableGenres = (genreIndex, genreId) => {
    const { availableGenres } = this.state;
    console.log("inside getFromAvailableGenres", genreIndex, availableGenres);
    for (let i = 0; i < availableGenres[genreIndex].length; i++) {
      if (availableGenres[genreIndex][i]._id === genreId)
        return availableGenres[genreIndex][i];
    }
  };

  handleGenreChange = async ({ currentTarget: input }) => {
    const { data } = this.state;

    if (input.value !== "") {
      const genreIndex = input.name;
      const genreId = input.value;
      data.genres[genreIndex] = this.getFromAvailableGenres(
        genreIndex,
        genreId
      );

      const children = await genreService.getSubgenres(genreId);
      if (children.length > 0) {
        const { availableGenres } = this.state;
        availableGenres[genreIndex] = children;

        this.setState({ data, availableGenres });
      } else {
        this.setState({ data });
      }
    }
  };

  handleChange = ({ currentTarget: input }) => {
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data });
  };

  getFormattedData = () => {
    const genres = [];
    for (let i = 0; i < this.state.data.genres.length; i++) {
      genres.push(this.state.data.genres[i]._id);
    }

    const data = { ...this.state.data };
    data.genres = genres;
    return data;
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    console.log("inside hadlesubmit", this.getFormattedData());
    const books = await searchService.advancedSearch(this.getFormattedData());
    console.log(books);
    this.setState({ books, submitted: true });
  };

  handleTagChange = ({ currentTarget: input }) => {
    const data = { ...this.state.data };

    const index = parseInt(input.name);
    const value = input.value;
    data.tags[index] = value;

    this.setState({ data });
  };

  handleTagDelete = (index) => {
    const data = { ...this.state.data };
    data.tags.splice(index, 1);

    this.setState({ data });
  };

  handleAddTagButton = (e) => {
    e.preventDefault();
    const data = { ...this.state.data };
    data.tags.push("");
    console.log("Inside handleAddTagButton");

    this.setState({ data });
  };

  render() {
    if (this.state.submitted === true) {
      return (
        <ShowBooksTabular
          books={this.state.books}
        />
      );
    }

    const { data, availableGenres } = this.state;

    return (
      <div style={{ paddingBottom: 50 }} className="formStyle">
        <h1>Enter search criteria</h1>
        <form onSubmit={this.handleSubmit}>
          <Input
            name="name"
            value={data.name}
            label="Title"
            onChange={this.handleChange}
          />
          <Input
            name="author"
            value={data.author}
            label="Author"
            onChange={this.handleChange}
          />
          <div id="addBookGenres">
            <label
              style={{ paddingLeft: 5 }}
              className="form-label"
              htmlFor="genres"
            >
              Genres
            </label>
            <div style={{ marginLeft: 20, marginRight: 20, marginBottom: 20 }}>
              {availableGenres.map((genres, index) => {
                return (
                  <select
                    value={this.state.data.genres[index]._id}
                    onChange={this.handleGenreChange}
                    key={this.state.data.genres[index]._id}
                    style={{ marginBottom: 20 }}
                    className="form-select"
                    name={index}
                  >
                    {availableGenres[index].map((genre, index) => {
                      return (
                        <option value={genre._id} key={genre._id}>
                          {genre.name}
                        </option>
                      );
                    })}
                  </select>
                );
              })}

              <button
                onClick={this.handleAddNewGenre}
                className="btn btn-success"
              >
                Add genre
              </button>
            </div>
          </div>

          <div id="addAuthor">
            <label
              style={{ paddingLeft: 5 }}
              htmlFor={"tags"}
              className="form-label"
            >
              Tags
            </label>
            <div
              style={{ marginLeft: 20, marginRight: 20, marginBottom: 20 }}
              className="authorsInput"
            >
              {this.state.data.tags.map((tag, index) => {
                return (
                  <div key={index} className="d-flex flex-row mb-3">
                    <input
                      name={index}
                      value={this.state.data.tags[index]}
                      onChange={this.handleTagChange}
                      className="form-control"
                    />
                    {index > 0 && (
                      <span style={{ cursor: "pointer", padding: 10 }}>
                        <i
                          onClick={() => this.handleTagDelete(index)}
                          className="fa fa-trash"
                          aria-hidden="true"
                        ></i>
                      </span>
                    )}
                  </div>
                );
              })}
              <button
                style={{ marginTop: 10 }}
                onClick={this.handleAddTagButton}
                className="btn btn-success"
              >
                Add tag
              </button>
            </div>
          </div>

          <Input
            name="minPrice"
            value={data.minPrice}
            label="Minimum Price"
            onChange={this.handleChange}
          />
          <Input
            name="maxPrice"
            value={data.maxPrice}
            label="Maximum Price"
            onChange={this.handleChange}
          />
          <div style={{ textAlign: "center" }}>
            <button className="btn btn-primary">Search</button>
          </div>
        </form>
      </div>
    );
  }
}

export default AdvancedSearchForm;
