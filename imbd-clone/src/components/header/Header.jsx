import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <div className='header'>
      <div className='logo-section'>
        <Link to='/'>
          <img
            className='logo'
            src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/2560px-IMDB_Logo_2016.svg.png'
          />
        </Link>
        <Link to='/movies/popular' className='links'>
          <span>Popular Movies</span>
        </Link>
        <Link to='/movies/top_rated' className='links'>
          <span>Top Rated</span>
        </Link>
        <Link to='/movies/upcoming' className='links'>
          <span>Upcoming</span>
        </Link>
      </div>
    </div>
  );
};

export default Header;
