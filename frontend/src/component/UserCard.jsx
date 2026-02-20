import React from "react";
import { useSocketStore } from "../store/scoketStore";
import { useChatStore } from "../store/chatStore";

const UserCard = ({ user,highlightMatch, searchTerm }) => {

  const onlineUsers = useSocketStore((s) => s.onlineUsers);

  const currentOnlineUser = onlineUsers.includes(user._id);
  const { selectedUser, setSelectedUser } = useChatStore();

  const isSelected = selectedUser?._id === user._id;
  return (
    <div
      onClick={() => setSelectedUser(user)}
      className={`flex items-center gap-3 p-3  h-16 w-[95%]  mb-1 bg-base-200   rounded-xl text-base-content hover:bg-base-100/80 hover:border border-primary
        ${
          isSelected
            ? "bg-base-300 text-primary-content border "
            : "bg-base-200 hover:bg-base-300"
        }
      
        
        `}
    >
      <img
        src={user.profilePic || "/avatar.png"}
        alt={user.fullname}
        className="w-10 h-10 rounded-full object-cover"
      />

      <div>
        <span className="font-semibold text-lg font-stretch-50% ml-6">
          <span className="font-semibold">
            {highlightMatch
              ? highlightMatch(user.fullname, searchTerm)
              : user.fullname}
          </span>
        </span>

        <div>
          {currentOnlineUser ? (
            <span className="text-green-500 ml-6">Online</span>
          ) : (
            <span className="text-gray-400 ml-6">Offline</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserCard;
