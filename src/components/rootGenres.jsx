import React, { Component } from "react";
import genreService from "../apiServices/genreService";
import { Button, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

class RootGenres extends Component {
  state = { genres: [], newlyAddedGenre: "", showAddGenreModal: false };

  async componentDidMount() {
    const genres = await genreService.getAllNonParentGenres();
    this.setState({ genres });
  }

  handleCloseOfAddGenreModal = () => {
    this.setState({ showAddGenreModal: false });
  };

  handleAddGenreChange = ({ currentTarget: input }) => {
    this.setState({ newlyAddedGenre: input.value });
  };

  handleAddGenreButtonClick = async (e) => {
    e.preventDefault();

    try {
      const newGenre = await genreService.addGenre(this.state.newlyAddedGenre);
      toast.success("Genre added");
      const { genres } = this.state;
      genres.push(newGenre);
      this.setState({ genres, newlyAddedGenre: "", showAddGenreModal: false });
    } catch (ex) {
      toast.error("Something went wrong");
    }
  };

  getAddGenreModal = () => {
    return (
      <div id="modalMainDiv">
        <Modal
          show={this.state.showAddGenreModal}
          onHide={() => this.handleCloseOfAddGenreModal()}
        >
          <Modal.Header closeButton style={{ color: "blue" }}>
            Add genre
          </Modal.Header>
          <Modal.Body>
            Type the name of the genre you want to add
            <input
              type="text"
              value={this.newlyAddedGenre}
              onChange={this.handleAddGenreChange}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => this.handleCloseOfAddGenreModal()}>
              Close
            </Button>
            <Button onClick={this.handleAddGenreButtonClick} variant="success">
              Add
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  };

  handleAddGenre = () => {
    this.setState({ showAddGenreModal: true });
  };

  render() {
    return (
      <div id="adminInterface">
        {this.getAddGenreModal()}
        <h3>Bookazon Admin Interface</h3>
        <ul>
          {this.state.genres.map((genre) => {
            const genreLink = "/adminInterface/subGenres/" + genre._id;
            return (
              <li key={genre.name}>
                <Link to={genreLink}>{genre.name}</Link>
              </li>
            );
          })}
        </ul>

        <button onClick={this.handleAddGenre} className="btn btn-success">
          Add genre
        </button>
      </div>
    );
  }
}

export default RootGenres;
