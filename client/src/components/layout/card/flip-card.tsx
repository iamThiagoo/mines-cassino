import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import ReactCardFlip from "react-card-flip";
import { GiTimeBomb } from "react-icons/gi";
import Bomb from "@/assets/images/bomb.png";
import Gem from "@/assets/images/gem.png";
import { useGame } from "@/context/game.context";
import { toast } from "@/hooks/use-toast";
import { io, Socket } from "socket.io-client";
import { useUser } from "@/context/user.context";
import { GameFinishedFailed, GamePlayed } from "@/types/game";

interface FlipCardProps {
  row: number;
  col: number;
  reset: boolean;
}

const FlipCard: React.FC<FlipCardProps> = ({ row, col, reset }) => {
  const socketRef = useRef<Socket | null>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [cardType, setCardType] = useState<"gem" | "bomb" | null>(null);
  const [hasFlipped, setHasFlipped] = useState(false);
  const { game, setGame } = useGame();
  const { user } = useUser();

  useEffect(() => {
    if (reset) {
      setIsFlipped(false);
      setCardType(null);
      setHasFlipped(false);
    }
  }, [reset]);

  useEffect(() => {
    if (typeof window === "undefined" || !user?.token || !game) return;

    const socket = io(process.env.NEXT_PUBLIC_NEST_SOCKET, {
      transports: ["websocket"],
      reconnection: true,
      auth: { token: `Bearer ${user?.token}` },
    });

    socketRef.current = socket;

    socket.on("game:played", (data: GamePlayed) => {
      console.log(data);
      if (data.row === row && data.col === col) {
        setCardType("gem");
        setGame({
          ...game,
          odd: data.odd,
          hits: data.hits
        });
        setIsFlipped(true);
        setHasFlipped(true);
      }
    });

    socket.on("game:finished-failed", (data: GameFinishedFailed) => {
      if (data.row === row && data.col === col) {
        setCardType("bomb");
        setIsFlipped(true);
        setHasFlipped(true);
        setGame(null);
        toast({
          variant: "destructive",
          title: "Você perdeu!",
          description: "Você encontrou uma bomba! Tente novamente.",
        });
      }
    });

    socket.on("connect_error", (err: any) => {
      console.error("Error socket:", err.message);
    });

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [user?.token, game, row, col]);

  const handleClick = () => {
    try {
      if (!game) throw new Error("Você não iniciou o jogo!");
      if (hasFlipped) throw new Error("Você já virou esse card!");
      if (!socketRef.current) throw new Error("Socket não está inicializado corretamente.");
      
      socketRef.current.emit("game:play", {
        userId: user?.userId,
        gameId: game.gameId,
        row,
        col,
      });
    } catch (error: any) {
      setIsFlipped(false);
      setHasFlipped(false);
      toast({
        variant: "destructive",
        title: "Opsss... Algo deu errado!",
        description:
          error.message ||
          "Não foi possível processar sua solicitação. Tente novamente!",
      });
    }
  };

  return (
    <div onClick={handleClick} className="max-w-full lg:w-full select-none">
      <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
        <div className="card front cell p-1.5 lg:p-0 max-w-full lg:w-full lg:h-[7.7rem] border-4 border-gray-700 rounded-lg flex justify-center items-center bg-slate-900 cursor-pointer hover:bg-gray-800/20">
          <GiTimeBomb className="size-8 md:size-14 lg:size-20 -mt-1 -ml-1 fill-gray-800 animate-pulse" />
        </div>

        {cardType === "bomb" ? (
          <div className="card back cell p-1.5 lg:p-0 max-w-full lg:w-full lg:h-[7.7rem] border-4 border-rose-700 rounded-lg flex justify-center items-center bg-rose-900">
            <Image
              src={Bomb}
              className="filter-shadow size-8 md:size-14 lg:size-24 ml-3 sm:ml-3"
              alt="Uma mina."
            />
          </div>
        ) : cardType === "gem" ? (
          <div className="card back cell p-1.5 lg:p-0 max-w-full lg:w-full lg:h-[7.7rem] border-4 border-cyan-500 rounded-lg flex justify-center items-center bg-cyan-900">
            <Image
              src={Gem}
              className="filter-shadow size-8 md:size-14 lg:size-20 ml-1"
              alt="Uma gema."
            />
          </div>
        ) : (
          <div />
        )}
      </ReactCardFlip>
    </div>
  );
};

export default FlipCard;
