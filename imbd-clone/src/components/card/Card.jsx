import React, { useEffect, useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "./Card.css";
import { Link } from "react-router-dom";

const Cards = ({ movie }) => {
      const [isLoading, setIsLoading] = useState(true);

      useEffect(() => {
            const fetchData = async () => {
                  setTimeout(() => {
                        setIsLoading(false);
                  }, 1500);
            };
            fetchData();
      }, [movie]);

      const roundedVoteAverage = movie ? parseFloat(movie.vote_average).toFixed(1) : "";

      const formatDate = (dateString) => {
            const options = { month: 'long', day: 'numeric', year: 'numeric' };
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', options);
      };

      return (
            <>
                  {isLoading ? (
                        <div className="cards">
                              <SkeletonTheme color="#202020" highlightColor="#444">
                                    <Skeleton height={300} duration={2} />
                              </SkeletonTheme>
                        </div>
                  ) : (
                        <Link to={`/movie/${movie.id}`} className="cardWrapper">
                              <div className="cards">
                                    <img
                                          className="cardsImg"
                                          src={`https://image.tmdb.org/t/p/original${movie ? movie.poster_path : ""}`}
                                          alt={movie ? movie.original_title : ""}
                                    />
                                    <div className="cardsOverlay">
                                          <div className="cardTitle">{movie ? movie.original_title : ""}</div>
                                          <div className="cardRuntime">
                                                {formatDate(movie ? movie.release_date : "")}
                                                <span className="cardRating">
                                                      <i className="fas fa-star ylw" />{' '}
                                                      {roundedVoteAverage}/10
                                                </span>
                                          </div>
                                          <div className="cardDescription">{movie ? movie.overview.slice(0, 118) + "..." : ""}</div>
                                    </div>
                              </div>
                        </Link>
                  )}
            </>
      );
};

export default Cards;
