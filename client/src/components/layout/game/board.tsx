"use client";

import React, { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { useUser } from "@/context/user.context";
import { formatCurrency, numberToFloat } from "@/lib/utils";
import FlipCard from "../card/flip-card";
import { useGame } from "@/context/game.context";

const Board = ({ clearBoard }: { clearBoard: boolean }) => {
  const { user } = useUser();
  const [isClient, setIsClient] = useState(false);
  const { game, setGame } = useGame();
  const [currentOdd, setCurrentOdd] = useState(game?.odd || 0);
  const [userBalance, setUserBalance] = useState(user?.balance || 0);

  const rows = 5;
  const cols = 5;

  useEffect(() => {
    setIsClient(true);
  }, [game]);

  useEffect(() => {
    if (game?.odd) setCurrentOdd(game.odd);
  }, [game?.odd]);

  useEffect(() => {
    if (user?.balance) setUserBalance(user?.balance);
  }, [user?.balance]);

  useEffect(() => {
    setGame(null);
  }, [clearBoard, setGame]);

  const renderCell = (row: number, col: number) => {
    return (
      <FlipCard
        key={`${row}-${col}`}
        row={row}
        col={col}
        reset={clearBoard}
      />
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
        <div key={row} className="row flex gap-4 flex-nowrap">
          {cells}
        </div>
      );
    }
    return grid;
  };

  return (
    <section>
      <div className="flex justify-between mb-4 px-3 lg:px-0">
        {game?.isStarted ? (
          <Badge
            variant="outline"
            className="flex gap-x-2 h-7 text-white py-1 text-sm bg-gray-800"
          >
            Aposta: {formatCurrency(numberToFloat(game?.betAmount || 0))}
            <div>
              <div className="bg-green-700 text-white relative px-1 text-xs rounded-sm">
                {currentOdd.toFixed(2)}x
              </div>
            </div>
          </Badge>
        ) : (
          <div></div>
        )}

        <Badge variant="outline" className="text-white h-7 text-sm bg-gray-800">
          Saldo Disponível:
          <span className="text-green-400 ml-1">
            {isClient && formatCurrency(numberToFloat(userBalance))}
          </span>
        </Badge>
      </div>
      <section>
        <div className="flex justify-center flex-wrap lg:grid pt-5 px-4 sm:px-0 sm:pt-0 grid-cols-1 gap-4">{renderGrid()}</div>
      </section>
    </section>
  );
};

export default Board;
