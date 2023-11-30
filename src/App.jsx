import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import "./App.css";
import Profile from "./pages/profile/Profile";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="*" element={<div>No Page</div>} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
