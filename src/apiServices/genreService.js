import httpService from "../services/httpService";
const { apiUrl } = require("../config.json");

const apiEndpoint = apiUrl + "/genres";

async function getAllGenres() {
  const { data: genres } = await httpService.get(apiEndpoint);
  return genres;
}

async function getGenreById(genreId) {
  const { data: genre } = await httpService.get(
    apiEndpoint + "/" + genreId
  );
  return genre;
}

const defaultExportObj = {
  getAllGenres: getAllGenres,
  getGenreById: getGenreById
};

export default defaultExportObj;
