import React, { useEffect, useState } from "react";
import axios from "axios";
import "./MovieList.css";
import { useParams } from "react-router-dom";
import Cards from "../card/Card";

const API_KEY = "298812bcf325660bc29766522d213595";

const MovieList = () => {
      const [movieList, setMovieList] = useState([]);
      const [loading, setLoading] = useState(true);
      const { type } = useParams();

      useEffect(() => {
            const fetchData = async () => {
                  setLoading(true);
                  try {
                        const response = await axios.get(
                              `https://api.themoviedb.org/3/movie/${type ? type : "popular"
                              }?api_key=${API_KEY}&language=en-US`
                        );
                        setMovieList(response.data.results);
                  } catch (error) {
                        console.error("Error fetching data:", error);
                  } finally {
                        setLoading(false);
                  }
            };

            fetchData();
      }, [type]);

      return (
            <div className="movieList">
                  <h2 className="listTitle">{(type ? type : "POPULAR").toUpperCase()}</h2>
                  <div className="listCards">
                        {loading ? (
                              <p>Loading...</p>
                        ) : (
                              movieList.map((movie) => <Cards key={movie.id} movie={movie} />)
                        )}
                  </div>
            </div>
      );
};

export default MovieList;
