import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Header.css";
import { Container, Row, Col } from 'reactstrap'


const Header = ({ addedMoviesCount = 20 }) => {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isInputVisible, setIsInputVisible] = useState(false);

  const handleSearchIconClick = () => {
    setIsInputVisible(true);
  };

  const handleCloseIconClick = () => {
    setIsInputVisible(false);
    setQuery('');
  };
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (query.trim() === "") {
        setSearchResults([]);
        return;
      }
      setIsLoading(true);
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/multi`,
          {
            params: {
              query: query,
              include_adult: false,
              language: "en-US",
              page: 1,
            },
            headers: {
              Authorization:
                'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyOTg4MTJiY2YzMjU2NjBiYzI5NzY2NTIyZDIxMzU5NSIsInN1YiI6IjY1ODJkYjk4ZjE3NTljM2ZkOTEwYmRmZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tIjJJNiU03GebFQI6PLaB15wgk6RB1TVhY-Ui5Y3_Rc',
            },
          }
        );
        setSearchResults(response.data.results);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
      setIsLoading(false);
    };

    const delayTimer = setTimeout(() => {
      fetchData();
    }, 300);

    return () => clearTimeout(delayTimer);
  }, [query]);

  useEffect(() => {
    const handleResize = () => {
      setIsInputVisible(window.innerWidth >= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="bgc header">
      <Container className="relative">
        <Row className="align-items-center justify-content-space-between">
          <Col lg="2" md="2" sm="2">
            <div className="d-flex">
              <Col lg="6">
                <div className="logo-section">
                  <Link to="/">
                    <img
                      className="logo"
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/2560px-IMDB_Logo_2016.svg.png"
                      alt="IMDB Logo"
                    />
                  </Link>
                </div>
              </Col>
              <Col lg="6" className="d-flex justify-content-center">
                <div className="menu-button-container">
                  <div className={`hamburger-menu ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
                    <div className="line"></div>
                    <div className="line"></div>
                    <div className="line"></div>
                  </div>
                  <span className="menu-word">Menu</span>
                </div>
              </Col>
            </div>
          </Col>
          <Col lg="9" sm="auto">
            <div className="search-section">
              <div className={`search-input-container ${isInputVisible && window.innerWidth < 768 ? 'mobile-visible' : ''}`}>
                <input
                  type="text"
                  placeholder="Type here..."
                  className={`search-input ${isInputVisible ? 'd-block' : 'd-none'}`}
                  value={query}
                  onChange={handleInputChange}
                />
                {isInputVisible && window.innerWidth < 768 && (
                  <div className="close-icon" onClick={handleCloseIconClick}>
                    X
                  </div>
                )}
              </div>
              <div
                className={`search-icon ${!isInputVisible ? 'd-block' : 'd-none'}`}
                onClick={handleSearchIconClick}
              >
                🔍
              </div>
            </div>
          </Col>
          <Col lg="1">
            <div className="watchlist-container">
              <Col lg="2">
                <div className="watchlist-icon">
                  <svg width="26" height="26" className="text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 24">
                    <path d="M17 24a1 1 0 0 1-.64-.231L9 18.45l-7.36 5.819A1 1 0 0 1 0 23V2a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v21a1 1 0 0 1-1 1Z" />
                    {addedMoviesCount > 0 && (
                      <text x="50%" y="50%" dy=".3em" textAnchor="middle" fontSize="10" fill="#000">
                        {addedMoviesCount}
                      </text>
                    )}
                  </svg>
                </div>
              </Col>
              <Col lg="10">
                <div className="watchlist-text">Watchlist</div>
              </Col>
            </div>
          </Col>
        </Row>
        {searchResults.length > 0 && isInputVisible && (
          <div className="spec d-flex align-items-center justify-content-center">
            <div className="search-results-wrapper">
              {searchResults.map((result) => (
                <Link onClick={() => setQuery('')} to={`/movie/${result.id}`} key={result.id} className="search-result-card d-flex">
                  <Col lg="1">
                    <img
                      className="search-result-img"
                      src={`https://image.tmdb.org/t/p/w92${result.poster_path}`}
                      alt={result.title || result.name}
                    />
                  </Col>
                  <Col lg="11">
                    <div>{result.title || result.name}</div>
                    <div className="text-2">{result.first_air_date && new Date(result.first_air_date).getFullYear()}</div>
                    <div className="text-2">{result.media_type}</div>
                  </Col>
                </Link>
              ))}
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};

export default Header;
