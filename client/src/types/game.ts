export type GameCreated = {
	gameId: string;
	message: string;
}

export type GameFinished = {
	gameId: string;
	balance: number;
	winAmount: number;
	odd: number,
	hits: number,
	board: ("S" | "M")[][];
	revealed: (null | "S" | "M")[][];
	message: string;
};

export type GamePlayed = {
	gameId: string;
	odd: number;
	hits: number;
	row: number;
	col: number;
	message: string;
}

export type GameFinishedFailed = {
	gameId: string;
	board: ("S" | "M")[][];
	revealed: (null | "S" | "M")[][];
	message: string;
	row: number;
	col: number;
};