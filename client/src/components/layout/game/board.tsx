import React from "react";
import { Badge } from "@/components/ui/badge";

const Board = () => {
  const rows = 5;
  const cols = 5;

  const renderCell = (row: number, col: number) => {
    return (
      <div
        key={`${row}-${col}`}
        className="cell w-full h-28 border rounded-sm flex justify-center items-center bg-red-500"
      >{`${row},${col}`}</div>
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
        <Badge variant="outline" className="flex gap-x-2 text-white py-1 text-sm bg-gray-800">
          Aposta: USD 1,00
          <div>
            <div className="bg-green-700 text-white relative px-1 text-xs rounded-sm">
              2.32x
            </div>
          </div>
        </Badge>
        <Badge variant="outline" className="text-white text-sm bg-gray-800">
          Saldo Disponível:
          <span className="text-green-400 ml-1"> USD 10000,00</span>
        </Badge>
      </div>
      <div className="grid grid-cols-1 gap-4">{renderGrid()}</div>
    </section>
  );
};

export default Board;
