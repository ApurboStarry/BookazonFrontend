import httpService from "../services/httpService";
const { apiUrl } = require("../config.json");

const apiEndpoint = apiUrl + "/cart";

async function getAllBooksInCart() {
  const { data: cart } = await httpService.get(apiEndpoint + "/allBooks");
  return cart;
}

async function addBookToCart(book) {
  const { data: cart } = await httpService.post(apiEndpoint + "/addBook", book);
  return cart;
}

async function updateQuantityOfABook(bookInCartId, bookQuantity) {
  const { data: cart } = await httpService.put(
    apiEndpoint + "/updateQuantity/" + bookInCartId,
    {
      quantity: bookQuantity,
    }
  );
  return cart;
}

async function deleteBook(bookInCartId) {
  const { data } = await httpService.delete(apiEndpoint + "/deleteBook/" + bookInCartId);
  return data;
}

const defaultExportObj = {
  getAllBooksInCart,
  addBookToCart,
  updateQuantityOfABook,
  deleteBook
};

export default defaultExportObj;