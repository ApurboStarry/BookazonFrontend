import httpService from "../services/httpService";
const { apiUrl } = require("../config.json");

const apiEndpoint = apiUrl + "/buy";

async function getTransactionHistory() {
  const { data: transactions } = await httpService.get(apiEndpoint + "/transactionHistory");
  return transactions;
}

async function buy(body) {
  const { data } = await httpService.post(apiEndpoint, body);
  return data;
}

async function reportTransaction(transactionId, body) {
  const { data } = await httpService.post(apiEndpoint + "/report/" + transactionId, body);
  return data;
}

const defaultExportObj = {
  getTransactionHistory,
  buy,
  reportTransaction
};

export default defaultExportObj;
