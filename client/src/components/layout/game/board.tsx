"use client";

import React, { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Bomb from "@/assets/images/bomb.png";
import Gem from "@/assets/images/gem.png";
import { GiTimeBomb } from "react-icons/gi";
import { useUser } from "@/context/user.context";
import { formatCurrency, numberToFloat } from "@/lib/utils";
import FlipCard from "../card/flip-card";
import { useGame } from "@/context/game.context";

const Board = () => {
  const { user } = useUser();
  const [isClient, setIsClient] = useState(false)
  const { game } = useGame();

  const rows = 5;
  const cols = 5;

  useEffect(() => {
    setIsClient(true)
  }, [])

  const renderCell = (row: number, col: number) => {
    return (
      <FlipCard key={`${row}-${col}`} />
    );
  };

  const renderGrid = () => {
    const grid = [];
    for (let row = 0; row < rows; row++) {
      const cells = [];
      for (let col = 0; col < cols; col++) {
        cells.push(renderCell(row, col));
      }
      grid.push(
        <div key={row} className="row flex gap-4">
          {cells}
        </div>
      );
    }
    return grid;
  };

  return (
    <section>
      <div className="flex justify-between mb-4">

        {game?.isStarted ? (
          <Badge
            variant="outline"
            className="flex gap-x-2 text-white py-1 text-sm bg-gray-800"
          >
            Aposta: {formatCurrency(numberToFloat(game?.betAmount || 0))}
            <div>
              <div className="bg-green-700 text-white relative px-1 text-xs rounded-sm">
              {game?.odd.toFixed(2)}x
              </div>
            </div>
          </Badge>
        ) : (<div></div>)}
        
        <Badge variant="outline" className="text-white text-sm bg-gray-800">
          Saldo Disponível:
          <span className="text-green-400 ml-1">
            {isClient && (formatCurrency(numberToFloat(user?.balance || 0)))}
          </span>
        </Badge>
      </div>
      <div className="grid grid-cols-1 gap-4">{renderGrid()}</div>
    </section>
  );
};

export default Board;
