import { format } from "date-fns";
import { BsCheck, BsCheckAll } from "react-icons/bs";

const MessageBubble = ({ msg }) => {
  const isFromUser = msg.direction === "outbound";
  const statusIcons = {
    sent: <BsCheck className="text-gray-500" />,
    delivered: <BsCheckAll className="text-gray-500" />,
    read: <BsCheckAll className="text-blue-500" />,
  };

  return (
    <div className={`flex ${isFromUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`rounded-lg px-4 py-2 max-w-xs shadow text-sm
        ${isFromUser ? "bg-green-100 text-right" : "bg-white"}
      `}
      >
        <div>{msg.text}</div>
        <div className="text-[10px] mt-1 flex items-center justify-end gap-1">
          {format(new Date(msg.timestamp), "HH:mm")}
          {isFromUser && statusIcons[msg.status]}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
