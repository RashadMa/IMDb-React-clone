import React from "react";
import { Link } from "react-router-dom";
import "./ErrorPage.css";

const ErrorPage = () => {
      return (
            <div className="error-container">
                  <div className="error-content">
                        <h1 className="error-heading">Oops! Something went wrong.</h1>
                        <p className="error-text">
                              We're sorry, but there seems to be an issue with our application. Please try again later.
                        </p>
                        <Link to="/" className="back-to-home">
                              Back to Home
                        </Link>
                  </div>
            </div>
      );
};

export default ErrorPage;
