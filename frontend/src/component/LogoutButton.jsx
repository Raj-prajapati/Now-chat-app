import { LogOut } from "lucide-react";
import useAuthStore from "../store/authStore";

const LogoutButton = () => {
  const { logOut } = useAuthStore();

  return (
    <button
      onClick={logOut}
      className="flex items-center gap-2 bg-zinc-700 hover:bg-zinc-800 text-white text-shadow-sm px-2 py-2 rounded-lg transition cursor-pointer"
    >
      <LogOut className="size-4" />
      Logout
    </button>
  );
};

export default LogoutButton;
