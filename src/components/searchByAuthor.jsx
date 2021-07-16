import React, { Component } from 'react'
import searchService from "../apiServices/searchService";
import ShowBooksTabular from './showBooksTabular';

class SearchByAuthor extends Component {
  state = {
    authorId: "",
    books: [],
    isSortedByLocation: false,
    location: {
      latitude: 0.0,
      longitude: 0.0,
    },
  };

  getAuthorIdFromUrl = () => {
    const tokens = this.props.location.pathname.split("/");
    const authorId = tokens[tokens.length - 1];

    return authorId;
  };

  async componentDidMount() {
    const authorId = this.getAuthorIdFromUrl();
    const books = await searchService.searchBooksByAuthorId(authorId);

    this.setState({ books, authorId });
  }

  handleSortByLocation = async (e) => {
    e.preventDefault();

    if (navigator.geolocation) {
      const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      };

      const result = await navigator.permissions.query({ name: "geolocation" });

      if (result.state === "granted") {
        navigator.geolocation.getCurrentPosition(this.success);
      } else if (result.state === "prompt") {
        navigator.geolocation.getCurrentPosition(
          this.success,
          this.errors,
          options
        );
      } else {
        alert(
          "You have denied to access your location. So, books cannot be sorted based on your current location."
        );
      }
    } else {
      alert(
        "Cannot get your location from the browser. So, books cannot be sorted based on your current location."
      );
    }
  };

  errors = (err) => {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  };

  success = async (pos) => {
    var coordinate = pos.coords;

    // console.log("Your current position is:");
    // console.log(`Latitude : ${coordinate.latitude}`);
    // console.log(`Longitude: ${coordinate.longitude}`);
    // console.log(`More or less ${coordinate.accuracy} meters.`);

    const { location } = this.state;

    location.latitude = coordinate.latitude;
    location.longitude = coordinate.longitude;

    const isSortedByLocation = this.state.isSortedByLocation;
    let books;

    console.log(location);

    if (!isSortedByLocation) {
      // sort based on location
      books = await searchService.searchBooksByAuthorIdAndSortByLocation(
        this.state.authorId,
        location
      );
    } else {
      // no sort
      books = await searchService.searchBooksByAuthorId(this.state.authorId);
    }

    this.setState({ books, isSortedByLocation: !isSortedByLocation, location });
  };

  render() {
    return (
      <ShowBooksTabular
        isSortedByLocation={this.state.isSortedByLocation}
        books={this.state.books}
        handleSortByLocation={this.handleSortByLocation}
      />
    );
  }
}
 
export default SearchByAuthor;