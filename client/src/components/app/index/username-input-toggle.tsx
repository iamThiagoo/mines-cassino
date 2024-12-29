import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import PulsatingButton from "@/components/ui/pulsating-button";

const UsernameInputToggle = () => {
  const [showUsernameInput, setShowUsernameInput] = useState(false);

  return (
    <>
      {showUsernameInput ? (
        <div className="flex w-full max-w-sm mx-auto items-center space-x-2">
          <Input type="text" placeholder="Insira o Nome de Usuário" />
          <PulsatingButton>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="mt-0.5 size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
              />
            </svg>
          </PulsatingButton>
        </div>
      ) : (
        <div className="mx-auto flex w-full justify-center items-center">
            <PulsatingButton
                className="define-user-btn"
                onClick={() => setShowUsernameInput(true)}
            >
                Definir Usuário e Iniciar Jogo
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="ml-2 mt-0.5 size-6"
                >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
                />
                </svg>
            </PulsatingButton>
        </div>
      )}
    </>
  );
};

export default UsernameInputToggle;
