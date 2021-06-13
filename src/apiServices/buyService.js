import httpService from "../services/httpService";
const { apiUrl } = require("../config.json");

const apiEndpoint = apiUrl + "/buy";

async function buy(body) {
  const { data } = await httpService.post(apiEndpoint, body);
  return data;
}

const defaultExportObj = {
  buy
};

export default defaultExportObj;
