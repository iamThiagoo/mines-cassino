import Image from "next/image";
import React, { useState } from "react";
import ReactCardFlip from "react-card-flip";
import { GiTimeBomb } from "react-icons/gi";
import Bomb from "@/assets/images/bomb.png";
import Gem from "@/assets/images/gem.png";
import { useGame } from "@/context/game.context";
import { toast } from "@/hooks/use-toast";

const FlipCard = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [hasFlipped, setHasFlipped] = useState(false);
  const { game } = useGame();

  const handleClick = () => {
    try {
      if (!game) throw new Error("Você não iniciou o jogo!");

      if (!hasFlipped) {
        setIsFlipped(true);
        setHasFlipped(true);
      }
    } catch (error : any) {
      setIsFlipped(false);
      setHasFlipped(false);

      toast({
        variant: "destructive",
        title: "Opsss... Algo deu errado!",
        description:
          error.message || "Não foi possível processar sua solicitação. Tente novamente!",
      });
    }
  };

  return (
    <div onClick={handleClick} className="w-full select-none">
      <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
        <div className="card front cell w-full h-[7.7rem] border-4 border-gray-700 rounded-lg flex justify-center items-center bg-slate-900 cursor-pointer hover:bg-gray-800/20">
          <GiTimeBomb className="size-20 -mt-1 -ml-1 fill-gray-800 animate-pulse" />
        </div>

        {/* <div className="card back cell w-full h-[7.7rem] border-4 border-rose-700 rounded-lg flex justify-center items-center bg-rose-900">
          <Image
            src={Bomb}
            className={`filter-shadow size-24 ml-3 sm:ml-3`}
            alt="Uma mina."
          />
        </div> */}

        <div className="card back cell w-full h-[7.7rem] border-4 border-cyan-500 rounded-lg flex justify-center items-center bg-cyan-900">
          <Image
            src={Gem}
            className={`filter-shadow size-20 ml-1`}
            alt="Uma mina."
          />
        </div>
      </ReactCardFlip>
    </div>
  );
};

export default FlipCard;
