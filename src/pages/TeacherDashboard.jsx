import Navbar from "../components/Navbar";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function TeacherDashboard() {
  const { user } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="p-6">
        <div className="bg-white rounded shadow p-6">
          <h1 className="text-2xl font-semibold mb-2">Teacher Dashboard</h1>
          <p>Anda login sebagai <strong>{user?.name}</strong> (Teacher).</p>
        </div>
      </main>
    </div>
  );
}
