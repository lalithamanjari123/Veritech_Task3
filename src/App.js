// App.js

import React, { useState } from 'react';
import './App.css';
import player1Image from './asserts/person1.png'; // Replace with the actual path to player 1 image
import player2Image from './asserts/person2.png'; // Replace with the actual path to player 2 image
import confettiImage from './asserts/confitte.png';

const initialBoard = Array(9).fill(null);

const App = () => {
  const [board, setBoard] = useState(initialBoard);
  const [xIsNext, setXIsNext] = useState(true);
  const [isDrawModalOpen, setIsDrawModalOpen] = useState(false);

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const isBoardFull = (squares) => {
    return squares.every((square) => square !== null);
  };

  const handleClick = (i) => {
    if (board[i] || calculateWinner(board)) {
      return;
    }

    const newBoard = [...board];
    newBoard[i] = xIsNext ? 'X' : 'O';

    setBoard(newBoard);
    setXIsNext(!xIsNext);

    if (isBoardFull(newBoard) || calculateWinner(newBoard)) {
      setIsDrawModalOpen(true);
    }
  };

  const renderSquare = (i) => (
    <button className={`square large-square ${board[i] === 'X' ? 'X' : ''} ${board[i] === 'O' ? 'O' : ''}`} onClick={() => handleClick(i)}>
      {board[i]}
    </button>
  );

  const winner = calculateWinner(board);
  const isDraw = isBoardFull(board) && !winner;
  const currentPlayerImage = xIsNext ? player1Image : player2Image;
  const currentPlayerLabel = xIsNext ? 'Player X' : 'Player O';

  return (
    <div className="game">
      <div className="players">
        <div className="player-icon">
          <img src={currentPlayerImage} alt={currentPlayerLabel} className="player-image" />
          <p>{currentPlayerLabel}</p>
        </div>
        
      </div>
      <div className="game-board">
        <div className="status">{winner ? `Winner: ${winner}` : isDraw ? 'It\'s a draw!' : ''}</div>
        <div className="board-row">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="board-row">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="board-row">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>

      {isDrawModalOpen && (
        <div className="modal">
          <div className="modal-content celebration-modal">
            {winner && (
              <>
                <p>Congratulations {winner}! You are the winner!</p>
                <img src={confettiImage} alt="Confetti" className="confetti-image" />
              </>
            )}
            {!winner && <p>It's a draw!</p>}
            <button onClick={() => setIsDrawModalOpen(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
