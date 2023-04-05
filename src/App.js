import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Opening from "./pages/Opening";
import Test from "./pages/Test";
import Thankyou from "./pages/Thankyou";
import Dashboard from "./pages/Dashboard";
import UserManagement from "./pages/UserManagement";
import LayoutUser from "./components/LayoutUser";
import LayoutAdmin from "./components/LayoutAdmin";
import RequireAdmin from "./components/RequireAdmin";
import RequireUser from "./components/RequireUser";
import AddUser from "./pages/AddUser";
import UpdateUser from "./pages/UpdateUser";
import ClientManagement from "./pages/ClientManagement";
import AddClient from "./pages/AddClient";
import UpdateClient from "./pages/UpdateClient";
import Settings from "./pages/Settings";
import AddPIC from "./pages/AddPIC";
import UpdatePIC from "./pages/UpdatePIC";
import RequireAuth from "./components/RequireAuth";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        element={
          <RequireAuth>
            <RequireAdmin>
              <LayoutAdmin />
            </RequireAdmin>
          </RequireAuth>
        }
      >
        <Route path="/" element={<Dashboard />} />
        <Route path="/user-management/:id" element={<UserManagement />} />
        <Route path="/add-user/:id" element={<AddUser />} />
        <Route path="/update-user/:id/:id2" element={<UpdateUser />} />
        <Route path="/client-management" element={<ClientManagement />} />
        <Route path="/add-client" element={<AddClient />} />
        <Route path="/update-client/:id" element={<UpdateClient />} />
        <Route path="/add-pic/:id" element={<AddPIC />} />
        <Route path="/update-pic/:id/:id2" element={<UpdatePIC />} />
        <Route path="/settings/:id" element={<Settings />} />
      </Route>
      <Route
        element={
          <RequireAuth>
            <RequireUser>
              <LayoutUser />
            </RequireUser>
          </RequireAuth>
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
