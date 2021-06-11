import React, { Component } from "react";
import Input from "./common/input";
import ShowBooksTabular from "./showBooksTabular";
import searchService from "../apiServices/searchService";

class AdvancedSearchForm extends Component {
  state = {
    data: { name: "", author: "", genre: "", minPrice: 0, maxPrice: 10000 },
    submitted: false,
    books: []
  };

  componentDidMount() {
    const data = {
      name: "",
      author: "",
      genre: "",
      minPrice: 0,
      maxPrice: 10000,
    };

    this.setState({ data, submitted: false, books: [] });
  }
  

  handleChange = ({ currentTarget: input }) => {
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const books = await searchService.advancedSearch(this.state.data);
    console.log(books);
    this.setState({ books, submitted: true });
  };

  render() {
    if(this.state.submitted === true) {
      return (<ShowBooksTabular books={this.state.books} />);
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
          <Input
            name="genre"
            value={data.genre}
            label="Genre"
            onChange={this.handleChange}
          />
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
            <button className="btn btn-primary">
              Search
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default AdvancedSearchForm;
