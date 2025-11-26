import { useAuth } from "../hooks/useAuth";
import { useConfirm } from "../hooks/NotificationConfirmContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { confirm } = useConfirm();

  const handleLogout = () => {
    confirm({ title: "Logout?", message: "Apakah Anda yakin ingin keluar dari akun?", onConfirm: logout });
  };

  return (
    <nav className="w-full bg-slate-900 text-white px-6 py-3 flex justify-between items-center">
      <div className="font-bold">Absensi App</div>
      <div className="flex items-center gap-4">
        <div className="text-sm">Halo, {user?.name || "User"}</div>
        <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded text-sm hover:bg-red-600">
          Logout
        </button>
      </div>
    </nav>
  );
}
