import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Layout from "../components/Layout";

export default function AdminDashboard() {
  const { user } = useContext(AuthContext);

  // Dummy data for demonstration
  const stats = [
    { title: "Total Santri", value: "1,245", icon: "👥", color: "bg-blue-500" },
    { title: "Guru & Pegawai", value: "85", icon: "👨‍🏫", color: "bg-green-500" },
    { title: "Hadir Hari Ini", value: "1,180", icon: "✅", color: "bg-emerald-500" },
    { title: "Tidak Hadir", value: "65", icon: "❌", color: "bg-red-500" },
  ];

  const recentActivities = [
    { time: "08:30", activity: "Santri Ahmad masuk kelas", type: "checkin" },
    { time: "08:45", activity: "Santri Siti terlambat", type: "late" },
    { time: "09:00", activity: "Guru Budi mengajar Matematika", type: "class" },
    { time: "09:15", activity: "Santri Rizki izin sakit", type: "absent" },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard Admin</h1>
          <p className="text-gray-600">Selamat datang kembali, {user?.name}! Berikut ringkasan aktivitas hari ini.</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-800 mt-1">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 rounded-full ${stat.color} flex items-center justify-center text-white text-xl`}>
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activities */}
          <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Aktivitas Terbaru</h2>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center space-x-4 p-3 rounded-lg bg-gray-50">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                    activity.type === 'checkin' ? 'bg-green-100 text-green-600' :
                    activity.type === 'late' ? 'bg-yellow-100 text-yellow-600' :
                    activity.type === 'absent' ? 'bg-red-100 text-red-600' :
                    'bg-blue-100 text-blue-600'
                  }`}>
                    {activity.type === 'checkin' ? '✓' :
                     activity.type === 'late' ? '⏰' :
                     activity.type === 'absent' ? '✗' : '📚'}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800">{activity.activity}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Aksi Cepat</h2>
            <div className="space-y-3">
              <button className="w-full bg-primary text-white py-3 px-4 rounded-lg hover:bg-green-600 transition duration-200 font-medium">
                Tambah Santri Baru
              </button>
              <button className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 transition duration-200 font-medium">
                Input Absensi Manual
              </button>
              <button className="w-full bg-purple-500 text-white py-3 px-4 rounded-lg hover:bg-purple-600 transition duration-200 font-medium">
                Generate Laporan
              </button>
              <button className="w-full bg-gray-500 text-white py-3 px-4 rounded-lg hover:bg-gray-600 transition duration-200 font-medium">
                Pengaturan Sistem
              </button>
            </div>
          </div>
        </div>

        {/* Attendance Overview */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Ringkasan Kehadiran Minggu Ini</h2>
          <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
            {[
              { day: 'Sen', present: 1180, total: 1245, percentage: 95 },
              { day: 'Sel', present: 1205, total: 1245, percentage: 97 },
              { day: 'Rab', present: 1150, total: 1245, percentage: 92 },
              { day: 'Kam', present: 1220, total: 1245, percentage: 98 },
              { day: 'Jum', present: 1195, total: 1245, percentage: 96 },
              { day: 'Sab', present: 1100, total: 1245, percentage: 88 },
              { day: 'Min', present: 1050, total: 1245, percentage: 84 },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <p className="text-sm font-medium text-gray-600 mb-2">{item.day}</p>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500">{item.present}/{item.total}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
