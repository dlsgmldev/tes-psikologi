import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Opening from "./pages/Opening";
import Test from "./pages/Test";
import Thankyou from "./pages/Thankyou";
import Dashboard from "./pages/Dashboard";
import Report from "./components/Report";
import UserManagement from "./pages/UserManagement";
import LayoutUser from "./components/LayoutUser";
import LayoutAdmin from "./components/LayoutAdmin";
import RequireAdmin from "./components/RequireAdmin";
import RequireUser from "./components/RequireUser";
import AddUser from "./pages/AddUser";
import UpdateUser from "./pages/UpdateUser";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        element={
          // <RequireAdmin>
          <LayoutAdmin />
          // </RequireAdmin>
        }
      >
        <Route path="/" element={<Dashboard />} />
        <Route path="/user-management" element={<UserManagement />} />
        <Route path="/add-user" element={<AddUser />} />
        <Route path="/update-user/:id" element={<UpdateUser />} />
      </Route>
      <Route
        element={
          // <RequireUser>
            <LayoutUser />
          // </RequireUser>
        }
      >
        <Route path="/opening" element={<Opening />} />
        <Route path="/test" element={<Test />} />
        <Route path="/thankyou" element={<Thankyou />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;
