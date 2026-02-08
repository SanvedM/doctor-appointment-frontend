import { useContext, useState } from "react";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import doctorImg from "../assets/doc.avif";

const Login = () => {
  const { loginUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await loginUser(form.username, form.password);

      // ✅ redirect on success
      navigate("/home");
    } catch (err) {
      // ❌ interactive error
      setError("Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">

      {/* LEFT IMAGE */}
      <div
        className="md:w-1/2 w-full h-64 md:h-auto bg-cover bg-center"
        style={{ backgroundImage: `url(${doctorImg})` }}
      />

      {/* RIGHT FORM */}
      <div className="md:w-1/2 w-full flex items-center justify-center bg-white px-6">
        <form
          onSubmit={submit}
          className="w-full max-w-md"
        >
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            Login
          </h2>

          {/* ❌ Error Message */}
          {error && (
            <div className="mb-4 rounded-lg bg-red-100 text-red-700 px-4 py-2 text-sm">
              {error}
            </div>
          )}

          <input
            className="w-full mb-4 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Username"
            onChange={(e) =>
              setForm({ ...form, username: e.target.value })
            }
          />

          <input
            type="password"
            className="w-full mb-6 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Password"
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          <button
            disabled={loading}
            className="
              w-full py-3 rounded-lg font-semibold
              bg-blue-600 text-white
              hover:bg-blue-700 transition
              disabled:opacity-50 disabled:cursor-not-allowed
            "
          >
            {loading ? "Logging in..." : "Login"}
          </button>


<p className="text-sm text-gray-600 mt-3 text-center">
  Don’t have an account?{" "}
  <span
    onClick={() => navigate("/register")}
    className="text-blue-600 cursor-pointer hover:underline font-medium"
  >
    Register Here
  </span>
</p>

          <p className="text-sm text-gray-500 mt-4">
            © 2026 Healthcare System
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
