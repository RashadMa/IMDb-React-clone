import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
    <div className="header">
      <div className="logo-section">
        <Link to="/">
          <img
            className="logo"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/2560px-IMDB_Logo_2016.svg.png"
            alt="IMDB Logo"
          />
        </Link>
        <Link to="/movies/top_rated" className="links">
          <span>Top Rated</span>
        </Link>
        <Link to='/movies/popular' className='links'>
          <span>Popular Movies</span>
        </Link>
        <Link to="/movies/upcoming" className="links">
          <span>Upcoming</span>
        </Link>
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
      </div>
    </div>
  );
};

export default Header;
