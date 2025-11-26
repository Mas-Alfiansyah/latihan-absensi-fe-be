import { useState } from "react";
import { Icon } from "@iconify/react";

export default function SidebarDropdown({ title, icon, children }) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center p-3 text-sm font-medium rounded-xl text-gray-700 hover:bg-gray-100 focus:outline-none transition duration-150"
      >
        {icon && <Icon icon={icon} className="mr-3" />}
        <span>{title}</span>
        <Icon
          icon="mdi:chevron-right"
          className={`w-4 h-4 transition-transform duration-300 ml-auto ${open ? "rotate-90" : ""}`}
        />
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ${open ? "max-h-40 mt-1" : "max-h-0"}`}
      >
        <div className="pl-5 space-y-1">
          {children}
        </div>
      </div>
    </div>
  );
}
