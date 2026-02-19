import { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

function AddEmployee() {
  const [form, setForm] = useState({
    employee_id: "",
    full_name: "",
    email: "",
    department: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post("employees/", form);
    navigate("/dashboard");
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Add Employee</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          placeholder="employee id"
          className="w-full border p-2 rounded"
          onChange={(e) => setForm({ ...form, employee_id: e.target.value })}
        />

        <input
          placeholder="full name"
          className="w-full border p-2 rounded"
          onChange={(e) => setForm({ ...form, full_name: e.target.value })}
        />

        <input
          placeholder="email"
          className="w-full border p-2 rounded"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          placeholder="department"
          className="w-full border p-2 rounded"
          onChange={(e) => setForm({ ...form, department: e.target.value })}
        />

        <button className="bg-green-600 text-white px-4 py-2 rounded">
          Add Employee
        </button>
      </form>
    </div>
  );
}

export default AddEmployee;
