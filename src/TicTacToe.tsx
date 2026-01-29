import { useState } from "react";
import "./TicTacToe.css";

type PlayerMark = "X" | "O";

type WinnerInfo = {
  winner: PlayerMark;
  line: number[];
};

const WINNING_COMBINATIONS: number[][] = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
];

const calculateWinner = (board: (PlayerMark)[]): WinnerInfo => {
  for (const combination of WINNING_COMBINATIONS) {
    const [a, b, c] = combination;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a] as PlayerMark, line: combination };
    }
  }
  return null;
};

const getGameStatusText = (
  winnerInfo: WinnerInfo,
  isDraw: boolean,
  isXNext: boolean
): string => {
  if (winnerInfo) return `Winner: ${winnerInfo.winner}`;
  if (isDraw) return "Draw!";
  return `Next turn: ${isXNext ? "X" : "O"}`;
};

const TicTacToe = () => {
  const [board, setBoard] = useState<(PlayerMark)[]>(
    Array(9).fill(null)
  );
  const [isXNext, setIsXNext] = useState(true);
  const [winnerInfo, setWinnerInfo] = useState<WinnerInfo>(null);

  const handleSquareClick = (index: number): void => {
    if (board[index] || winnerInfo) return;

    const updatedBoard = [...board];
    updatedBoard[index] = isXNext ? "X" : "O";
    setBoard(updatedBoard);

    const winner = calculateWinner(updatedBoard);
    if (winner) {
      setWinnerInfo(winner);
    } else {
      setIsXNext((prev) => !prev);
    }
  };

  const restartGame = (): void => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinnerInfo(null);
  };

  const isDraw = !winnerInfo && board.every((square) => square !== null);
  const statusText = getGameStatusText(winnerInfo, isDraw, isXNext);

  return (
    <div>
      <h1>Tic-Tac-Toe</h1>
      <div>{statusText}</div>

      <div>
        {board.map((mark, index) => {
          const isWinningSquare = winnerInfo?.line.includes(index);
          return (
            <button
              key={index}
              onClick={() => handleSquareClick(index)}
            >
              {mark}
            </button>
          );
        })}
      </div>

      <button onClick={restartGame}>
        Restart Game
      </button>
    </div>
  );
};

export default TicTacToe;