"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import PulsatingButton from "@/components/ui/pulsating-button";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { createUser } from "@/services/user.service";
import { useUser } from "@/context/user.context";
import { FaSpinner } from "react-icons/fa";
import { FiChevronsRight } from "react-icons/fi";

const UsernameInputToggle = () => {
  const { setUser } = useUser();
  const [showUsernameInput, setShowUsernameInput] = useState(false);
  const [username, setUsername] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const router = useRouter();

  async function handleCreateUser(): Promise<void> {
    setIsPosting(true);
    
    try {
      const data = await createUser(username);

      setUser({ 
        token: data.access_token, 
        username: data.username,
        userId: data.userId,
        balance: data.balance
      });

      toast({ title: "Usuário criado com sucesso!" });
      router.push('/game');
    } catch (error: any) {
      console.log(error);
      toast({variant: "destructive", title: "Opsss... Algo deu errado!", description: error.message});
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
          <PulsatingButton onClick={handleCreateUser}>
            {isPosting ? (
              <FaSpinner className="animate-spin size-6 ml-0 fill-white" style={{ animationDuration: "2000ms" }} />
            ) : (
              <FiChevronsRight className="mt-0.5 size-6" />
            )}
          </PulsatingButton>
        </div>
      ) : (
        <div className="mx-auto flex w-full justify-center items-center">
          <PulsatingButton onClick={() => setShowUsernameInput(true)}>
            Definir Usuário e Iniciar Jogo
            <FiChevronsRight className="mt-0.5 ml-1.5 size-6" />
          </PulsatingButton>
        </div>
      )}
    </>
  );
};

export default UsernameInputToggle;
