import httpService from "../services/httpService";
const { apiUrl } = require("../config.json");

const apiEndpoint = apiUrl + "/search";

async function searchBooksByGenreId(genreId) {
  const { data: books } = await httpService.get(apiEndpoint + "/byGenre/" + genreId);

  return books;
}

async function searchBooksByAuthorId(authorId) {
  const {data: books } = await httpService.get(apiEndpoint + "/byAuthor/" + authorId);
  return books;
}

const defaultExportObj = {
  searchBooksByGenreId,
  searchBooksByAuthorId
};

export default defaultExportObj;
