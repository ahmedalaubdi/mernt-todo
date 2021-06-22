import axios from "axios";
const urlAPI = "https://merntodo-ap.herokuapp.com/todos";
// const config = {
//   headers: {
//     "Access-Control-Allow-Origin": "*",
//     "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
//   },
// };
export const readTodos = () => axios.get(urlAPI);
export const createTodo = (newTodo) => axios.post(urlAPI, newTodo);
export const updateTodo = (id, updatedTodo) =>
  axios.patch(`${urlAPI}/${id}`, updatedTodo);

export const dleteTodo = (id) => axios.delete(`${urlAPI}/${id}`);
