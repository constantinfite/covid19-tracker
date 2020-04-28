import axios from "axios";
//const urlGood = "https://covidtracking.com/api/us/daily"
const url = "https://covidtracking.com/api/v1/states/daily.json";
const statesInfoURL = "https://covidtracking.com/api/states/info";

export const fetchCountry = async () => {
  try {
    const response = axios.get(statesInfoURL);
    return response;
  } catch {
    console.error();
  }
};

export const fetchData = async () => {
  try {
    const response = axios.get(url);
    return response;
  } catch {
    console.error();
  }
};
