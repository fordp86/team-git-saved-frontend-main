import React from "react";
import axios from "axios";
import { useEffect } from "react";
import QuoteContext from "./QuoteContext";

export const QuoteProvider = (props) => {
  useEffect(() => {
    async function fetchData() {
      await getAllQuotes();
    }
    fetchData();
  }, []);

  function getAllQuotes() {
    const options = {
      method: "GET",
      url: "https://timshim-quotes-v1.p.rapidapi.com/quotes",
      headers: {
        "X-RapidAPI-Key": "9297d6f297msh016859cc75ed013p148ec6jsn0d97302d4013",
        "X-RapidAPI-Host": "timshim-quotes-v1.p.rapidapi.com",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  return (
    <QuoteContext.Provider
      value={{
        getAllQuotes,
      }}
    >
      {props.children}
    </QuoteContext.Provider>
  );
};
