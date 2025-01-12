"use client";

import { useState, useEffect, useRef } from "react";
import ShimmerButton from "@/components/ui/shimmer-button";
import CurrencyInput from "../input/currency-input";
import { io, Socket } from "socket.io-client";
import { useGame } from "@/context/game.context";
import { useUser } from "@/context/user.context";
import { GameCreated, GameFinished } from "@/types/game";
import { toast } from "@/hooks/use-toast";
import { formatCurrency, numberToFloat } from "@/lib/utils";

interface BoardPanelProps {
  onClearBoard: () => void;
}

const BoardPanel: React.FC<BoardPanelProps> = ({ onClearBoard }) => {
  const socketRef = useRef<Socket | null>(null);
  const [betValue, setBetValue] = useState("1.00");
  const { game, setGame } = useGame();
  const { user, setUser } = useUser();

  useEffect(() => {
    if (typeof window === "undefined" || !user?.token) return;

    const socket = io(process.env.NEXT_PUBLIC_NEST_URL, {
      transports: ["websocket"],
      reconnection: true,
      auth: { token: `Bearer ${user?.token}` },
    });

    socketRef.current = socket;

    socket.on("game:created", (data: GameCreated) => {
      setUser({
        ...user,
        balance: user?.balance - parseFloat(betValue),
      })

      setGame({
        isStarted: true,
        gameId: data.gameId,
        revealed: [],
        odd: 1,
        hits: 0,
        betAmount: parseFloat(betValue),
      });
    });

    socket.on("game:finished", (data: GameFinished) => {
      setUser({
        ...user,
        balance: data.balance,
      })

      toast({
        title: "Parabéns, você venceu!",
        variant: "success",
        description: `Você acertou ${data.hits} gema(s) e faturou ${formatCurrency(numberToFloat(data?.winAmount))}!`,
      });

      setGame(null);
    });

    socket.on("connect_error", (err: any) => {
      console.error("Error socket:", err.message);
    });

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [user?.token, setGame, betValue]);
  
  const handleCurrencyInputChange = (value: string) => {
    setBetValue(value);
  };

  const handleStartBet = () => {
    onClearBoard();

    
    if (socketRef.current && user) {
      if (parseFloat(betValue) > user?.balance) {
        toast({
          title: "Ops! Valor da aposta inválido.",
          variant: "destructive",
          description: "Você não possui saldo suficiente para realizar essa aposta.",
        });

        return;
      }
      
      socketRef.current.emit("game:create", {
        userId: user?.userId,
        betAmount: parseFloat(betValue),
      });
    } else {
      console.error("Socket not initialized or user not authenticated.");
    }
  };

  const handleEndBet = () => {
    if (socketRef.current && user && game) {
      if (game?.hits === 0) {
        toast({
          title: "Ops! Você precisa iniciar o jogo.",
          variant: "destructive",
          description: "Certifique-se de acertar uma gema antes de encerrar jogo.",
        });

        return;
      }

      socketRef.current.emit("game:finish", {
        userId: user?.userId,
        gameId: game?.gameId,
      });
      
    } else {
      console.error("Socket not initialized or user not authenticated.");
    }
  };

  return (
    <section className="px-3 sm:pt-2 lg:border-r border-gray-600 lg:pr-6 w-full">
      <div className="grid w-full max-w-full items-center gap-1.5">
        <h2 className="mb-2 font-medium">Valor da Aposta</h2>
        <CurrencyInput value={betValue} onChange={handleCurrencyInputChange} />
      </div>

      <ShimmerButton
        className="shadow-2xl mt-6" background={game?.isStarted ? '#ff4343': '#16283e'}
        onClick={game?.isStarted ? handleEndBet : handleStartBet}
      >
        <span className="whitespace-pre-wrap text-center py-1 text-lg font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10">
          {game?.isStarted ? "Encerrar Jogo" : "Iniciar Jogo"}
        </span>
      </ShimmerButton>

      <div className="w-full mt-5 text-center">
        <a
          href="https://github.com/iamThiagoo/mines-cassino/issues"
          target="_blank"
          className="w-full hidden lg:block text-center mt-10 text-sm text-sky-600 hover:text-sky-500"
        >
          Reportar problema
        </a>
      </div>
    </section>
  );
};

export default BoardPanel;
