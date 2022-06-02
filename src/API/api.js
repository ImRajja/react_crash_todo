import axios from "axios";
import store from "../redux/store";

let userData = store.getState().user;

console.log("userData////");
console.log(userData);
// let token = userData.accessToken;

let token = localStorage.getItem("access_token");
console.log("token////");
console.log(token);
// "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6ImF1dGhzZXJ2ZXIifQ.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjkwMDMvIiwic3ViIjoiQ2FydmVkIFJvY2sgTWVtYmVyIiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDo5MDAyLyIsImlhdCI6MTY1NDA4NTc4NSwiZXhwIjoxNjU0MDg2MDg1LCJqdGkiOiJvRzNZM1FjRyIsInNjb3BlIjpbInRhc2tWaWV3IiwidGFza0FkZCIsInRhc2tFZGl0IiwidGFza0RlbGV0ZSJdfQ.dOpb4WMndFK2GDZqdbGTxHekF5TZr1iV3XejH6Uv-kOxn2_d_Fprg4OBPrdTRiF0MFAtiYRYEXvlcIPHhsogIEwgR4-iF-Q5N3Xg8AY5El1Sdmo4TYVsGPDbXiYIXS925lAFwo8OWjVN3ftte2pi_-kacr90Jt07F0qeztDlCfT-nAzP-Tiwqdy6BZ49C-1ibtshi57x4J2U1_fvmcadOI3LRWwd6R9aODyugWMlglTpOFHqgVHC_FYqFQy0IJeA6b-8RQaktbLcWzEZcC-emxeLYRkGHLQpg766R8vpF8RZZjian0MJIFw4TlovcNzaiQZaYTb--_yJykAb2dQ6aw";

const config = {
  headers: {
    Authorization: "Bearer " + token,
  },
};
const API_URL = process.env.REACT_APP_API_URL;
const COLLECTION = process.env.REACT_APP_COLLECTION;

const API = axios.create({
  baseURL: `${API_URL}/api`,
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    // req.headers.authorization = `Bearer ${
    //   JSON.parse(localStorage.getItem("profile")).token
    // }`;
    // req.headers.authorization = `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6ImF1dGhzZXJ2ZXIifQ.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjkwMDMvIiwic3ViIjoiQ2FydmVkIFJvY2sgTWVtYmVyIiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDo5MDAyLyIsImlhdCI6MTY1NDA4NDk2OCwiZXhwIjoxNjU0MDg1MjY4LCJqdGkiOiJjcGRldVl6NSIsInNjb3BlIjpbInRhc2tWaWV3IiwidGFza0FkZCIsInRhc2tFZGl0IiwidGFza0RlbGV0ZSJdfQ.CTTDvzHIlXpv0xQdC61sK_NxnHJzYtyy9TfAeqUybCJBWS0q7p7qzQlx0DNVuaqSYz77ilmPFy13G0_qNimXAz7lT7MK7TTdnxaopkNv9MOntvHH_kYw1rmSwNENY8pu0YCaYDiwLkLSV1gyba7bpyL_6xDMUa4B5M7Iugwzi50ZUcPRFh-vlYtlt7Tu_MrEFDQXz6X459NQGEbOfUfWDEb85eCk2S7k21rSsOXnfjRXY_59utE9tS3iJZmi2rfqlkyIOIw2-Uf4EjwP6sJrxCj-8Jn8AfNtBtl0XhNVp6poXz8kFpmFPlp0Pas2ewKGWVbyXnKpBtaXp9RaygF_Uw`;
  }
  return req;
});

export const fetchItems = (user) =>
  API.get(
    // API.get(`/${user.result.email}/${COLLECTION}`);
    `/${user.result.email}/${COLLECTION}`,
    config
  );

export const fetchItem = (user, id) =>
  API.get(`/${user.result.email}/${COLLECTION}/${id}`, config);

export const createItem = (item, user) =>
  API.post(`/${user.result.email}/${COLLECTION}`, item, config);

export const deleteItem = (id, user) =>
  API.delete(`/${user.result.email}/${COLLECTION}/${id}`, config);

export const updateItem = (id, item, user) =>
  API.put(`/${user.result.email}/${COLLECTION}/${id}`, item, config);

export const uploadImage = (item) => {
  API.post(`/upload`, item);
};
