import React from "react";
import "./App.css";
import Sidebar from "./scenes/global/Sidebar";
import Topbar from "./scenes/global/Topbar";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./scenes/dashboard";

function App() {
  return (
    <div className="App">
      <Sidebar />
      <main className="content">
        <Topbar />

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
