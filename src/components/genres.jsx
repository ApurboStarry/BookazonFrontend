import React, { Component } from 'react';

import genreService from "../apiServices/genreService";

class Genres extends Component {
  state = { genres: [] }

  async componentDidMount() {
    const genres = await genreService.getAllGenres();
    console.log(genres);
    this.setState({ genres });
  }
  
  render() { 
    return ( 
      <div>
        <h1>Genres will be rendered here</h1>
      </div> 
    );
  }
}
 
export default Genres;