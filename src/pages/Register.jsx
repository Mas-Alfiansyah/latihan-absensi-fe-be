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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={submit} className="p-6 bg-white rounded shadow-md w-96 max-w-full">
        <h2 className="text-lg font-semibold mb-3">Register</h2>

        <input className="w-full border p-2 mb-2 rounded" placeholder="Name" value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })} />

        <input className="w-full border p-2 mb-2 rounded" placeholder="Email" value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })} />

        <input className="w-full border p-2 mb-2 rounded" placeholder="Password" type="password" value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })} />

        <select className="w-full border p-2 mb-4 rounded" value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}>
          <option value="teacher">Teacher</option>
          <option value="admin">Admin</option>
        </select>

        <button className="w-full p-2 bg-green-600 text-white rounded">Register</button>

        <p className="text-center mt-3 text-sm">
          Sudah punya akun? <Link to="/login" className="text-blue-600">Login</Link>
        </p>
      </form>
    </div>
  );
}
