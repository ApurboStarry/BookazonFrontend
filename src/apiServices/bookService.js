import httpService from "../services/httpService";
const { apiUrl } = require("../config.json");

const apiEndpoint = apiUrl + "/books";

async function getBooks(pageNumber) {
  const { data: books } = await httpService.get(apiEndpoint + "?pageNumber=" + pageNumber);

  return books;
}

const defaultExportObj = {
  getBooks
};

export default defaultExportObj;