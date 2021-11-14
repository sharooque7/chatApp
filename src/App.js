import "./App.css";
import Messenger from "./pages/messenger";
import Login from "./pages/Login/Login";
import Signup from "./pages/signup/Signup";
import { Routes, Route } from "react-router-dom";
import React from "react";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/messenger" element={<Messenger />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;
