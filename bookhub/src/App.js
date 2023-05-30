import React from 'react';
import './App.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add(faSearch);

function App() {
  return (
    <div className="App">
      <div className="sidebar">
        <div className="logo"><h3>BookHub</h3></div>
        <ul className="options">
          <li>Home</li>
          <li>Genres</li>
          <li>My Books</li>
          <li>Trending</li>
          <li>Favourites</li>
          <li>Contact Us</li>
        </ul>
      </div>
      <div className="content">
        <div className="search-bar">
          <input type="text" placeholder="Search..." />
          <button className="search-button">
          <FontAwesomeIcon icon={faSearch} /> 
          </button>
        </div>
        {/* Content of your dashboard goes here */}
      </div>
    </div>
  );
}

export default App;

