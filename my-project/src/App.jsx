import React from "react";
import NavBar from "./components/NavBar";
import Landing from "./views/Landing";
import Register from "./views/Register";
import Login from "./views/Login";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
const App = () => {
  return (
    <Router>
      <NavBar />

      <Routes>
        <Route path="/signUp" element={<Register />} />
      </Routes>
      <Routes>
        <Route path='/signin' element={<Login />} />
      </Routes>
      <Routes>
        <Route path="/" element={<Landing />} />
      </Routes>
    </Router>
  );
};

export default App;
