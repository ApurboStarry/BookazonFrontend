import httpService from "../services/httpService";
const { apiUrl } = require("../config.json");

const apiEndpoint = apiUrl + "/search";

async function searchBooksByTitle(searchTitle) {
  const { data: books } = await httpService.get(
    apiEndpoint + "/byName/" + searchTitle
  );
  return books;
}

async function searchBooksByTitleAndSortByLocation(searchTitle, location) {
  const { data: books } = await httpService.get(
    apiEndpoint +
      "/byName/" +
      searchTitle +
      "?latitude=" +
      location.latitude +
      "&longitude=" +
      location.longitude
  );
  return books;
}

async function searchBooksByGenreId(genreId) {
  const { data: books } = await httpService.get(
    apiEndpoint + "/byGenre/" + genreId
  );
  return books;
}

async function searchBooksByGenreIdAndSortByLocation(genreId, location) {
  const { data: books } = await httpService.get(
    apiEndpoint +
      "/byGenre/" +
      genreId +
      "?latitude=" +
      location.latitude +
      "&longitude=" +
      location.longitude
  );
  return books;
}

async function searchBooksByAuthorId(authorId) {
  const { data: books } = await httpService.get(
    apiEndpoint + "/byAuthor/" + authorId
  );
  return books;
}

async function searchBooksByAuthorIdAndSortByLocation(authorId, location) {
  const { data: books } = await httpService.get(
    apiEndpoint +
      "/byAuthor/" +
      authorId +
      "?latitude=" +
      location.latitude +
      "&longitude=" +
      location.longitude
  );

  return books;
}

async function advancedSearch(searchBody) {
  const { data: books } = await httpService.post(
    apiEndpoint + "/advancedSearch",
    searchBody
  );
  return books;
}

async function advancedSearchWithSortByLocation(searchBody, location) {
  const { data: books } = await httpService.post(
    apiEndpoint +
      "/advancedSearch?latitude=" +
      location.latitude +
      "&longitude=" +
      location.longitude,
    searchBody
  );
  return books;
}

const defaultExportObj = {
  searchBooksByTitle,
  searchBooksByTitleAndSortByLocation,
  searchBooksByGenreId,
  searchBooksByGenreIdAndSortByLocation,
  searchBooksByAuthorId,
  searchBooksByAuthorIdAndSortByLocation,
  advancedSearch,
  advancedSearchWithSortByLocation,
};

export default defaultExportObj;
