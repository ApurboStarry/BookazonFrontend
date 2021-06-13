import httpService from "../services/httpService";
const { apiUrl } = require("../config.json");

const apiEndpoint = apiUrl + "/users";

async function getUserDetails() {
  const { data: user } = await httpService.get(apiEndpoint);
  return user;
}

const defaultExportObj = {
  getUserDetails
};

export default defaultExportObj;