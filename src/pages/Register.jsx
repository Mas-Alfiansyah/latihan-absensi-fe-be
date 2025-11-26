import { useState } from "react";
import axios from "../utils/axios";
import { useNavigate, Link } from "react-router-dom";
import { useNotification } from "../context/NotificationContext";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "teacher" });
  const nav = useNavigate();
  const { showNotification } = useNotification();

  const submit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/register", form);
      showNotification({
        type: "success",
        title: "Registrasi Berhasil",
        message: "Silakan login",
        showOkButton: true
      });
      setTimeout(() => nav("/login"), 900);
    } catch (err) {
      showNotification({
        type: "error",
        title: "Registrasi Gagal",
        message: err.response?.data?.message || "Gagal melakukan registrasi",
        showOkButton: true
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <div className="w-full max-w-md">
        <form onSubmit={submit} className="bg-white p-8 rounded-2xl shadow-2xl border border-gray-200 backdrop-blur-sm">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Create Account</h2>
            <p className="text-gray-600 text-sm">Join us today</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 outline-none"
                placeholder="Enter your full name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 outline-none"
                placeholder="Enter your email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 outline-none"
                type="password"
                placeholder="Create a password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
              <select
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 outline-none bg-white"
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
              >
                <option value="teacher">Teacher</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>

          <button className="w-full mt-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:from-green-700 hover:to-emerald-700 transform hover:scale-105 transition-all duration-200 shadow-lg">Register</button>

          <p className="text-center mt-4 text-sm text-gray-600">
            Already have an account? <Link to="/login" className="text-green-600 hover:text-green-800 font-medium transition-colors duration-200">Login here</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
