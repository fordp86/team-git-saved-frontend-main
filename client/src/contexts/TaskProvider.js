import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import TaskContext from "./TaskContext";

export const TaskProvider = (props) => {
  const [task, setTask] = useState([]);
  const baseUrl = "https://hometasktic.herokuapp.com/tasks/";

  useEffect(() => {
    async function fetchData() {
      await getAllTasks();
    }
    fetchData();
  }, []);

  function getAllTasks() {
    return axios.get(baseUrl).then((response) => setTask(response.data));
  }

  function getTask(taskId) {
    return axios.get(baseUrl + taskId).then((response) => {
      return new Promise((resolve) => resolve(response.data));
    });
  }

  // Add Task
  function addTask(task) {
    let myHeaders = {
      Authorization: `Bearer ${localStorage.getItem("myUserToken")}`,
    };

    return axios
      .post(baseUrl, task, { headers: myHeaders })
      .then((response) => {
        getAllTasks();
        return new Promise((resolve) => resolve(response.data));
      });
  }

  function editTask(task, taskId) {
    let myHeaders = {
      Authorization: `Bearer ${localStorage.getItem("myUserToken")}`,
    };
    return axios
      .put(baseUrl + taskId, task, { headers: myHeaders })
      .then((response) => {
        getAllTasks();
        return new Promise((resolve) => resolve(response.data));
      });
  }

  function deleteTask(taskId) {
    let myHeaders = {
      Authorization: `Bearer ${localStorage.getItem("myUserToken")}`,
    };
    return axios
      .delete(baseUrl + taskId, task, { headers: myHeaders })
      .then((response) => {
        getAllTasks();
        return new Promise((resolve) => resolve(response.data));
      });
  }

  return (
    <TaskContext.Provider
      value={{
        task,
        getTask,
        getAllTasks,
        addTask,
        editTask,
        deleteTask,
      }}
    >
      {props.children}
    </TaskContext.Provider>
  );
};
