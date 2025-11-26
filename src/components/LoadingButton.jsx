import React from "react";
import { Icon } from "@iconify/react";

export default function LoadingButton({
  loading,
  children,
  onClick,
  type = "button",
  className = "",
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading}
      className={`w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg cursor-pointer font-semibold transition disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center ${className}`}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
          Loading...
        </span>
      ) : (
        children
      )}
    </button>
  );
}
