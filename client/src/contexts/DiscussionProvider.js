import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import DiscussionContext from "./DiscussionContext";

export const DiscussionProvider = (props) => {
  const [discussion, setPost] = useState([]);

  const baseUrl = "https://hometasktic.herokuapp.com/discussion/";

  useEffect(() => {
    async function fetchData() {
      await getAllPosts();
    }
    fetchData();
  }, []);

  function getAllPosts() {
    return axios.get(baseUrl).then((response) => setPost(response.data));
  }

  function getPost(discussionId) {
    return axios.get(baseUrl + discussionId).then((response) => {
      return new Promise((resolve) => resolve(response.data));
    });
  }

  function addPost(discussion) {
    let myHeaders = {
      Authorization: `Bearer ${localStorage.getItem("myUserToken")}`,
    };

    return axios
      .post(baseUrl, discussion, { headers: myHeaders })
      .then((response) => {
        getAllPosts();
        return new Promise((resolve) => resolve(response.data));
      });
  }

  function editPost(discussion, discussionId) {
    let myHeaders = {
      Authorization: `Bearer ${localStorage.getItem("myUserToken")}`,
    };
    return axios
      .put(baseUrl + discussionId, discussion, { headers: myHeaders })
      .then((response) => {
        getAllPosts();
        return new Promise((resolve) => resolve(response.data));
      });
  }

  function deletePost(discussionId) {
    let myHeaders = {
      Authorization: `Bearer ${localStorage.getItem("myUserToken")}`,
    };
    return axios
      .delete(baseUrl + discussionId, discussion, { headers: myHeaders })
      .then((response) => {
        getAllPosts();
        return new Promise((resolve) => resolve(response.data));
      });
  }

  return (
    <DiscussionContext.Provider
      value={{
        discussion,
        getPost,
        getAllPosts,
        addPost,
        editPost,
        deletePost,
      }}
    >
      {props.children}
    </DiscussionContext.Provider>
  );
};
