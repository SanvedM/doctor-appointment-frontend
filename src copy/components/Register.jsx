import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axios";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
    first_name: "",
    last_name: "",
    email: "",
    mobile_no: "",
    role: "customer",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axiosInstance.post("/register-user", form);
      alert("Registration successful!");
      navigate("/login");
    } catch (err) {
      alert("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={submit}
        className="bg-white p-6 rounded-lg shadow w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-5">Create Account</h2>

        <input
          name="username"
          placeholder="Username"
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
        />

        <input
          name="first_name"
          placeholder="First Name"
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
        />

        <input
          name="last_name"
          placeholder="Last Name"
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
        />

        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
        />

        <input
          name="mobile_no"
          placeholder="Mobile Number"
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
        />

        {/* ROLE DROPDOWN */}
        <label className="text-sm font-medium">Register As</label>
        <select
          name="role"
          onChange={handleChange}
          className="w-full mb-5 p-2 border rounded bg-white text-gray-700"
        >
          <option value="customer">Customer</option>
          <option value="doctor">Doctor</option>
        </select>

        <button
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Creating..." : "Register"}
        </button>

        <p className="text-sm mt-4 text-center">
          Already have account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-600 cursor-pointer"
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default Register;
