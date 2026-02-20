import React, { useEffect, useState } from "react";
import { useChatStore } from "../store/chatStore";
import SidebarSkeleton from "./SidebarSkeleton";
import UserCard from "./UserCard";
import { User, Users, Search } from "lucide-react";
// import { useOnlineUsers } from "../store/onlineUsers";

export const SideBar = () => {
  const { users, getUsers, isUserLoading } = useChatStore();

  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = searchTerm
    ? users.filter((user) =>
        (user.fullname || "").toLowerCase().includes(searchTerm.toLowerCase()),
      )
    : users;

  const highlightMatch = (text, term) => {
    if (!term) return text;

    const regex = new RegExp(`(${term})`, "gi");
    const parts = text.split(regex);

    return parts.map((part, i) =>
      part.toLowerCase() === term.toLowerCase() ? (
        <span key={i} className="text-green-600 bg-base-300 rounded px-1">
          {part}
        </span>
      ) : (
        part
      ),
    );
  };
 

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  if (isUserLoading) return <SidebarSkeleton />;

  return (
    <aside className="mainsidebar  h-full w-full ml-2.5 bg-neutral pt-1 rounded-2xl shadow-base-300 flex flex-col">
      <div
        className="navsearch w-[95%]   h-[8%] mx-1  flex items-center gap-2 px-4 my-4 rounded-full bg-base-100 text-base-content border-2 border-base-content hover:border-neutral-focus
            focus-within:border-primary "
        tabIndex={"0"}
      >
        <Search className="h-[25px] w-[25px]" id="serach" />
        <input
          className=" w-full h-10 bg-transparent outline-none text-base-content placeholder:text-base-content/60"
          type="text"
          placeholder="Search or Start a new chat"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div>
        <span className="flex items-center gap-2 px-3.5 mt-2">
          <Users /> Contacts
        </span>
      </div>
      <div className="mt-3 flex-1 overflow-y-auto">
   

        {filteredUsers.map((user) => (
          <UserCard
            key={user._id}
            user={user}
            highlightMatch={highlightMatch}
            searchTerm={searchTerm}
          />
        ))}
      </div>
    </aside>
  );
};
