import React, { Component } from 'react'
import ShowBooksTabular from './showBooksTabular';
import bookService from "../apiServices/bookService";

class FreeGiveaways extends Component {
  state = { books: [] }

  async componentDidMount() {
    const books = await bookService.getFreeGiveaways();
    this.setState({ books });
  }
  
  render() { 
    if(this.state.books.length > 0) {
      return ( <ShowBooksTabular books={this.state.books} /> );
    }

    return (
      <div id="noFreeGiveaway">
        <h3>Sorry, no books for giveaway right now.</h3>
      </div>
    );
  }
}
 
export default FreeGiveaways;