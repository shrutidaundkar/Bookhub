import React from "react";
import "./App.css";
import Sidebar from "./scenes/global/Sidebar";
import Topbar from "./scenes/global/Topbar";
import SearchResult from "./scenes/global/SearchResult";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./scenes/dashboard";
import { useState } from "react";
import Authors from "./scenes/authors";
import Statistics from "./scenes/statistics";

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
            <Route path="/authors" element={<Authors />} />
            <Route path="/statistics" element={<Statistics />} />
          </Routes>
        </BrowserRouter>
      </main>
    </div>
  );
}

export default App;
