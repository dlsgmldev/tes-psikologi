import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Opening from "./pages/Opening";
import Test from "./pages/Test";
import Thankyou from "./pages/Thankyou";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/opening" element={<Opening />} />
      <Route path="/test" element={<Test />} />
      <Route path="/thankyou" element={<Thankyou />} />
    </Routes>
  </BrowserRouter>
);

export default App;
