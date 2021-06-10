import React, { Component } from "react";
import Input from "./common/input";
import { apiUrl } from "../config.json";
import httpService from "../services/httpService";
import genreService from "../apiServices/genreService";

const apiEndpoint = apiUrl + "/books";

class SellBook extends Component {
  state = {
    data: { name: "", quantity: "", unitPrice: "", genreId: "", authors: [""] },
    errors: {},
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
      quantity: "",
      unitPrice: "",
      genreId: genres[0]._id,
      authors: [""],
    };
    this.setState({ data, genres });
  }

  validate = () => {
    const errors = {};

    const { data } = this.state;

    if (data.name.trim() === "") {
      errors.name = "Name is required";
    }

    return Object.keys(errors).length === 0 ? null : errors;
  };

  parseInts = () => {
    this.state.data.quantity = parseInt(this.state.data.quantity);
    this.state.data.unitPrice = parseInt(this.state.data.unitPrice);
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });

    if (errors) return;

    this.parseInts();
    this.doSubmit();
  };

  doSubmit = async () => {
    try {
      await httpService.post(apiEndpoint, this.state.data);
      this.props.history.push("/");
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  validateProperty = ({ name, value }) => {
    if (name === "name") {
      if (value.trim() === "") return "Name is required";
    }
    if (name === "quantity") {
      if (isNaN(value)) return "Quantity must be a number";
      if (parseInt(value) < 1) return "Quantity must be at least 1";
    }
    if (name === "unitPrice") {
      if (isNaN(value)) return "Unit Price must be a number";
      if (parseInt(value) < 1) return "Unit Price must be at least 1";
    }
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
  };

  handleAuthorChange = ({ currentTarget: input }) => {
    const data = { ...this.state.data };

    const index = parseInt(input.name);
    const value = input.value;
    data.authors[index] = value;

    this.setState({ data });
  };

  handleAddAuthor = () => {
    const data = { ...this.state.data };
    data.authors.push("");

    console.log(data);

    this.setState({ data });
  };

  handleAuthorDelete = (index) => {
    const data = { ...this.state.data };
    data.authors.splice(index, 1);

    this.setState({ data });
  };

  render() {
    const { data, errors } = this.state;

    return (
      <div style={{ paddingBottom: 50 }} className="formStyle">
        <h1>Enter book details</h1>
        <form onSubmit={this.handleSubmit}>
          <Input
            name="name"
            value={data.name}
            label="Title"
            onChange={this.handleChange}
            error={errors.name}
          />

          <div id="addAuthor">
            <label
              style={{ paddingLeft: 5 }}
              htmlFor={"authors"}
              className="form-label"
            >
              Authors
            </label>
            <div
              style={{ marginLeft: 20, marginRight: 20, marginBottom: 20 }}
              className="authorsInput"
            >
              {this.state.data.authors.map((author, index) => {
                return (
                  <div key={index} className="d-flex flex-row mb-3">
                    <input
                      name={index}
                      value={this.state.data.authors[index]}
                      onChange={this.handleAuthorChange}
                      className="form-control"
                    />
                    {index > 0 && (
                      <span style={{ cursor: "pointer", padding: 10 }}>
                        <i
                          onClick={() => this.handleAuthorDelete(index)}
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
                onClick={this.handleAddAuthor}
                className="btn btn-success"
              >
                Add Author
              </button>
            </div>
          </div>

          <div className="form-group">
            <label
              style={{ paddingLeft: 5 }}
              className="form-label"
              htmlFor="genreId"
            >
              Genre
            </label>
            <select
              name="genreId"
              onChange={this.handleChange}
              id="genreId"
              className="form-select mb-3"
              value={this.state.data.genreId}
            >
              <option value="0"></option>
              {this.state.genres.map((genre) => {
                return (
                  <option key={genre._id} value={genre._id}>
                    {genre.name}
                  </option>
                );
              })}
            </select>
          </div>

          <Input
            name="quantity"
            value={data.quantity}
            label="Quantity"
            onChange={this.handleChange}
            error={errors.quantity}
          />
          <Input
            name="unitPrice"
            value={data.unitPrice}
            label="Unit Price"
            onChange={this.handleChange}
            error={errors.unitPrice}
          />

          <div style={{ textAlign: "center" }}>
            <button disabled={this.validate()} className="btn btn-primary">
              Add Book
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default SellBook;
