import { useState } from "react";
import { NotificationContext } from "../context/NotificationContext";

export default function NotificationProvider({ children }) {
  const [notif, setNotif] = useState(null);
  const [animate, setAnimate] = useState(false);

  const showNotification = ({ type, title, message, showOkButton = true }) => {
    setNotif({ type, title, message, showOkButton });
    setTimeout(() => setAnimate(true), 10);
    if (!showOkButton) {
      setTimeout(() => { setAnimate(false); setTimeout(() => setNotif(null), 300); }, 2500);
    }
  };

  const closeNow = () => { setAnimate(false); setTimeout(() => setNotif(null), 300); };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      {notif && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={closeNow} />
          <div className={`relative bg-white p-6 rounded-xl shadow-xl w-80 max-w-[90%] text-center transform transition-all duration-300
            ${animate ? "opacity-100 scale-100" : "opacity-0 scale-95"}`} role="dialog" aria-live="assertive">
            <div className={`mx-auto mb-3 w-12 h-12 flex items-center justify-center rounded-full
              ${notif.type === "success" ? "bg-green-100" : "bg-red-100"}`}>
              <span className={`text-2xl ${notif.type === "success" ? "text-green-600" : "text-red-600"}`}>
                {notif.type === "success" ? "✔" : "✖"}
              </span>
            </div>
            <h3 className="text-lg font-semibold mb-1">{notif.title}</h3>
            <p className="text-gray-600 text-sm mb-4">{notif.message}</p>
            {notif.showOkButton && (
              <button onClick={closeNow} className={`w-full rounded-md px-4 py-2 text-white transition
                ${notif.type === "success" ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"}`}>
                {notif.type === "success" ? "OK" : "Try Again"}
              </button>
            )}
          </div>
        </div>
      )}
    </NotificationContext.Provider>
  );
}
