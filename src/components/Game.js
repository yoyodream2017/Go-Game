import React, { Component } from 'react';
import Board from './Board';
import { Link } from 'react-router-dom';

const boardSize = 13;
let gameOver = false;
const boardArray = Array.from({length: boardSize}).map(() => new Array(boardSize).fill(null))

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: boardArray,
          position: []
        }
      ],
      stepNumber: 0,
      xIsNext: true
    };
  }

  calculateWinner = (squares, i, j) => {
    if(i === undefined) {
      return null
    }

    const check = squares[i][j]
    const lines = [
      [[-4, -4], [-3, -3], [-2, -2], [-1, -1]],
      [[-3, -3], [-2, -2], [-1, -1], [1, 1]],
      [[-2, -2], [-1, -1], [1, 1],[2, 2]],
      [[-1, -1], [1, 1],[2, 2], [3, 3]],
      [[1, 1],[2, 2], [3, 3], [4, 4]],
      
      [[-4, 0], [-3, 0],[-2, 0], [-1, 0]],
      [[-3, 0],[-2, 0], [-1, 0], [1, 0]],
      [[-2, 0], [-1, 0], [1, 0], [2, 0]],
      [[-1, 0], [1, 0], [2, 0], [3, 0]],
      [[1, 0], [2, 0], [3, 0], [4, 0]],
      
      [[0, -4], [0, -3],[0, -2], [0, -1]],
      [[0, -3],[0, -2], [0, -1], [0, 1]],
      [[0, -2], [0, -1], [0, 1], [0, 2]],
      [[0, -1], [0, 1], [0, 2], [0, 3]],
      [[0, 1], [0, 2], [0, 3], [0, 4]],
      
      [[-4, 4], [-3, 3],[-2, 2], [-1, 1]],
      [[-3, 3],[-2, 2], [-1, 1],[1, -1]],
      [[-2, 2], [-1, 1],[1, -1], [2, -2]],
      [[-1, 1],[1, -1], [2, -2], [3, -3]],
      [[1, -1], [2, -2], [3, -3], [4, -4]]
    ];
    for (let k = 0; k < lines.length; k++) {
      const [a, b, c, d] = lines[k];

      if(!squares[i + a[0]] || !squares[i + b[0]] || !squares[i + c[0]] || !squares[i + d[0]]) {
        continue;
      }
      if (check === squares[i+a[0]][j+a[1]] && check === squares[i+b[0]][j+b[1]] && check === squares[i+c[0]][j+c[1]] && check === squares[i+d[0]][j+d[1]]) {
        return check;
      }
    }

    return null;
  }

  handleClick(i,j) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = JSON.parse(JSON.stringify(current.squares));
    const position = [i,j];

    if (squares[i][j] || gameOver) {
      return;
    }
    squares[i][j] = this.state.xIsNext ? "X" : "O"
    this.setState({
      history: history.concat([
        {
          squares,
          position
        }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0
    });
  }

  render() {
    const history = this.state.history;
    const stepNumber = this.state.stepNumber;
    const current = history[stepNumber];
    const winner = this.calculateWinner(current.squares, ...current.position)

    if (winner && !gameOver) {
      gameOver = true
    }

    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <li key={move}>
          <button onClick={
            () => {
              this.jumpTo(move);

              if (stepNumber > move) {
                gameOver = false
              }
            }
          }>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div>
        <div>
          <Link to="/">Home</Link>
        </div>
        <br/>
        <div className="game">
          <div className="game-board">
            <Board
              squares={current.squares}
              boardSize={boardSize}
              onClick={(i,j) => this.handleClick(i,j)}
            />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
          </div>
        </div>
      </div>
    );
  }
}

export default Game;
