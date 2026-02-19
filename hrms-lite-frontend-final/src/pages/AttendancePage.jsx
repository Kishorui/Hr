import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

function AttendancePage() {
  const navigate = useNavigate();

  const [employees, setEmployees] = useState([]);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);

  const role = localStorage.getItem("role"); // 🔥 Get role
  const token = localStorage.getItem("token");

  const [form, setForm] = useState({
    employee: "",
    date: "",
    status: "Present",
  });

  // 🔐 Protect Page (must be logged in)
  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token, navigate]);

  // 📥 Fetch Employees (Admin & HR only needed but safe to fetch)
  const fetchEmployees = async () => {
    try {
      const res = await API.get("employees/");
      setEmployees(res.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  // 📊 Fetch Attendance Records
  const fetchAttendance = async () => {
    try {
      setLoading(true);
      const res = await API.get("attendance/all/");
      setRecords(res.data);
    } catch (error) {
      console.error("Error fetching attendance:", error);
      alert(
        error.response?.data?.detail ||
          "Failed to load attendance records"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
    fetchAttendance();
  }, []);

  // 📝 Handle Input Change
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ✅ Submit Attendance (Admin & HR Only)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.employee || !form.date) {
      alert("Please select employee and date");
      return;
    }

    try {
      await API.post("attendance/", form);
      alert("Attendance marked successfully");

      // Reset form
      setForm({
        employee: "",
        date: "",
        status: "Present",
      });

      fetchAttendance();
    } catch (error) {
      console.error("Attendance error:", error);
      alert(
        error.response?.data?.detail ||
          error.response?.data?.non_field_errors?.[0] ||
          "Failed to mark attendance"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* 🔝 Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          Attendance Management ({role})
        </h1>

        <button
          onClick={() => navigate("/dashboard")}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Back to Dashboard
        </button>
      </div>

      {/* 🔥 ROLE-BASED: Hide Form for Employee */}
      {(role === "Admin" || role === "HR") && (
        <div className="bg-white p-6 rounded shadow mb-6">
          <h2 className="text-xl font-semibold mb-4">
            Mark Attendance
          </h2>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-3 gap-4"
          >
            {/* Employee Dropdown */}
            <select
              name="employee"
              value={form.employee}
              onChange={handleChange}
              required
              className="border p-3 rounded"
            >
              <option value="">Select Employee</option>
              {employees.map((emp) => (
                <option key={emp.id} value={emp.id}>
                  {emp.full_name}
                </option>
              ))}
            </select>

            {/* Date */}
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              required
              className="border p-3 rounded"
            />

            {/* Status */}
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="border p-3 rounded"
            >
              <option value="Present">Present</option>
              <option value="Absent">Absent</option>
            </select>

            {/* Submit Button */}
            <button className="col-span-3 bg-green-600 text-white py-2 rounded hover:bg-green-700">
              Mark Attendance
            </button>
          </form>
        </div>
      )}

      {/* 📊 Attendance Table (All roles can view) */}
      <div className="bg-white shadow rounded">
        <h2 className="text-xl font-semibold p-4 border-b">
          Attendance Records
        </h2>

        {loading ? (
          <p className="p-6 text-center">Loading attendance...</p>
        ) : records.length === 0 ? (
          <p className="p-6 text-center text-gray-500">
            No attendance records found
          </p>
        ) : (
          <table className="w-full text-left">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-3">Employee</th>
                <th className="p-3">Date</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {records.map((rec) => (
                <tr key={rec.id} className="border-t">
                  <td className="p-3">{rec.employee_name}</td>
                  <td className="p-3">{rec.date}</td>
                  <td className="p-3">
                    <span
                      className={
                        rec.status === "Present"
                          ? "text-green-600 font-semibold"
                          : "text-red-600 font-semibold"
                      }
                    >
                      {rec.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default AttendancePage;
