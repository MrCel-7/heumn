import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import PendingPO from "./pages/PendingPO";
import Sales from "./pages/user/Sales";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/pending" element={<PendingPO />} />
        <Route path="/sales" element={<Sales />} />
      </Routes>
    </BrowserRouter>
  );
}
