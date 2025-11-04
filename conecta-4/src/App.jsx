import { useState } from 'react';

const ROWS = 6;
const COLS = 7;

function Square({ value, onSquareClick }) {
  const className = value === 'X' ? 'square red' : value === 'O' ? 'square yellow' : 'square';
  return (
    <button className={className} onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    if (calculateWinner(squares)) return;
    const col = i % COLS;
    let row = -1;
    for (let r = ROWS - 1; r >= 0; r--) {
      const idx = r * COLS + col;
      if (!squares[idx]) { row = r; break; }
    }
    if (row === -1) return;
    const nextSquares = squares.slice();
    nextSquares[row * COLS + col] = xIsNext ? 'X' : 'O';
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Ganador: ' + winner;
  } else {
    status = 'Siguiente jugador: ' + (xIsNext ? 'X' : 'O');
  }

/*   return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
} */
return (<>
  <div className="status">{status}</div>
  <div className="board-row">
    <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
    <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
    <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
    <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
    <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
    <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
    <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
  </div>
  <div className="board-row">
    <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
    <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
    <Square value={squares[9]} onSquareClick={() => handleClick(9)} />
    <Square value={squares[10]} onSquareClick={() => handleClick( 10)} />
    <Square value={squares[11]} onSquareClick={() => handleClick(11)} />
    <Square value={squares[12]} onSquareClick={() => handleClick(12)} />
    <Square value={squares[13]} onSquareClick={() => handleClick(13)} />
  </div>
  <div className="board-row">
    <Square value={squares[14]} onSquareClick={() => handleClick(14)} />
    <Square value={squares[15]} onSquareClick={() => handleClick(15)} />
    <Square value={squares[16]} onSquareClick={() => handleClick(16)} />
    <Square value={squares[17]} onSquareClick={() => handleClick(17)} />
    <Square value={squares[18]} onSquareClick={() => handleClick(18)} />
    <Square value={squares[19]} onSquareClick={() => handleClick(19)} />
    <Square value={squares[20]} onSquareClick={() => handleClick(20)} />
  </div>
  <div className="board-row">
    <Square value={ squares[21]} onSquareClick={() => handleClick(21)} />
    <Square value={squares[22]} onSquareClick={() => handleClick(22)} />
    <Square value={squares[23]} onSquareClick={() => handleClick(23)} />
    <Square value={squares[24]} onSquareClick={() => handleClick(24)} />
    <Square value={squares[25]} onSquareClick={() => handleClick(25)} />
    <Square value={squares[26]} onSquareClick={() => handleClick(26)} />
    <Square value={squares[27]} onSquareClick={() => handleClick(27)} />
  </div>
  <div className="board-row">
    <Square value={squares[28]} onSquareClick={() => handleClick(28)} />
    <Square value={squares[29]} onSquareClick={() => handleClick(29)} />
    <Square value={squares[30]} onSquareClick={() => handleClick(30)} />
    <Square value={squares[31]} onSquareClick={() => handleClick(31)} />
    <Square value={squares[32]} onSquareClick={() => handleClick(32)} />
    <Square value={squares[33]} onSquareClick={() => handleClick(33)} />
    <Square value={squares[34]} onSquareClick={() => handleClick(34)} />
  </div>
  <div className="board-row">
    <Square value={squares[35]} onSquareClick={() => handleClick(35)} />
    <Square value={squares[36]} onSquareClick={() => handleClick(36)} />
    <Square value={squares[37]} onSquareClick={() => handleClick(37)} />
    <Square value={squares[38]} onSquareClick={() => handleClick(38)} />
    <Square value={squares[39]} onSquareClick={() => handleClick(39)} />
    <Square value={squares[40]} onSquareClick={() => handleClick(40)} />
    <Square value={squares[41]} onSquareClick={() => handleClick(41)} />
  </div>
</>);
}

export default function Game() {
  const [history, setHistory] = useState([Array(ROWS * COLS).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Ir al movimiento #' + move;
    } else {
      description = 'Ir al inicio del juego';
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}



function calculateWinner(squares) {
  const lines = [];

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c + 3 < COLS; c++) {
      lines.push([
        r * COLS + c,
        r * COLS + c + 1,
        r * COLS + c + 2,
        r * COLS + c + 3
      ]);
    }
  }

  for (let r = 0; r + 3 < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      lines.push([
        r * COLS + c,
        (r + 1) * COLS + c,
        (r + 2) * COLS + c,
        (r + 3) * COLS + c
      ]);
    }
  }

  for (let r = 0; r + 3 < ROWS; r++) {
    for (let c = 0; c + 3 < COLS; c++) {
      lines.push([
        r * COLS + c,
        (r + 1) * COLS + c + 1,
        (r + 2) * COLS + c + 2,
        (r + 3) * COLS + c + 3
      ]);
    }
  }

  for (let r = 3; r < ROWS; r++) {
    for (let c = 0; c + 3 < COLS; c++) {
      lines.push([
        r * COLS + c,
        (r - 1) * COLS + c + 1,
        (r - 2) * COLS + c + 2,
        (r - 3) * COLS + c + 3
      ]);
    }
  }

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c, d] = lines[i];
    if (
      squares[a] &&
      squares[a] === squares[b] &&
      squares[a] === squares[c] &&
      squares[a] === squares[d]
    ) {
      return squares[a];
    }
  }
  return null;
}