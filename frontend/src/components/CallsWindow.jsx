import { FaVideo, FaLink } from "react-icons/fa";
import { TbDialpad } from "react-icons/tb";

const CallsWindow = () => {
  const actions = [
    {
      icon: <FaVideo className="text-green-600 text-2xl" />,
      label: "Start call",
    },
    {
      icon: <FaLink className="text-gray-800 text-2xl" />,
      label: "New call link",
    },
    {
      icon: <TbDialpad className="text-gray-800 text-2xl" />,
      label: "Call a number",
    },
  ];

  return (
    <div className="flex flex-row items-center justify-center h-full w-full bg-white">
      <div className="flex gap-16">
        {actions.map((action, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center gap-2 cursor-pointer"
          >
            <div className="w-16 h-16 flex items-center justify-center bg-white rounded-xl shadow-sm hover:shadow-md border transition">
              {action.icon}
            </div>
            <p className="text-sm font-medium text-gray-900">{action.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CallsWindow;
