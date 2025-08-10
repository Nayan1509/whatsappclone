import { useState } from "react";
import { useChat } from "../contexts/ChatContext";
import { FiSearch } from "react-icons/fi";
import clsx from "clsx";

const CallsSidebar = () => {
  const { selectedCall, setSelectedCall } = useChat();

  // Static dummy data for now
  const [calls] = useState([
    {
      id: 1,
      name: "Ravi Kumar",
      wa_id: "919937320320",
      type: "video",
      status: "Completed",
      time: Date.now() - 3600 * 1000, 
    },
    {
      id: 2,
      name: "Neha Joshi",
      wa_id: "919876543210",
      type: "audio",
      status: "Missed",
      time: Date.now() - 7200 * 1000,
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  const filtered = calls.filter((c) =>
    (c.name || c.wa_id).toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="shadow-md bg-white flex flex-col">
      {/* Header */}
      <div className="p-4">
        <h1 className="text-xl font-bold text-gray-800">Calls</h1>
      </div>

      {/* Search */}
      <div className="px-3 py-2 flex items-center">
        <div className="flex items-center w-full bg-white rounded-lg px-3 py-1 shadow-sm">
          <FiSearch className="text-gray-500 mr-2 text-base" />
          <input
            type="text"
            placeholder="Search calls"
            className="w-full outline-none bg-transparent text-sm text-gray-700"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Calls List */}
      <div className="flex-1 overflow-y-auto p-4">
        {filtered.map((call) => (
          <div
            key={call.id}
            onClick={() => setSelectedCall(call)}
            className={clsx(
              "flex items-center rounded-lg justify-between mb-2 px-4 py-3 cursor-pointer transition-all",
              selectedCall?.id === call.id
                ? "bg-[#e9edef]"
                : "hover:bg-gray-100"
            )}
          >
            {/* Left: Avatar + Name */}
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-white font-semibold text-sm">
                {call.name?.[0] || call.wa_id?.[0]}
              </div>

              <div className="flex flex-col">
                <h2 className="font-semibold text-sm text-gray-900">
                  {call.name || call.wa_id}
                </h2>
                <p className="text-xs text-gray-600 truncate w-40">
                  {call.type === "video" ? "Video Call" : "Audio Call"} •{" "}
                  {call.status}
                </p>
              </div>
            </div>

            {/* Right: Timestamp */}
            <div className="text-xs text-gray-500 whitespace-nowrap">
              {new Date(call.time).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CallsSidebar;
