import React from "react";
import "./App.css";
import Sidebar from "./scenes/global/Sidebar";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./components/Home";
import Authors from "./components/Authors";
import Statistics from "./components/Statistics";
import { BookContextProvider } from "./scenes/dashboard/BookContext";

function App() {
  return (
    <div className="App">
      <BookContextProvider>
        <Sidebar />
        <main className="content">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/authors" element={<Authors />} />
              <Route path="/statistics" element={<Statistics />} />
              <Route path="/authors" exact component={Authors} />
            </Routes>
          </BrowserRouter>
        </main>
      </BookContextProvider>
    </div>
  );
}

export default App;
