import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Opening from "./pages/Opening";
import Dashboard from "./pages/Dashboard";
import UserManagement from "./pages/UserManagement";
import LayoutUser from "./components/LayoutUser";
import LayoutAdmin from "./components/LayoutAdmin";
import RequireAdmin from "./components/RequireAdmin";
import RequireUser from "./components/RequireUser";
import AddUser from "./pages/AddUser/add";
import UpdateUser from "./pages/AddUser/update";
import ClientManagement from "./pages/ClientManagement";
import AddClient from "./pages/AddClient/add";
import UpdateClient from "./pages/AddClient/update";
import Settings from "./pages/Settings";
import AddPIC from "./pages/AddPIC/add";
import UpdatePIC from "./pages/AddPIC/update";
import RequireAuth from "./components/RequireAuth";
import TestHolland from "./pages/Test/testHolland";
import Home from "./pages/Home";
import TestPDR from "./pages/Test/testPDR";
import TestPauli from "./pages/Test/testPauli";
import Closing from "./pages/Closing";
import TestKecerdasan from "./pages/Test/testKecerdasan";

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
        <Route path="/home" element={<Home />} />
        <Route path="/opening/:id" element={<Opening />} />
        <Route path="/holland-test/:id" element={<TestHolland />} />
        <Route path="/pdr-test/:id" element={<TestPDR />} />
        <Route path="/pauli-test/:id" element={<TestPauli />} />
        <Route path="/kecerdasan-test/:id" element={<TestKecerdasan />} />
        <Route path="/closing/:id" element={<Closing />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;
