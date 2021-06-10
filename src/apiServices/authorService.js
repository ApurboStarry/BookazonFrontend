import httpService from "../services/httpService";
const { apiUrl } = require("../config.json");

const apiEndpoint = apiUrl + "/authors";

async function getAllAuthors() {
  const { data: authors } = await httpService.get(apiEndpoint);
  return authors;
}

const defaultExportObj = {
  getAllAuthors
};

export default defaultExportObj;
