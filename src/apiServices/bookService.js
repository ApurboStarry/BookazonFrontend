import httpService from "../services/httpService";
const { apiUrl } = require("../config.json");

const apiEndpoint = apiUrl + "/books";

async function getNumberOfPages() {
  const { data: numberOfPages } = await httpService.get(apiEndpoint + "/numberOfPages");
  return numberOfPages;
}

async function getBooks(pageNumber) {
  const { data: books } = await httpService.get(apiEndpoint + "?pageNumber=" + pageNumber);

  return books;
}

async function getBookById(bookId) {
  const { data: book } = await httpService.get(apiEndpoint + "/getBook/" + bookId);
  return book;
}

const defaultExportObj = {
  getNumberOfPages,
  getBooks,
  getBookById
};

export default defaultExportObj;