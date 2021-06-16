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
      genre: "",
      tags: [""],
      minPrice: 0,
      maxPrice: 10000,
    },
    submitted: false,
    books: [],
    genres: [],
  };

  async getGenres() {
    const genres = await genreService.getAllLeafGenres();
    console.log(genres);

    return genres;
  }

  async componentDidMount() {
    const genres = await this.getGenres();

    const data = {
      name: "",
      author: "",
      genre: "",
      tags: [""],
      minPrice: 0,
      maxPrice: 10000,
    };

    this.setState({ data, submitted: false, books: [], genres });
  }

  handleChange = ({ currentTarget: input }) => {
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    console.log("inside hadlesubmit");
    const books = await searchService.advancedSearch(this.state.data);
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
      return <ShowBooksTabular books={this.state.books} />;
    }

    const { data } = this.state;

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
          <div className="form-group">
            <label
              style={{ paddingLeft: 5 }}
              className="form-label"
              htmlFor="genreId"
            >
              Genre
            </label>
            <select
              name="genre"
              onChange={this.handleChange}
              id="genreId"
              className="form-select mb-3"
              value={this.state.data.genreId}
            >
              <option value=""></option>
              {this.state.genres.map((genre) => {
                return (
                  <option key={genre._id} value={genre.name}>
                    {genre.name}
                  </option>
                );
              })}
            </select>
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
