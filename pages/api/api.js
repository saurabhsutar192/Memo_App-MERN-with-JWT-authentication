import axios from "axios";

export const getMemos = () => {
  let auth = JSON.parse(localStorage.getItem("profile"))?.id;

  return axios.get(`http://localhost:4000/${auth}`, {
    headers: {
      "x-access-token": JSON.parse(localStorage.getItem("profile"))?.token,
    },
  });
};

export const deleteMemos = (id) =>
  axios.delete(`http://localhost:4000/${id}`, {
    headers: {
      "x-access-token": JSON.parse(localStorage.getItem("profile"))?.token,
    },
  });

export const addMemos = (memo, author) =>
  axios.post(
    `http://localhost:4000/`,
    { text: memo, author: author },
    {
      headers: {
        "x-access-token": JSON.parse(localStorage.getItem("profile"))?.token,
      },
    }
  );

export const editMemos = (memo, id, author) =>
  axios.patch(
    `http://localhost:4000/${id}`,
    {
      text: memo,
      author: author,
    },
    {
      headers: {
        "x-access-token": JSON.parse(localStorage.getItem("profile"))?.token,
      },
    }
  );

export const registerUser = (user) =>
  axios.post(`http://localhost:4000/register`, { user });

export const loginUser = (user) =>
  axios.post(`http://localhost:4000/login`, { user });
