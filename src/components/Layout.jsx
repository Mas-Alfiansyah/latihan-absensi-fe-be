import Navbar from "./Navbar";

export default function Layout({ children, user, onLogout }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar user={user} onLogout={onLogout} />

      <main className="p-6">{children}</main>
    </div>
  );
}
