import React from 'react';
import './App.css';

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
        {/* Content of your dashboard goes here */}
      </div>
    </div>
  );
}

export default App;
