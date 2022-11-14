import axios from "axios";
import { useEffect, useState } from "react";
import UserContext from "./UserContext";

export const UserProvider = (props) => {
  const baseUrl = "https://hometasktic.herokuapp.com/users/";

  const [user, setUser] = useState([]);

  useEffect(() => {
    async function fetchData() {
      await getUsers();
    }
    fetchData();
  }, []);

  function getUsers() {
    return axios.get(baseUrl).then((response) => setUser(response.data));
  }

  // Get One User
  function getOneUser(userId) {
    return axios.get(baseUrl + userId).then((response) => {
      return new Promise((resolve) => resolve(response.data));
    });
  }

  function createUser(user) {
    return axios.post(baseUrl, user).then((response) => {
      return new Promise((resolve) => resolve(response.data));
    });
  }

  // Get User Posts
  function getUserTasks(id) {
    return axios.get(`${baseUrl}/tasks/${id}`).then((response) => {
      return new Promise((resolve) => resolve(response.data));
    });
  }

  function signInUser(username, password) {
    let user = { username, password };

    return axios.post(`${baseUrl}login`, user).then((response) => {
      localStorage.setItem("myUserToken", response.data.token);
      return new Promise((resolve) => resolve(response.data));
    });
  }

  // User Profile Access
  function userProfilePage(user, id) {
    let myHeaders = {
      Authorization: `Bearer ${localStorage.getItem("myUserToken")}`,
    };

    return axios
      .get(`${baseUrl}${id}`, user, { headers: myHeaders })
      .then((response) => {
        return new Promise((resolve) => resolve(response.data));
      });
  }

  function editUser(user, id) {
    let myHeaders = {
      Authorization: `Bearer ${localStorage.getItem("myUserToken")}`,
    };

    return axios
      .put(`${baseUrl}${id}`, user, { headers: myHeaders })
      .then((response) => {
        getUsers();
        return new Promise((resolve) => resolve(response.data));
      });
  }

  return (
    <UserContext.Provider
      value={{
        user,
        getOneUser,
        createUser,
        signInUser,
        getUserTasks,
        userProfilePage,
        editUser,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
