import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "", // 🔥 empty by default (no pre-selection)
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    // 🔥 Role validation (must select)
    if (!form.role) {
      alert("Please select a role");
      return;
    }

    if (!form.username || !form.email || !form.password) {
      alert("All fields are required");
      return;
    }

    setLoading(true);
    try {
      await axios.post("https://hr-4lye.onrender.com/api/signup/", form);

      alert("Signup Successful! Please login.");
      navigate("/");
    } catch (error) {
      console.error(error);
      alert(
        error.response?.data?.error ||
        "Signup failed. Try different email or username."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow w-full max-w-xl">
        <h1 className="text-3xl font-bold mb-6">Sign Up</h1>

        <form onSubmit={handleSignup} className="space-y-4">
          {/* Username */}
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="w-full border p-3 rounded"
            value={form.username}
            onChange={handleChange}
            required
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full border p-3 rounded"
            value={form.email}
            onChange={handleChange}
            required
          />

          {/* Password */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full border p-3 rounded"
            value={form.password}
            onChange={handleChange}
            required
          />

          {/* 🔥 ROLE DROPDOWN WITH "SELECT ROLE" DEFAULT */}
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            required
          >
            <option value="">Select Role</option> {/* Default Placeholder */}
            <option value="Employee">Employee</option>
            <option value="Admin">Admin</option>
            <option value="HR">HR</option>
          </select>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700"
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        {/* Login Redirect */}
        <p className="mt-4 text-center">
          Already have an account?{" "}
          <span
            className="text-blue-600 cursor-pointer font-semibold"
            onClick={() => navigate("/")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

export default Signup;
