import { BrowserRouter, Routes, Route } from "react-router-dom";
import Protected from "./components/Protected";
import AuthProvider from "./context/AuthContext";
import { ConfirmProvider } from "./hooks/NotificationConfirmContext";
import NotificationProvider from "./components/Notification";
import Guest from "./components/Guest";

import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";

export default function App() {
  return (
    <NotificationProvider>
      <ConfirmProvider>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route
                path="/login"
                element={
                  <Guest>
                    <Login />
                  </Guest>
                }
              />

              <Route
                path="/register"
                element={
                  <Guest>
                    <Register />
                  </Guest>
                }
              />

              <Route
                path="/admin"
                element={
                  <Protected>
                    <AdminDashboard />
                  </Protected>
                }
              />

              <Route
                path="/teacher"
                element={
                  <Protected>
                    <TeacherDashboard />
                  </Protected>
                }
              />

              <Route path="*" element={<Login />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </ConfirmProvider>
    </NotificationProvider>
  );
}
