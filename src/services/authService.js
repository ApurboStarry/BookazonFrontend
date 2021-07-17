import httpService from "./httpService";
import jwtDecode from "jwt-decode";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/auth";
const tokenKey = "token";

httpService.setJwt(getJwt());

export async function login(email, password) {
  const { data: jwt } = await httpService.post(apiEndpoint, {
    email,
    password,
  });

  localStorage.setItem(tokenKey, jwt);
}

export async function isAdmin() {
  const { data } = await httpService.get(apiEndpoint + "/isAdmin");
  return data;
}

export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    const user = jwtDecode(jwt);
    return user;
  } catch (ex) {
    return null;
  }
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

const defaultObject = {
  login,
  isAdmin,
  loginWithJwt,
  logout,
  getCurrentUser,
  getJwt,
};
export default defaultObject;
