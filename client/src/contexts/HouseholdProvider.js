import axios from "axios";
import { useEffect, useState } from "react";
import HouseholdContext from "./HouseholdContext";

export const HouseholdProvider = (props) => {
  const baseUrl = "https://hometasktic.herokuapp.com/household/";

  const [household, setHousehold] = useState([]);

  useEffect(() => {
    async function fetchData() {
      await getHousehold();
    }
    fetchData();
  }, []);

  function getHousehold() {
    return axios
      .get(`${baseUrl}`)
      .then((response) => setHousehold(response.data));
  }

  // Get One User
  function getOneHouseHold(id) {
    return axios.get(`${baseUrl}${id}`).then((response) => {
      return new Promise((resolve) => resolve(response.data));
    });
  }

  function createHousehold(household) {
    return axios.post(baseUrl, household).then((response) => {
      return new Promise((resolve) => resolve(response.data));
    });
  }

  // Get User Posts
  function getHouseholdTasks(id) {
    return axios.get(`${baseUrl}/tasks/${id}`).then((response) => {
      return new Promise((resolve) => resolve(response.data));
    });
  }

  function editHousehold(household, id) {
    let myHeaders = {
      Authorization: `Bearer ${localStorage.getItem("myUserToken")}`,
    };

    return axios
      .put(`${baseUrl}${id}`, household, { headers: myHeaders })
      .then((response) => {
        getHousehold();
        return new Promise((resolve) => resolve(response.data));
      });
  }

  return (
    <HouseholdContext.Provider
      value={{
        household,
        getHousehold,
        getOneHouseHold,
        createHousehold,
        getHouseholdTasks,
        editHousehold,
      }}
    >
      {props.children}
    </HouseholdContext.Provider>
  );
};
