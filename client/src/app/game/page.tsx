import { Metadata } from "next";
import BlurFade from "@/components/ui/blur-fade";
import Board from "@/components/layout/game/board";
import BoardPanel from "@/components/layout/game/board-panel";

export const metadata: Metadata = {
  title: "Aposte e Diverta-se | Mines",
  description: "...",
};

export default function Game() {
  return (
    <div className="mt-3 px-1 md:px-0">
      <BlurFade inView={true} inViewMargin="-50px" delay={1}>
        <div className="text-gray-100 grid grid-cols-1 px-2 md:grid-cols-game gap-8 min-h-[calc(100vh-30vh)]">
          <BoardPanel />
          <Board />
        </div>
      </BlurFade>
    </div>
  );
}
