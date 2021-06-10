import httpService from "../services/httpService";
const { apiUrl } = require("../config.json");

const apiEndpoint = apiUrl + "/genres";

async function getAllNonParentGenres() {
  const { data: genres } = await httpService.get(apiEndpoint + "/allNonParentGenres");
  return genres;
}

async function getAllLeafGenres() {
  const { data: genres } = await httpService.get(
    apiEndpoint + "/allLeafGenres"
  );
  return genres;
}

async function getGenreById(genreId) {
  const { data: genre } = await httpService.get(
    apiEndpoint + "/" + genreId
  );
  return genre;
}

async function getSubgenres(genreId) {
  const { data: genres } = await httpService.get(apiEndpoint + "/subgenres/" + genreId);
  return genres;
}

const defaultExportObj = {
  getAllNonParentGenres,
  getAllLeafGenres,
  getGenreById,
  getSubgenres
};

export default defaultExportObj;
