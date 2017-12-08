import React, { Component } from 'react';
import Square from './Square';
const boardSize = 13;

class Board extends Component {
  renderSquare(i,j) {
    return (
      <Square
        value={this.props.squares[i][j]}
        onClick={() => this.props.onClick(i,j)}
      />
    );
  }

  renderRow(i) {
    let boardRow = new Array(boardSize);

    for (let j = 0; j<boardSize; j++) {
      boardRow.push(
        <span key={'square'+i+j}>
          {this.renderSquare(i, j)}
        </span>
      )
    }
    return (
      boardRow
    )
  }

  render() {
    let board = new Array(boardSize);
    
    for(let k=0; k<boardSize; k++) {
      board[k] = new Array(boardSize);
    }

    for(let i=0; i<boardSize; i++){
      board[i].push(
        <div className="board-row" key={'square'+i}>
          {this.renderRow(i)}
        </div>
      )
    }

    return (
      <div>
        {board}
      </div>
    );
  }
}

export default Board;
