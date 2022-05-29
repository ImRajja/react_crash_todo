import axios from "axios";

const API_URL = process.env.process.env.REACT_APP_API_URL;
const COLLECTION = process.env.process.env.REACT_APP_COLLECTION;

const API = axios.create({
  baseURL: `${API_URL}/api`,
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

export const fetchItems = (user) =>
  API.get(`/${user.result.email}/${COLLECTION}`);

export const fetchItem = (user, id) =>
  API.get(`/${user.result.email}/${COLLECTION}/${id}`);

export const createItem = (item, user) =>
  API.post(`/${user.result.email}/${COLLECTION}`, item);

export const deleteItem = (id, user) =>
  API.delete(`/${user.result.email}/${COLLECTION}/${id}`);

export const updateItem = (id, item, user) =>
  API.put(`/${user.result.email}/${COLLECTION}/${id}`, item);

export const uploadImage = (item) => {
  API.post(`/upload`, item);
};

// export const updateItem = (id, user, item) =>
//   API.put(`/${user.result.email}/resumes/${id}`, {
//     ...item,
//     isDone: !updatedTodo.isDone,
//   });

// export const signIn = (formData) => API.post("/users/signin", formData);

// export const signUp = (formData) => API.post("/users/signup", formData);
