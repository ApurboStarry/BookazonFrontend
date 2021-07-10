import React, { Component } from "react";
import httpService from "../services/httpService";
import { toast } from "react-toastify";
const { apiUrl } = require("../config.json");

const apiEndpoint = apiUrl + "/books/uploadFiles";

class UploadBookImages extends Component {
  state = {
    selectedFiles: null,
  };

  getBookIdFromUrl = () => {
    const tokens = this.props.location.pathname.split("/");
    const bookId = tokens[tokens.length - 1];

    return bookId;
  };

  handleFileChange = (e) => {
    this.setState({ selectedFiles: e.target.files });
  }

  handleSubmit = async (e) => {
    e.preventDefault();

    const bookId = this.getBookIdFromUrl();
    console.log(this.state.selectedFiles);

    const fileData = new FormData();
    for(let i = 0; i < this.state.selectedFiles.length; i++) {
      fileData.append("images", this.state.selectedFiles[i]);
    }

    try {
      const { data } = await httpService.post(
        apiEndpoint + "/" + bookId, fileData
      );
      console.log(data);
      this.props.history.push("/");
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }

      if (ex.response.data) {
        toast.error(ex.response.data);
      }
    }
  };

  render() {
    return (
      <div id="uploadBookImages">
        <form onSubmit={this.handleSubmit}>
          <h3 style={{ paddingBottom: 10 }}>Upload images of the book</h3>
          <div className="mb-3">
            <input
              className="form-control"
              type="file"
              name="images"
              id="formFileMultiple"
              onChange={this.handleFileChange}
              multiple
            />
          </div>

          <div style={{ textAlign: "center", marginTop: 20 }}>
            <button className="btn btn-primary">
              Add book
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default UploadBookImages;
