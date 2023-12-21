import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Movie.css";
import { useParams } from "react-router-dom";

const Movie = () => {
      const [currentMovieDetail, setMovie] = useState({});
      const { id } = useParams();

      useEffect(() => {
            getData();
            window.scrollTo(0, 0);
      }, []);

      const API_KEY = "298812bcf325660bc29766522d213595";

      const getData = async () => {
            try {
                  const response = await axios.get(
                        `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
                  );
                  setMovie(response.data);
            } catch (error) {
                  console.error("Error fetching movie data:", error);
            }
      };

      const formatDate = (dateString) => {
            const options = { month: 'long', day: 'numeric', year: 'numeric' };
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', options);
      };

      return (
            <div className="movieContainer">
                  <div className="movieIntro">
                        <img
                              className="movieBackdrop"
                              src={`https://image.tmdb.org/t/p/original${currentMovieDetail.backdrop_path || ""}`}
                              alt="Backdrop"
                        />
                  </div>
                  <div className="movieDetail">
                        <div className="movieDetailLeft">
                              <div className="moviePosterBox">
                                    <img
                                          className="moviePoster"
                                          src={`https://image.tmdb.org/t/p/original${currentMovieDetail.poster_path || ""}`}
                                          alt="Poster"
                                    />
                              </div>
                        </div>
                        <div className="movieDetailRight">
                              <div className="movieDetailRightTop">
                                    <div className="movieName">{currentMovieDetail.original_title || ""}</div>
                                    <div className="movieTagline">{currentMovieDetail.tagline || ""}</div>
                                    <div className="movieRating">
                                          <i className="fas fa-star ylw" />{" "}
                                          {parseFloat(currentMovieDetail.vote_average).toFixed(1) || ""}/10
                                          <span className="movieVoteCount">
                                                {currentMovieDetail.vote_count ? `(${currentMovieDetail.vote_count} votes)` : ""}
                                          </span>
                                    </div>
                                    <div className="movieRuntime">{currentMovieDetail.runtime ? `${currentMovieDetail.runtime} mins` : ""}</div>
                                    <div className="movieReleaseDate">
                                          {currentMovieDetail.release_date ? `Release date: ${formatDate(currentMovieDetail.release_date)}` : ""}
                                    </div>
                                    <div className="movieGenres">
                                          {currentMovieDetail.genres &&
                                                currentMovieDetail.genres.map((genre) => (
                                                      <span key={genre.id} className="movieGenre">
                                                            {genre.name}
                                                      </span>
                                                ))}
                                    </div>
                              </div>
                              <div className="movieDetailRightBottom">
                                    <div className="synopsisText">Synopsis</div>
                                    <div>{currentMovieDetail.overview || ""}</div>
                              </div>
                        </div>
                  </div>
                  <div className="movieLinks">
                        <div className="movieHeading">Links</div>
                        {currentMovieDetail.homepage && (
                              <a href={currentMovieDetail.homepage} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                                    <p>
                                          <span className="movieHomeButton movieButton">Homepage</span>
                                    </p>
                              </a>
                        )}
                        {currentMovieDetail.imdb_id && (
                              <a href={`https://www.imdb.com/title/${currentMovieDetail.imdb_id}`} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                                    <p>
                                          <span className="movieImdbButton movieButton">IMDb</span>
                                    </p>
                              </a>
                        )}
                  </div>
                  <div className="movieHeading">Production Companies</div>
                  <div className="movieProduction">
                        {currentMovieDetail.production_companies &&
                              currentMovieDetail.production_companies.map((company) => (
                                    <div key={company.id} className="productionCompanyImage">
                                          {company.logo_path && (
                                                <>
                                                      <img className="movieProductionCompany" src={`https://image.tmdb.org/t/p/original${company.logo_path}`} alt={company.name} />
                                                      <span>{company.name}</span>
                                                </>
                                          )}
                                    </div>
                              ))}
                  </div>
            </div>
      );
};

export default Movie;
