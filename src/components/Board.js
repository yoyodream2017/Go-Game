import React, { Component } from 'react'
import Square from './Square'
import { func, number, array } from 'prop-types'

const propTypes = {
  boardSize: number,
  onClick: func,
  squares: array
}

class Board extends Component {
  renderSquare(i,j) {
    return (
      <Square
        value={this.props.squares[i][j]}
        onClick={() => this.props.onClick(i,j)}
      />
    )
  }

  renderRow(i) {
    const boardSize = this.props.boardSize
    const boardRow = Array.from({length: boardSize}).map((item, j) => {
      return (
        <span key={'square'+i+j}> 
          {this.renderSquare(i, j)}
        </span>
      )
    })

    return (
      boardRow
    )
  }

  render() {
    const boardSize = this.props.boardSize
    let board = new Array(boardSize)
      .fill(null)
      .map(() => new Array(boardSize))// add fill to use array method map,forEach etc.
    
    board.forEach((arr, i) => {
      arr.push(
        <div className="board-row" key={'square'+i}>
          {this.renderRow(i)}
        </div>
      )}
    )

    return (
      <div>
        {board}
      </div>
    )
  }
}
Board.propTypes = propTypes

export default Board
