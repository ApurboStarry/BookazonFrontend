import React, { Component } from 'react';
import searchService from "../apiServices/searchService";
import ShowBooksTabular from './showBooksTabular';

class SearchByGenre extends Component {
  state = { books: [] };

  getGenreIdFromUrl = () => {
    const tokens = this.props.location.pathname.split("/");
    const genreId = tokens[tokens.length - 1];

    return genreId;
  };

  async componentDidMount() {
    const genreId = this.getGenreIdFromUrl();
    const books = await searchService.searchBooksByGenreId(genreId);

    this.setState({ books });
  }
  

  render() {
    return(<ShowBooksTabular books={this.state.books} />);
  }
}
 
export default SearchByGenre;