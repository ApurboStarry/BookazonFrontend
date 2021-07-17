import React, { Component } from "react";
import genreService from "../apiServices/genreService";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Modal } from "react-bootstrap";

class ChildGenres extends Component {
  state = {
    genreId: "",
    genres: [],
    newlyAddedGenre: "",
    showAddGenreModal: false,
    showDeleteGenreModal: false,
    genreToDelete: {},
  };

  getGenreIdFromUrl = () => {
    const tokens = this.props.location.pathname.split("/");
    const genreId = tokens[tokens.length - 1];

    return genreId;
  };

  async componentDidMount() {
    const genreId = this.getGenreIdFromUrl();
    const genres = await genreService.getSubgenres(genreId);
    this.setState({ genreId, genres });
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
      const newGenre = await genreService.addChildToGenre(
        this.state.genreId,
        this.state.newlyAddedGenre
      );
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

  handleGenreClick = async (genreId) => {
    const genres = await genreService.getSubgenres(genreId);
    this.setState({ genreId, genres });
  };

  handleDeleteGenreClick = (genre) => {
    this.setState({ showDeleteGenreModal: true, genreToDelete: genre });
  };

  handleCloseOfDeleteGenreModal = () => {
    this.setState({ showDeleteGenreModal: false });
  };

  getDeleteGenreModal = () => {
    return (
      <div id="modalMainDiv">
        <Modal
          show={this.state.showDeleteGenreModal}
          onHide={() => this.handleCloseOfDeleteGenreModal()}
        >
          <Modal.Header closeButton style={{ color: "red" }}>
            Delete genre
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete "{this.state.genreToDelete.name}"?
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => this.handleCloseOfAddGenreModal()}>
              Close
            </Button>
            <Button onClick={this.deleteGenre} variant="danger">
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  };

  deleteGenre = async () => {
    try {
      const data = await genreService.deleteGenreWithParent(this.state.genreId, this.state.genreToDelete._id);
      
      const { genres } = this.state;
      const genreIndex = genres.findIndex(g => g._id === this.state.genreToDelete._id );
      genres.splice(genreIndex, 1);

      this.setState({ genres, showDeleteGenreModal: false });
      toast.success("Genre deleted");
    } catch (ex) {
      toast.error("Something went wrong. Genre could not be deleted");
    }
  };

  render() {
    return (
      <div id="adminInterface">
        {this.getAddGenreModal()}
        {this.getDeleteGenreModal()}
        <h3>Bookazon Admin Interface</h3>
        {this.state.genres.length === 0 && (<p>No genres available</p>)}
        <ul>
          {this.state.genres.map((genre) => {
            const genreLink = "/adminInterface/subGenres/" + genre._id;
            return (
              <li key={genre.name}>
                <p
                  style={{
                    color: "blue",
                    cursor: "pointer",
                    display: "inline-block",
                  }}
                  onClick={() => this.handleGenreClick(genre._id)}
                >
                  {genre.name}{" "}
                </p>
                <span
                  onClick={() => this.handleDeleteGenreClick(genre)}
                  style={{ marginLeft: 20, cursor: "pointer" }}
                >
                  <i class="fa fa-trash" aria-hidden="true"></i>
                </span>
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

export default ChildGenres;
