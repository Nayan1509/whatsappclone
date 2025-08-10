import { useChat } from "../contexts/ChatContext";
import { FaVideo, FaPhone } from "react-icons/fa";
import { MdMessage } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { useState, useEffect } from "react";

const CallsWindow = () => {
  const { selectedCall, setSelectedCall } = useChat();
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile screen size
  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth <= 768);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  // If no call selected
  if (!selectedCall) {
    const actions = [
      { icon: <FaVideo className="text-green-600 text-2xl" />, label: "Start call" },
      { icon: <FaVideo className="text-gray-800 text-2xl" />, label: "New call link" },
      { icon: <FaPhone className="text-gray-800 text-2xl" />, label: "Call a number" },
    ];

    return (
      <div className="flex flex-row items-center justify-center h-full w-full">
        <div className="flex gap-16">
          {actions.map((action, idx) => (
            <div key={idx} className="flex flex-col items-center gap-2 cursor-pointer">
              <div className="w-16 h-16 flex items-center justify-center bg-white rounded-xl shadow-sm hover:shadow-md border border-gray-300 transition">
                {action.icon}
              </div>
              <p className="text-sm font-medium text-gray-900">{action.label}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <h2 className="text-lg font-semibold">Call info</h2>
        <IoMdClose
          className="text-xl cursor-pointer hover:text-gray-600"
          onClick={() => {
            setSelectedCall(null);
            if (isMobile) {
              // Show CallsSidebar view
              document.querySelector("#calls-sidebar")?.classList.remove("hidden");
              document.querySelector("#calls-window")?.classList.add("hidden");
            }
          }}
        />
      </div>

      {/* Caller Info */}
      <div className="p-4 border border-gray-300 m-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-2 border-b border-gray-300 gap-3">
          <div className="flex items-center gap-3">
            <img
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(selectedCall.name)}&background=random`}
              alt={selectedCall.name}
              className="w-12 h-12 rounded-full"
            />
            <div>
              <p className="font-semibold">{selectedCall.name}</p>
              <p className="text-sm text-gray-500">{selectedCall.wa_id}</p>
            </div>
          </div>

          <div className="flex gap-4 text-gray-600 flex-wrap sm:flex-nowrap">
            <MdMessage className="text-xl cursor-pointer" />
            <FaVideo className="text-xl cursor-pointer" />
            <FaPhone className="text-xl cursor-pointer" />
          </div>
        </div>

        {/* Call History */}
        <div className="p-2">
          <p className="text-sm text-gray-500 mb-3">Yesterday</p>
          <div className="flex justify-between items-center rounded-lg">
            <div className="flex items-center gap-2">
              <FaPhone className="text-gray-700" />
              <span>
                Outgoing {selectedCall.type} call at{" "}
                {new Date(selectedCall.time).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
            <span className="text-sm text-gray-500">{selectedCall.status}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallsWindow;
