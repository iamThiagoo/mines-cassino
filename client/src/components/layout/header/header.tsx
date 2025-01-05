"use client";

import Image from "next/image";
import BlurFade from "@/components/ui/blur-fade";
import HowWorksDialog from "../dialog/how-works";
import Bomb from "@/assets/images/bomb.png";
import UserCard from "../card/user-card";
import ExitDeleteAccount from "@/components/layout/dialog/exit-delete-account";
import { useState } from "react";
import { LiaHamburgerSolid } from "react-icons/lia";
import { useUser } from "@/context/user.context";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useUser();

  return (
    <header className="container mx-auto max-w-7xl relative top-2 sm:top-5">
      <BlurFade inView={true} inViewMargin="-50px" delay={0.75}>
        <nav className="flex justify-between items-center border-b pb-2 border-gray-600 sm:pb-4">
          <h1>
            <a
              href="/"
              className="text-gray-200 flex items-center text-lg gap-x-2 font-bold hover:opacity-75"
            >
              <Image
                src={Bomb}
                className="ml-5 w-10"
                alt="Logo do app, uma mina."
                priority={true}
              />
              Mines
            </a>
          </h1>

          <ul className="hidden md:flex items-center gap-x-8 text-gray-300 mr-3">
            <HowWorksDialog />
            <UserCard />

            {user?.userId && <ExitDeleteAccount />}
          </ul>

          <div className="flex md:hidden">
            <div>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-200 focus:outline-none"
              >
                <LiaHamburgerSolid className="fill-gray-200 size-12 mr-4 mt-1 md:mt-0" />
              </button>

              {isOpen && (
                <div className="fixed inset-0 z-40">
                  <ul className="fixed top-20 right-5 z-50 bg-gray-800 text-gray-200 rounded-lg shadow-md flex flex-col items-start p-4 gap-4">
                    <UserCard />
                    <HowWorksDialog />
                  </ul>
                </div>
              )}
            </div>
          </div>
        </nav>
      </BlurFade>
    </header>
  );
};

export default Header;
