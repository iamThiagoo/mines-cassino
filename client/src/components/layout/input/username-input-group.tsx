"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import PulsatingButton from "@/components/ui/pulsating-button";
import { toast } from "@/hooks/use-toast";
import { setCookie } from "cookies-next/client";
import { getCookie } from "cookies-next";
import { redirect, useRouter } from "next/navigation";

const UsernameInputToggle = () => {
  const [showUsernameInput, setShowUsernameInput] = useState(false);
  const [username, setUsername] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const router = useRouter();

  async function createUser(name: string): Promise<void> {
    let nameFormat : string = name.trim();

    if (!nameFormat) {
      toast({
        variant: "destructive",
        title: "Opsss...",
        description: "Nome de Usuário Inválido.",
      });
      return;
    }

    setIsPosting(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_NEST_URL}/user`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: nameFormat }),
      });
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Erro ao criar usuário");

      const cookieOptions = {expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7)};

      setCookie('userId', data.userId, cookieOptions);
      setCookie('balance', data.balance, cookieOptions);
      setCookie('username', data.username, cookieOptions);
      setCookie('token', data.access_token, cookieOptions);

      toast({ title: "Usuário criado com sucesso!" });
      router.push('/game');
    } catch (error: any) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Opsss... Algo deu errado!",
        description: error.message,
      });
    } finally {
      setIsPosting(false);
    }
  }

  return (
    <>
      {showUsernameInput ? (
        <div className="flex w-full max-w-sm mx-auto items-center space-x-2 px-8 md:px-0">
          <Input
            type="text"
            placeholder="Insira o Nome de Usuário"
            onChange={(e) => setUsername(e.target.value)}
          />
          <PulsatingButton onClick={() => createUser(username)}>
            {isPosting ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="animate-spin size-6 ml-0 fill-white"
                style={{ animationDuration: "2000ms" }}
                viewBox="0 0 512 512"
              >
                <path d="M304 48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm0 416a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM48 304a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm464-48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM142.9 437A48 48 0 1 0 75 369.1 48 48 0 1 0 142.9 437zm0-294.2A48 48 0 1 0 75 75a48 48 0 1 0 67.9 67.9zM369.1 437A48 48 0 1 0 437 369.1 48 48 0 1 0 369.1 437z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="mt-0.5 ml-0 size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
                />
              </svg>
            )}
          </PulsatingButton>
        </div>
      ) : (
        <div className="mx-auto flex w-full justify-center items-center">
          <PulsatingButton onClick={() => setShowUsernameInput(true)}>
            Definir Usuário e Iniciar Jogo
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="mt-0.5 ml-1.5 size-6"
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
