import {
  FaRegComments,
  FaRegStar,
  FaBoxArchive,
  FaUser,
} from "react-icons/fa6";
import { FaPhoneAlt, FaCog } from "react-icons/fa";
import { PiDotFill } from "react-icons/pi";
import { GiHamburgerMenu } from "react-icons/gi";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";

const menuItems = [
  { icon: <FaRegComments />, label: "Chats", to: "/" },
  { icon: <FaPhoneAlt />, label: "Calls", to: "/calls" },
  { icon: <PiDotFill className="text-green-600" />, label: "Status" },
  { icon: <FaRegStar />, label: "Starred messages" },
  { icon: <FaBoxArchive />, label: "Archived chats" },
];

const ExpandableSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Toggle open/close
  const handleIconClick = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div
      ref={ref}
      className={clsx(
        " bg-stone-100 shadow-md transition-all duration-300 flex flex-col justify-between",
        isOpen ? "w-64" : "w-14"
      )}
    >
      {/* Menu items */}
      <div className="p-2 space-y-1">
        {/* Hamburger */}
        <div
          className="text-xl cursor-pointer hover:bg-gray-200 text-gray-700 px-3 py-2 flex items-center"
          onClick={handleIconClick}
          title="Menu"
        >
          <GiHamburgerMenu />
        </div>

        {menuItems.map((item, idx) => (
          <Link
            to={item.to}
            key={idx}
            className="flex items-center justify-between group hover:bg-gray-200 rounded-md px-2 py-2 cursor-pointer"
            title={!isOpen ? item.label : ""} 
          >
            <div className="flex items-center gap-3 text-gray-700 text-sm">
              <div className="text-xl">{item.icon}</div>
              {isOpen && <span className="font-semibold">{item.label}</span>}
            </div>
          </Link>
        ))}
      </div>

      {/* Footer profile */}
      <div className="border-t p-2 space-y-1">
        <div className="flex flex-col">
          <div
            className="flex items-center gap-3 text-gray-700 hover:bg-gray-200 text-sm rounded-md px-2 py-2 cursor-pointer"
            title={!isOpen ? "Settings" : ""}
          >
            <div className="text-xl">
              <FaCog />
            </div>
            {isOpen && <span className="font-semibold">Settings</span>}
          </div>
          <div
            className="flex items-center gap-3 text-gray-700 hover:bg-gray-200 text-sm rounded-md px-2 py-2 cursor-pointer"
            title={!isOpen ? "Profile" : ""}
          >
            <div className="text-xl">
              <FaUser />
            </div>
            {isOpen && <span className="font-semibold">Profile</span>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpandableSidebar;
