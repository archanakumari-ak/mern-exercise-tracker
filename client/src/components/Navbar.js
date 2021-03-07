import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Navbar extends Component {
  render() {
    return (
      <div>
        <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
          <div className="container" >
            <Link className='navbar-brand' to='/'>
              Exercise Tracker
            </Link>
            <button
              className='navbar-toggler'
              type='button'
              data-toggle='collapse'
              data-target='#navbarSupportedContent'
              aria-controls='navbarSupportedContent'
              aria-expanded='false'
              aria-label='Toggle navigation'
            >
              <span className='navbar-toggler-icon'></span>
            </button>

            <div
              className='collapse navbar-collapse justify-content-end'
              id='navbarSupportedContent'
            >
              <ul className='navbar-nav'>
                <li className='nav-item active'>
                  <Link className='nav-link' to='/'>
                    Exercises
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link className='nav-link' to='/create'>
                    Create Exercise
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link className='nav-link' to='/user'>
                    Create User
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}
