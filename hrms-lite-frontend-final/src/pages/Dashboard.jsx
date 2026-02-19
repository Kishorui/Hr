import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

function Dashboard() {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔥 Get role from localStorage
  const role = localStorage.getItem("role");

  // 🔐 Check Login
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  // 📥 Fetch Employees
  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const res = await API.get("employees/");
      setEmployees(res.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
      alert("Failed to load employees.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // 🗑️ Delete Employee (Admin Only)
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this employee?"
    );
    if (!confirmDelete) return;

    try {
      await API.delete(`employees/${id}/`);
      alert("Employee deleted successfully");
      fetchEmployees();
    } catch (error) {
      const message =
        error.response?.data?.detail ||
        "You have no permission to delete user";
      alert(message);
    }
  };

  // 🚪 Logout
  const handleLogout = () => {
    localStorage.clear();
    alert("Logged out successfully");
    navigate("/");
  };

  // ➕ Navigation
  const goToAddEmployee = () => {
    navigate("/add-employee");
  };

  const goToAttendance = () => {
    navigate("/attendance");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* 🔝 Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          Dashboard ({role})
        </h1>

        <div className="flex gap-3">
          {/* 👑 ADMIN & HR → Show Add Employee */}
          {(role === "Admin" || role === "HR") && (
            <button
              onClick={goToAddEmployee}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Add Employee
            </button>
          )}

          {/* 👑 ADMIN & HR → Show Attendance */}
          {(role === "Admin" || role === "HR") && (
            <button
              onClick={goToAttendance}
              className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
            >
              Manage Attendance
            </button>
          )}

          {/* Logout (All Roles) */}
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>

      {/* 👨‍💼 Employee Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        {loading ? (
          <p className="p-6 text-center text-lg">Loading employees...</p>
        ) : employees.length === 0 ? (
          <p className="p-6 text-center text-lg text-gray-500">
            No employees found
          </p>
        ) : (
          <table className="w-full text-left">
            {/* Table Header */}
            <thead className="bg-black text-white">
              <tr>
                <th className="p-4">Employee ID</th>
                <th className="p-4">Full Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Department</th>

                {/* 👑 ONLY ADMIN sees Action column */}
                {role === "Admin" && (
                  <th className="p-4 text-center">Action</th>
                )}
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {employees.map((emp) => (
                <tr
                  key={emp.id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="p-4 font-medium">
                    {emp.employee_id}
                  </td>
                  <td className="p-4">{emp.full_name}</td>
                  <td className="p-4">{emp.email}</td>
                  <td className="p-4">{emp.department}</td>

                  {/* 👑 Delete Button ONLY for Admin */}
                  {role === "Admin" && (
                    <td className="p-4 text-center">
                      <button
                        onClick={() => handleDelete(emp.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
      )}
      </div>
    </div>
  );
}

export default Dashboard;
