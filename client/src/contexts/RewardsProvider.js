import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import RewardsContext from "./RewardsContext";

export const RewardsProvider = (props) => {
  const [reward, setReward] = useState([]);
  const baseUrl = "https://hometasktic.herokuapp.com/rewards/";

  useEffect(() => {
    async function fetchData() {
      await getAllRewards();
    }
    fetchData();
  }, []);

  function getAllRewards() {
    return axios.get(baseUrl).then((response) => setReward(response.data));
  }

  function getReward(rewardId) {
    return axios.get(baseUrl + rewardId).then((response) => {
      return new Promise((resolve) => resolve(response.data));
    });
  }

  function addReward(reward) {
    // let myHeaders = {
    //   Authorization: `Bearer ${localStorage.getItem("myTaskToken")}`,
    // };

    return axios
      .post(baseUrl, reward /*{ headers: myHeaders }*/)
      .then((response) => {
        getAllRewards();
        return new Promise((resolve) => resolve(response.data));
      });
  }

  function editReward(reward, rewardId) {
    let myHeaders = {
      Authorization: `Bearer ${localStorage.getItem("myTaskToken")}`,
    };
    return axios
      .put(baseUrl + rewardId, reward, { headers: myHeaders })
      .then((response) => {
        getAllRewards();
        return new Promise((resolve) => resolve(response.data));
      });
  }

  function deleteReward(rewardId) {
    let myHeaders = {
      Authorization: `Bearer ${localStorage.getItem("myTaskToken")}`,
    };
    return axios
      .delete(baseUrl + rewardId, reward, { headers: myHeaders })
      .then((response) => {
        getAllRewards();
        return new Promise((resolve) => resolve(response.data));
      });
  }

  return (
    <RewardsContext.Provider
      value={{
        reward,
        getReward,
        getAllRewards,
        addReward,
        editReward,
        deleteReward,
      }}
    >
      {props.children}
    </RewardsContext.Provider>
  );
};
