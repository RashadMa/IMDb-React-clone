import axios from "axios";

const URL = "https://api.themoviedb.org/3";
const TOKEN = import.meta.env.API_TOKEN;
const headers = {
  Authorization: "bearer " + TOKEN,
};
export const getMovData = async (url, params) => {
  try {
    const { data } = await axios.get(URL + url, {
      headers,
      params,
    });
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};
