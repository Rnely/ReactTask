import { useState } from "react";
import Board from './Board';
import calculateWinner from './CalcWinner';

const Game = () => {
    const[history, setHistory] = useState([{squares:Array(9).fill(null)}]);
    const[stepNumver, setStepNumver] = useState(0);
    const[xIsNext, setXIsNext] = useState(true);

    const handleClick = (i) => {
        setHistory(history.slice(0, stepNumver + 1));
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
          return;
        }
        squares[i] = xIsNext ? 'X' : 'O';
        setHistory(history.concat([{squares: squares}]));
        setStepNumver(history.length);
        setXIsNext(!xIsNext);
      }

      const jumpTo = (step) => {
        setStepNumver(step);
        setXIsNext((step % 2) === 0) 
      }

      const current = history[stepNumver];
      const winner = calculateWinner(current.squares);

      const moves = history.map((step, move) => {
          const desc = move ?
          'Go to move #'+ move :
          'Go to game start';
          return (
              <li key={move}>
                  <button onClick={() => jumpTo(move)}>{desc}</button>
              </li>
          );
      });

      let status;
      if(winner) {
        status = 'Winner: ' + winner;
      } else {
        status = 'Next player: ' + (xIsNext ? 'X' : 'O');
      }

    return (
      <div className="game">
        <div className="game-board">
          <Board 
          squares={current.squares}
          onClick={(i) => handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{ status }</div>
          <ol>{ moves }</ol>
        </div>
      </div>
    );
  }

  export default Game;