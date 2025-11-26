import { useState, useContext } from "react";
import axios from "../utils/axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { useNotification } from "../context/NotificationContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(AuthContext);
  const nav = useNavigate();
  const { showNotification } = useNotification();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/login", { email, password });
      const user = res.data.user;
      setUser(user);

      showNotification({
        type: "success",
        title: "Login Berhasil",
        message: "Anda berhasil masuk.",
        showOkButton: false
      });

      setTimeout(() => nav(`/${user.role}`), 1200);
    } catch (err) {
      showNotification({
        type: "error",
        title: "Login Gagal",
        message: err.response?.data?.message || "Email atau password salah.",
        showOkButton: true
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <div className="w-full max-w-md">
        <form onSubmit={submit} className="bg-white p-8 rounded-2xl shadow-2xl border border-gray-200 backdrop-blur-sm">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome Back</h2>
            <p className="text-gray-600 text-sm">Sign in to your account</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button className="w-full mt-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-lg">Login</button>

          <p className="text-center mt-4 text-sm text-gray-600">
            Don't have an account? <Link to="/register" className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200">Register here</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
