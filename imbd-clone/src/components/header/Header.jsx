import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Header.css";
import { Container, Row, Col } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';


const Header = ({ addedMoviesCount = 20 }) => {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

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

  return (
    <div className="bgc header">
      <Container>
        <Row className="align-items-center justify-content-center">
          <Col lg="2">
            <Row >
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
              <Col lg="6">
                <div className="menu-button-container">
                  <div className={`hamburger-menu ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
                    <div className="line"></div>
                    <div className="line"></div>
                    <div className="line"></div>
                  </div>
                  <span className="menu-word">Menu</span>
                </div>
              </Col>
            </Row>
          </Col>
          <Col lg="9">
            <div className="search-section">
              <input
                type="text"
                placeholder="Type here..."
                className="search-input"
                value={query}
                onChange={handleInputChange}
              />
              {isLoading && <p>...</p>}
              {searchResults.length > 0 && (
                <div className="search-results">
                  {searchResults.map((result) => (
                    <div key={result.id} className="search-result-card">
                      <img
                        src={`https://image.tmdb.org/t/p/w92${result.poster_path}`}
                        alt={result.title || result.name}
                      />
                      <p>{result.title || result.name}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Col>
          <Col lg="1">
            <div className="watchlist-container">

              <Col lg="1">
                <div className="watchlist-icon">
                  <FontAwesomeIcon icon={faBookmark} />
                </div>
              </Col>
              <Col lg="8">
                <div className="watchlist-text">Watchlist</div>
              </Col>
              <Col lg="3">
                {
                  addedMoviesCount > 0 && (
                    <div className="added-movies-count">
                      <div className="circle">{addedMoviesCount}</div>
                    </div>
                  )}
              </Col>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Header;
