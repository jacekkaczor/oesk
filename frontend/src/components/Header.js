import React, { Component } from "react";
import { Link } from "react-router-dom";

export class Header extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-primary ">
        <div className="container">
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <div className="navbar-brand">ApacheBench</div>
            <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
              <Link to="/add" className="nav-link">
                Add
              </Link>
              <Link to="/" className="nav-link">
                History
              </Link>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
