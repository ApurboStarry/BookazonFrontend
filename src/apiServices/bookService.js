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

async function getBooksSortedByTitle(order) {
  const { data: books } = await httpService.get(apiEndpoint + "/sortBy/name?order=" + order);
  return books;
}

async function getBooksSortedByGenre(order) {
  const { data: books } = await httpService.get(
    apiEndpoint + "/sortBy/genre?order=" + order
  );
  return books;
}

async function getBooksSortedByUnitPrice(order) {
  const { data: books } = await httpService.get(
    apiEndpoint + "/sortBy/unitPrice?order=" + order
  );
  return books;
}

async function getFreeGiveaways() {
  const { data: books } = await httpService.get(apiEndpoint + "/giveaways");
  return books;
}

const defaultExportObj = {
  getNumberOfPages,
  getBooks,
  getBookById,
  getBooksSortedByTitle,
  getBooksSortedByGenre,
  getBooksSortedByUnitPrice,
  getFreeGiveaways,
};

export default defaultExportObj;