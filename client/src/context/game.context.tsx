"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

type Game = {
  isStarted: boolean;
  gameId: string;
  revealed: string[][];
  odd: number;
  hits: number;
  betAmount: number;
} | null;

type GameContextType = {
  game: Game;
  setGame: (game: Game) => void;
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [game, setGame] = useState<Game>(() => {
    if (typeof window !== "undefined") {
      const storedGame = localStorage.getItem("game");
      return storedGame ? JSON.parse(storedGame) : null;
    }
    return null;
  });

  useEffect(() => {
    if (game) localStorage.setItem("game", JSON.stringify(game));
    else localStorage.removeItem("game");
  }, [game]);

  return (
    <GameContext.Provider value={{ game, setGame }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
};
