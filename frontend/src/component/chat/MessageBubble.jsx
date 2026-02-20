
import useAuthStore from "../../store/authStore.js";

const MessageBubble = ({ message }) => {
  const authUser = useAuthStore((s) => s.authUser);

  const isOwn =
    message.senderId === authUser?._id ||
    message.senderId?._id === authUser?._id;

  const formattedTime = new Date(message.createdAt).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return (
    <div
      className={`flex ${isOwn ? "justify-end mr-3.5" : "justify-start ml-3.5"}`}
    >
      <div
        className={`max-w-xs px-3 py-2 rounded-2xl shadow-sm
          ${isOwn ? "bg-green-700 text-white rounded-br-md" : "bg-base-200 rounded-bl-md"}
        `}
      >
        
        {message.image && (
          <img
            src={message.image}
            alt="sent"
            className="rounded-lg mb-2 max-w-[220px] object-cover"
          />
        )}

       
        <div className="flex items-end gap-2">
          {message.text && (
            <p className="wrap-break-word leading-relaxed text-sm">
              {message.text}
            </p>
          )}

          <span className="text-[11px] opacity-60 whitespace-nowrap">
            {formattedTime}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;