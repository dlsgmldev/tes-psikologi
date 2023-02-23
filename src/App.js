import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Opening from "./pages/Opening";
import Test from "./pages/Test";
import Thankyou from "./pages/Thankyou";
import Dashboard from "./pages/Dashboard";
import Report from "./pages/Report";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/opening" element={<Opening />} />
      <Route path="/test" element={<Test />} />
      <Route path="/thankyou" element={<Thankyou />} />
      <Route path="/report" element={<Report />} />
    </Routes>
  </BrowserRouter>
);

export default App;
