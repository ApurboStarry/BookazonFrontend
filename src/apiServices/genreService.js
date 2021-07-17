import httpService from "../services/httpService";
const { apiUrl } = require("../config.json");

const apiEndpoint = apiUrl + "/genres";

async function getAllNonParentGenres() {
  const { data: genres } = await httpService.get(
    apiEndpoint + "/allNonParentGenres"
  );
  return genres;
}

async function getAllLeafGenres() {
  const { data: genres } = await httpService.get(
    apiEndpoint + "/allLeafGenres"
  );
  return genres;
}

async function getGenreById(genreId) {
  const { data: genre } = await httpService.get(apiEndpoint + "/" + genreId);
  return genre;
}

async function getSubgenres(genreId) {
  const { data: genres } = await httpService.get(
    apiEndpoint + "/subgenres/" + genreId
  );
  return genres;
}

async function addGenre(genreName) {
  const { data } = await httpService.post(apiEndpoint, { name: genreName });
  return data;
}

async function addChildToGenre(genreId, childGenreName) {
  const { data } = await httpService.post(
    apiEndpoint + "/addChild/" + genreId,
    { name: childGenreName }
  );

  return data;
}

async function deleteGenre(genreId) {
  const { data } = await httpService.delete(apiEndpoint + "/" + genreId);
  return data;
}

async function deleteGenreWithParent(parentId, genreId) {
  const { data } = await httpService.delete(apiEndpoint + "/" + parentId + "/" + genreId);
  return data;
}

const defaultExportObj = {
  getAllNonParentGenres,
  getAllLeafGenres,
  getGenreById,
  getSubgenres,
  addGenre,
  addChildToGenre,
  deleteGenre,
  deleteGenreWithParent,
};

export default defaultExportObj;
