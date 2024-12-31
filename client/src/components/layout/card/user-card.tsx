'use client';

import { useEffect, useState } from "react";
import { getCookie } from "cookies-next";

const UserCard = () => {
  const [greeting, setGreeting] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      const username = getCookie('username') || "Visitante";
      const hour = new Date().getHours();
      let greetingMessage;
      
      if (hour >= 6 && hour < 12) {
        greetingMessage = "Bom dia";
      } else if (hour >= 12 && hour < 18) {
        greetingMessage = "Boa tarde";
      } else {
        greetingMessage = "Boa noite";
      }

      setGreeting(greetingMessage);
      setUsername(username);
    };

    fetchUserData();
  }, []);

  return (
    <div className="text-base text-slate-300 md:text-gray-300 flex items-center gap-x-1 py-2 rounded-sm md:px-4 px-0 bg-gray-800">
      {`${greeting}, ${username}!`}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="hidden md:block size-7"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
        ></path>
      </svg>
    </div>
  );
};

export default UserCard;
