import React, { Component } from 'react';
import searchService from "../apiServices/searchService";
import ShowBooksTabular from './showBooksTabular';

class SearchByTitle extends Component {
  state = { books: [] };

  getSearchTitleFromUrl = () => {
    const tokens = this.props.location.pathname.split("/");
    const searchTitle = tokens[tokens.length - 1];

    return searchTitle;
  };

  getSearchTitleAndShowBooks = async () => {
    const searchTitle = this.getSearchTitleFromUrl();
    const books = await searchService.searchBooksByTitle(searchTitle);
    this.setState({ books });
  };

  async componentDidMount() {
    await this.getSearchTitleAndShowBooks();
  }

  async componentDidUpdate(prevProps, prevState) {
    console.log(prevProps.location.pathname, this.props.location.pathname);
    if (prevProps.location.pathname !== this.props.location.pathname) {
      await this.getSearchTitleAndShowBooks();
    }
  }

  render() {
    return <ShowBooksTabular books={this.state.books} />;
  }
}
 
export default SearchByTitle;