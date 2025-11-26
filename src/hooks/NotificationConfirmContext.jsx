import { createContext, useContext, useState } from "react";

export const ConfirmContext = createContext();

export const useConfirm = () => useContext(ConfirmContext);

export function ConfirmProvider({ children }) {
  const [confirmData, setConfirmData] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  const confirm = ({ title, message, onConfirm }) => {
    setConfirmData({ title, message, onConfirm });
    setTimeout(() => setIsVisible(true), 10);
  };

  const close = () => {
    setIsVisible(false);
    setTimeout(() => setConfirmData(null), 300);
  };

  const accept = () => {
    confirmData?.onConfirm();
    setIsVisible(false);
    setTimeout(() => setConfirmData(null), 300);
  };

  return (
    <ConfirmContext.Provider value={{ confirm }}>
      {children}
      {confirmData && (
        <div className={`fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <div className={`bg-white p-6 rounded-xl shadow-xl w-80 text-center transition-all duration-300 ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
            <h3 className="font-semibold text-lg">{confirmData.title}</h3>
            <p className="text-gray-600 mt-2 mb-4">{confirmData.message}</p>
            <div className="flex gap-3">
              <button onClick={close} className="flex-1 py-2 rounded-lg bg-gray-300 hover:bg-gray-400">
                Batal
              </button>
              <button onClick={accept} className="flex-1 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700">
                Iya
              </button>
            </div>
          </div>
        </div>
      )}
    </ConfirmContext.Provider>
  );
}
