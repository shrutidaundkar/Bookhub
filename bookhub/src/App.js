import React from "react";
import "./App.css";
import Sidebar from "./scenes/global/Sidebar";
import Topbar from "./scenes/global/Topbar";
import SearchResult from "./scenes/global/SearchResult";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./scenes/dashboard";
import { useState } from "react";

function App() {
  const [searchResult, setSearchResult] = useState(null);

  return (
    <div className="App">
      <Sidebar />
      <main className="content">
        <Topbar setSearchResult={setSearchResult} />
        <SearchResult searchResult={searchResult} />

        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </main>
    </div>
  );
}

export default App;

