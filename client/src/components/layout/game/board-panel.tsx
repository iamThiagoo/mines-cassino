"use client";

import { useState, useEffect } from "react";
import ShimmerButton from "@/components/ui/shimmer-button";
import CurrencyInput from "../input/currency-input";
import { io, Socket } from "socket.io-client";
import { useGame } from "@/context/game.context";
import { useUser } from "@/context/user.context";

let socket: Socket | null = null;

const BoardPanel = () => {
  const [betValue, setBetValue] = useState("1.00");
  const { game, setGame } = useGame();
  const { user } = useUser();

  useEffect(() => {
    if (typeof window === "undefined" || !user?.token) return;

    if (!socket) {
      socket = io(process.env.NEXT_PUBLIC_NEST_URL, {
        transports: ["websocket"],
        reconnection: true,
        auth: { token: `Bearer ${user?.token}` },
      });

      socket.on("game:created", (data: { gameId: string; message: string }) => {
        user.balance = user?.balance - parseFloat(betValue);
        
        setGame({
          isStarted: true,
          gameId: data.gameId,
          revealed: [],
          odd: 1,
          hits: 0,
          betAmount: parseFloat(betValue),
        });
      });
      
      socket.on("connect_error", (err: any) => {
        console.error("Error socket:", err.message);
      });
    }

    return () => {
      socket?.disconnect();
      socket = null;
    };
  }, [user?.token, setGame, betValue]);
  
  const handleCurrencyInputChange = (value: string) => {
    setBetValue(value);
  };

  const handleStartBet = () => {
    if (socket && user) {
      socket.emit("game:create", {
        userId: user?.userId,
        betAmount: parseFloat(betValue),
      });
    } else {
      console.error("Socket não inicializado ou usuário não autenticado.");
    }
  };

  const handleEndBet = () => {
    console.log("Encerrando aposta com valor:", betValue);
  };

  return (
    <section className="px-3 pt-2 border-r border-gray-600 pr-6 w-full">
      <div className="grid w-full max-w-full items-center gap-1.5">
        <h2 className="mb-2 font-medium">Valor da Aposta</h2>
        <CurrencyInput value={betValue} onChange={handleCurrencyInputChange} />
      </div>

      <ShimmerButton
        className="shadow-2xl mt-6" background={game?.isStarted ? '#fa2222': '#16283e'}
        onClick={game?.isStarted ? handleEndBet : handleStartBet}
      >
        <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
          {game?.isStarted ? "Encerrar Aposta" : "Iniciar Aposta"}
        </span>
      </ShimmerButton>

      <div className="w-full mt-5 text-center">
        <a
          href="https://github.com/iamThiagoo/mines-cassino/issues"
          target="_blank"
          className="w-full text-center mt-10 text-sm text-sky-600 hover:text-sky-500"
        >
          Reportar problema
        </a>
      </div>
    </section>
  );
};

export default BoardPanel;
