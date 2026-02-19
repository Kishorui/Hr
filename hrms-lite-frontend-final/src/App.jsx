import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import AddEmployee from "./pages/AddEmployee";
import AttendancePage from "./pages/AttendancePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-employee" element={<AddEmployee />} />
        <Route path="/attendance" element={<AttendancePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
