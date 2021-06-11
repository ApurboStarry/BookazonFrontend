import httpService from "../services/httpService";
const { apiUrl } = require("../config.json");

const apiEndpoint = apiUrl + "/search";

async function searchBooksByTitle(searchTitle) {
  const { data: books } = await httpService.get(apiEndpoint + "/byName/" + searchTitle);
  return books;
}

async function searchBooksByGenreId(genreId) {
  const { data: books } = await httpService.get(apiEndpoint + "/byGenre/" + genreId);
  return books;
}

async function searchBooksByAuthorId(authorId) {
  const {data: books } = await httpService.get(apiEndpoint + "/byAuthor/" + authorId);
  return books;
}

async function advancedSearch(searchBody) {
  const { data: books } = await httpService.post(apiEndpoint + "/advancedSearch", searchBody);
  return books;
}

const defaultExportObj = {
  searchBooksByTitle,
  searchBooksByGenreId,
  searchBooksByAuthorId,
  advancedSearch
};

export default defaultExportObj;
