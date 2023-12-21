import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import axios from "axios";
import "./home.css";
import MovieList from "../../components/movieList/MovieList";

const API_KEY = "4e44d9029b1270a757cddc766a1bcb63";
const API_URL = "https://api.themoviedb.org/3/movie/popular";

const Home = () => {
      const [popularMovies, setPopularMovies] = useState([]);
      useEffect(() => {
            const fetchPopularMovies = async () => {
                  try {
                        const response = await axios.get(API_URL, {
                              params: {
                                    api_key: API_KEY,
                                    language: "en-US",
                              },
                        });

                        setPopularMovies(response.data.results);
                  } catch (error) {
                        console.error("Error fetching popular movies:", error);
                  }
            };

            fetchPopularMovies();
      }, []);

      const formatDate = (dateString) => {
            const options = { month: 'long', day: 'numeric', year: 'numeric' };
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', options);
      };

      return (
            <>
                  <div className="poster">
                        <Carousel
                              showThumbs={false}
                              autoPlay={true}
                              transitionTime={300}
                              infiniteLoop={true}
                              showStatus={false}
                              showArrows={true}
                              emulateTouch={true}
                              swipeable={true}
                        >
                              {popularMovies.map((movie) => (
                                    <Link key={movie.id} to={`/movie/${movie.id}`} style={{ textDecoration: "none", color: "white" }}>
                                          <div className="poster-image">
                                                <img src={`https://image.tmdb.org/t/p/original${movie?.backdrop_path}`} alt={movie?.original_title} />
                                          </div>
                                          <div className="poster-image-overlay">
                                                <div className="poster-image-title">{movie?.original_title || ""}</div>
                                                <div className="poster-image-runtime">
                                                      {formatDate(movie ? movie.release_date : "")}
                                                      <span className="poster-image-rating">
                                                            <i className="fas fa-star ylw" />{" "}
                                                            {movie ? parseFloat(movie.vote_average).toFixed(1) : ""}/10
                                                      </span>
                                                </div>
                                                <div className="poster-image-description">{movie?.overview || ""}</div>
                                          </div>
                                    </Link>
                              ))}
                        </Carousel>
                        <MovieList />
                  </div>
            </>
      );
};

export default Home;
