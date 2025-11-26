import { useState } from "react";
import { Icon } from "@iconify/react";
import { useAuth } from "../hooks/useAuth";
import { useConfirm } from "../hooks/NotificationConfirmContext";
import SidebarDropdown from "./SidebarDropdown";

export default function Layout({ children }) {
  const { user, logout } = useAuth();
  const { confirm } = useConfirm();

  const handleLogout = () => {
    confirm({
      title: "Logout?",
      message: "Apakah Anda yakin ingin keluar dari akun?",
      onConfirm: logout,
    });
  };

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dataIndukOpen, setDataIndukOpen] = useState(false);
  const [keuanganOpen, setKeuanganOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <div className="flex h-screen">
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-2xl overflow-y-auto lg:translate-x-0 lg:static lg:inset-0 transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
          <a
            href="#"
            className="text-2xl font-bold flex items-center space-x-2 text-primary"
          >
            <img
              src="https://png.pngtree.com/png-vector/20221127/ourmid/pngtree-digital-media-play-button-gradient-color-hexagon-marketing-agency-mobile-app-png-image_6482499.png"
              alt="Logo SIM Pesantren"
              className="h-12 w-12 object-contain"
            />
            <span>Permata</span>
          </a>
        </div>

        <nav className="space-y-1 p-4">
          <div className="text-xs text-gray-400 font-semibold uppercase mb-2 px-3">
            Menu
          </div>

          <a
            href="#"
            className="flex items-center p-3 text-sm font-semibold rounded-xl text-green-50 bg-green-600 shadow-lg shadow-green-200"
          >
            <Icon icon="mdi:home" className="mr-3" /> Dashboard
          </a>

          <SidebarDropdown
            title="Data Induk"
            icon="mdi:database"
            open={dataIndukOpen}
            setOpen={setDataIndukOpen}
          >
            <a
              href="#"
              className="block p-2 text-sm text-gray-600 rounded-lg hover:bg-gray-100"
            >
              Santri
            </a>
            <a
              href="#"
              className="block p-2 text-sm text-gray-600 rounded-lg hover:bg-gray-100"
            >
              Guru & Pegawai
            </a>
            <a
              href="#"
              className="block p-2 text-sm text-gray-600 rounded-lg hover:bg-gray-100"
            >
              Kelas
            </a>
          </SidebarDropdown>

          <SidebarDropdown
            title="Keuangan"
            icon="mdi:cash-multiple"
            open={keuanganOpen}
            setOpen={setKeuanganOpen}
          >
            <a
              href="#"
              className="block p-2 text-sm text-gray-600 rounded-lg hover:bg-gray-100"
            >
              Pembayaran SPP
            </a>
            <a
              href="#"
              className="block p-2 text-sm text-gray-600 rounded-lg hover:bg-gray-100"
            >
              Laporan Kas
            </a>
          </SidebarDropdown>

          <div className="text-xs text-gray-400 font-semibold uppercase mb-2 pt-4 px-3">
            General
          </div>

          <a
            href="#"
            className="flex items-center p-3 text-sm font-medium rounded-xl text-gray-700 hover:bg-gray-100 focus:outline-none transition duration-150"
          >
            <Icon icon="mdi:cog" className="mr-3" /> Pengaturan
          </a>
          <a
            href="#"
            className="flex items-center p-3 text-sm font-medium rounded-xl text-gray-700 hover:bg-gray-100 focus:outline-none transition duration-150"
          >
            <Icon icon="mdi:help-circle" className="mr-3" /> Bantuan
          </a>
          <button
            onClick={handleLogout}
            className="flex items-center p-3 text-sm font-medium rounded-xl text-red-500 hover:bg-red-50 focus:outline-none transition duration-150"
          >
            <Icon icon="mdi:logout" className="mr-3" /> Logout
          </button>
        </nav>
      </aside>

      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-20 bg-black opacity-50 lg:hidden transition-opacity duration-300"
        ></div>
      )}

      <div className="flex-1 overflow-x-hidden overflow-y-auto">
        <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-20">
          <nav className="flex items-center justify-between p-4 max-w-full mx-auto">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="text-gray-500 focus:outline-none lg:hidden p-1 rounded-md hover:bg-gray-100"
              >
                <Icon icon="mdi:menu" className="w-6 h-6" />
              </button>
              <div className="relative hidden sm:block">
                <input
                  type="text"
                  placeholder="Cari santri, tugas, atau data..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-xl w-64 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                />
                <Icon
                  icon="mdi:magnify"
                  className="absolute left-3 top-2 text-gray-400"
                />
              </div>
            </div>

            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center space-x-2 p-2 rounded-xl hover:bg-gray-100 transition duration-150"
              >
                <span className="text-sm font-medium text-gray-700 hidden sm:block">
                  {user?.name || "User"}
                </span>
                <Icon icon="mdi:chevron-down" className="text-gray-500" />
                <img
                  src={user?.photo || "https://ui-avatars.com/api/?name=User"}
                  alt="Profile"
                  className="h-8 w-8 rounded-full object-cover"
                />
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-3 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 origin-top-right animate-fade-in z-50">
                  <div className="p-4 border-b">
                    <p className="font-bold text-gray-800 truncate">
                      {user?.name}
                    </p>
                    <p className="text-sm text-gray-500 truncate">
                      {user.email}
                    </p>
                  </div>
                  <div className="py-1">
                  <a
                    href="#"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600 transition duration-150"
                  >
                    <Icon icon="mdi:account-circle" className="mr-2" /> Profile
                  </a>
                  <button 
                    onClick={handleLogout}
                    className="flex items-center w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition duration-150"
                  >
                    <Icon icon="mdi:logout" className="mr-2" /> Logout
                  </button>
                  </div>
                </div>
              )}
            </div>
          </nav>
        </header>

        <main className="p-4 sm:p-6 space-y-6">{children}</main>

        <footer className="p-4 text-center text-xs text-gray-500 border-t mt-6">
          SIM Pesantren Dashboard - Dibuat dengan Tailwind CSS | &copy; 2025
        </footer>
      </div>
    </div>
  );
}

// export default Layout;
