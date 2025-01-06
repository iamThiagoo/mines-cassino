"use client";

import { useState } from "react";
import BlurFade from "@/components/ui/blur-fade";
import Board from "@/components/layout/game/board";
import BoardPanel from "@/components/layout/game/board-panel";

export default function GameContainer() {
  const [clearBoard, setClearBoard] = useState(false);

  const handleClearBoard = () => {
    setClearBoard(false);
    setTimeout(() => setClearBoard(true), 0);
  };

  return (
    <div className="mt-3 px-1 md:px-0">
      <BlurFade inView={true} inViewMargin="-50px" delay={1}>
        <div className="text-gray-100 grid grid-cols-1 px-2 md:grid-cols-game gap-8 min-h-[calc(100vh-30vh)]">
          <BoardPanel onClearBoard={handleClearBoard} />
          <Board clearBoard={clearBoard} />
        </div>
      </BlurFade>
    </div>
  );
}
