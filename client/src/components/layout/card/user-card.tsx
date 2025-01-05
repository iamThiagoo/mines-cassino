import { useEffect, useState } from "react";
import { useUser } from "@/context/user.context";
import { FaRegUserCircle } from "react-icons/fa";

const UserCard = () => {
  const { user } = useUser();
  const [greeting, setGreeting] = useState("Visitante");
  const [username, setUsername] = useState("Visitante");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 12) setGreeting("Bom dia");
    else if (hour >= 12 && hour < 18) setGreeting("Boa tarde");
    else setGreeting("Boa noite");

    setUsername(user?.username || "Visitante");
  }, [user]);

  return (
    <div className="text-base text-slate-300 md:text-gray-300 flex items-center gap-x-2 py-2 rounded-sm md:px-4 px-0 bg-gray-800">
      {`${greeting}, ${username}!`}
      <FaRegUserCircle className="hidden md:block size-6" />
    </div>
  );
};

export default UserCard;
