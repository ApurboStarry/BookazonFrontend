import React, { Component } from "react";
import Input from "./common/input";
import { apiUrl } from "../config.json";
import httpService from "../services/httpService";
import genreService from "../apiServices/genreService";

const apiEndpoint = apiUrl + "/books";

// function success(pos) {
//   var crd = pos.coords;

//   console.log("Your current position is:");
//   console.log(`Latitude : ${crd.latitude}`);
//   console.log(`Longitude: ${crd.longitude}`);
//   console.log(`More or less ${crd.accuracy} meters.`);
// }

// function errors(err) {
//   console.warn(`ERROR(${err.code}): ${err.message}`);
// }
class SellBook extends Component {
  state = {
    data: {
      name: "",
      quantity: 0,
      unitPrice: 1,
      genres: [{ _id: "1", name: "" }],
      authors: [""],
      tags: [""],
      location: {
        latitude: 0.0,
        longitude: 0.0,
      },
    },
    errors: {},
    availableGenres: [[{ _id: "1", name: "" }]],
    selectedGenres: [],
  };

  handleAddNewGenre = async () => {
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

    const selectedGenres = [];

    const data = {
      name: "",
      quantity: "",
      unitPrice: "",
      genres: [genres[0][0]._id],
      authors: [""],
      tags: [""],
      location: {
        latitude: 0.0,
        longitude: 0.0,
      },
    };
    this.setState({ data, availableGenres: genres, selectedGenres });
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

  getFormattedData = () => {
    const genres = [];
    for (let i = 0; i < this.state.data.genres.length; i++) {
      genres.push(this.state.data.genres[i]._id);
    }

    const data = { ...this.state.data };
    data.genres = genres;

    if(data.tags.length === 1 && data.tags[0] === "") {
      data.tags = [];
    }

    return data;
  };

  doSubmit = async () => {
    try {
      await httpService.post(apiEndpoint, this.getFormattedData());
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
      if (value.trim() === "") return "Title is required";
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
        data.genres[genreIndex] = children[0];

        this.setState({ data, availableGenres });
      } else {
        this.setState({ data });
      }
    }
  };

  printSelectedGenres = () => {
    let genresToBePrinted = "";
    const { selectedGenres } = this.state;
    if (selectedGenres.length === 0) return genresToBePrinted;
    else if (selectedGenres.length === 1) return selectedGenres[0];
    else {
      genresToBePrinted += selectedGenres[0];
      for (let i = 1; i < selectedGenres.length; i++) {
        genresToBePrinted += " -> ";
        genresToBePrinted += selectedGenres[i];
      }

      return genresToBePrinted;
    }
  };

  handleAuthorChange = ({ currentTarget: input }) => {
    const data = { ...this.state.data };

    const index = parseInt(input.name);
    const value = input.value;
    data.authors[index] = value;

    this.setState({ data });
  };

  handleTagChange = ({ currentTarget: input }) => {
    const data = { ...this.state.data };

    const index = parseInt(input.name);
    const value = input.value;
    data.tags[index] = value;

    this.setState({ data });
  };

  handleAddAuthor = () => {
    const data = { ...this.state.data };
    data.authors.push("");

    this.setState({ data });
  };

  handleAddTag = () => {
    const data = { ...this.state.data };
    data.tags.push("");

    this.setState({ data });
  };

  handleAuthorDelete = (index) => {
    const data = { ...this.state.data };
    data.authors.splice(index, 1);

    this.setState({ data });
  };

  handleTagDelete = (index) => {
    const data = { ...this.state.data };
    data.tags.splice(index, 1);

    this.setState({ data });
  };

  handleUseCurrentLocation = async (e) => {
    e.preventDefault();
    
    if (navigator.geolocation) {
      const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      };

      const result = await navigator.permissions
        .query({ name: "geolocation" });
      
      if(result.state === "granted") {
        navigator.geolocation.getCurrentPosition(this.success);
      } else if(result.state === "prompt") {
        navigator.geolocation.getCurrentPosition(this.success, this.errors, options);
      } else {
        alert("You have denied to access your location. Type your location manually");
      }
    } else {
      alert(
        "Cannot get your location from the browser. Enter your location manually"
      );
    }
  };

  errors = (err) => {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  success = (pos) => {
    var coordinate = pos.coords;

    // console.log("Your current position is:");
    // console.log(`Latitude : ${coordinate.latitude}`);
    // console.log(`Longitude: ${coordinate.longitude}`);
    // console.log(`More or less ${coordinate.accuracy} meters.`);

    const { data } = this.state;

    data.location.latitude = coordinate.latitude;
    data.location.longitude = coordinate.longitude;

    this.setState({ data });
  }

  handleLocationChange = ({ currentTarget: input }) => {
    const { data } = this.state;
    data.location[input.name] = input.value;

    this.setState({ data });
  };

  render() {
    const { data, errors, availableGenres } = this.state;

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
                onClick={this.handleAddTag}
                className="btn btn-success"
              >
                Add Tag
              </button>
            </div>
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

          <div id="inputLocation">
            <label
              style={{ paddingLeft: 5, display: "block" }}
              htmlFor={"location"}
              className="form-label"
            >
              Enter your location
            </label>

            <div style={{ marginLeft: 20, marginRight: 20, marginBottom: 20 }}>
              <button
                style={{ marginBottom: 20 }}
                onClick={this.handleUseCurrentLocation}
                className="btn btn-warning"
              >
                Use current location
              </button>
              <p style={{ color: "blue" }}>Or manually type location</p>
              <Input
                name="latitude"
                value={this.state.data.location.latitude}
                onChange={this.handleLocationChange}
                label="Latitude"
              />
              <Input
                name="longitude"
                value={this.state.data.location.longitude}
                onChange={this.handleLocationChange}
                label="Longitude"
              />
            </div>
          </div>

          <div style={{ textAlign: "center", marginTop: 20 }}>
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
