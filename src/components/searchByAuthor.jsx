import React, { Component } from 'react'
import searchService from "../apiServices/searchService";
import ShowBooksTabular from './showBooksTabular';

class SearchByAuthor extends Component {
  state = { books: [] };

  getAuthorIdFromUrl = () => {
    const tokens = this.props.location.pathname.split("/");
    const authorId = tokens[tokens.length - 1];

    return authorId;
  };

  async componentDidMount() {
    const authorId = this.getAuthorIdFromUrl();
    const books = await searchService.searchBooksByAuthorId(authorId);

    this.setState({ books });
  }

  render() {
    return <ShowBooksTabular books={this.state.books} />;
  }
}
 
export default SearchByAuthor;