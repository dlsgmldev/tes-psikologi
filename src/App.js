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
import ClientManagement from "./pages/ClientManagement";
import Settings from "./pages/Settings";
import RequireAuth from "./components/RequireAuth";
import TestHolland from "./pages/Test/testHolland";
import Home from "./pages/Home";
import TestPDR from "./pages/Test/testPDR";
import TestPauli from "./pages/Test/testPauli";
import Closing from "./pages/Closing";
import ReportHolland from "./pages/Report/reportHolland";
import ReportPDR from "./pages/Report/reportPDR";
import TestVerbal from "./pages/Test/testVerbal";
import ReportVerbal from "./pages/Report/reportVerbal";
import TestNumeric from "./pages/Test/testNumeric";
import ReportNumeric from "./pages/Report/reportNumeric";
import CriticalIncident from "./pages/Test/criticalIncident";
import AddPIC from "./pages/UserManagement/PIC/add";
import UpdatePIC from "./pages/UserManagement/PIC/update";
import AddUser from "./pages/UserManagement/add";
import UpdateUser from "./pages/UserManagement/update";
import AddClient from "./pages/ClientManagement/add";
import UpdateClient from "./pages/ClientManagement/update";
import ScheduleDetail from "./pages/UserManagement/Schedule/detail";
import ReportCI from "./pages/Report/reportCI";

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
        <Route path="/report-holland-test/:id" element={<ReportHolland />} />
        <Route path="/report-pdr-test/:id" element={<ReportPDR />} />
        <Route path="/report-verbal-test/:id" element={<ReportVerbal />} />
        <Route path="/report-numeric-test/:id" element={<ReportNumeric />} />
        <Route path="/report-critical-incident/:id" element={<ReportCI />} />
        <Route path="/user-management/:id" element={<UserManagement />} />
        <Route path="/schedule-detail/:id/:id2" element={<ScheduleDetail />} />
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
        <Route path="/verbal-test/:id" element={<TestVerbal />} />
        <Route path="/numeric-test/:id" element={<TestNumeric />} />
        <Route path="/critical-incident/:id" element={<CriticalIncident />} />
        <Route path="/closing/:id" element={<Closing />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;
