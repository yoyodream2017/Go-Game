import React, { Component } from 'react'
import Board from './Board'

class GoGame extends Component {

  constructor(props) {
    super(props)
    this.boardSize = 19
    this.state = {
      history: [
        {
          squares: Array.from({length: this.boardSize}).map(() => new Array(this.boardSize).fill(null)),
          position: [],
          block: []
        }
      ],
      stepNumber: 0,
      xIsNext: true,
    }
  }

  calculateWinner() {
    return null
  }

  calculateCapture(i, j, squares, block) {
    // If a is 'X', set new block number, check all the four neighbors, set all X with same block number to the new block number. The new block number is increased with move number.
      // ===> Better algorithm? set an array to store the block number and all squares belong to it.
    // Four type of states: X, O, space, border.
      // ===> set the initial border squares.
    // Excluding the suiside case.
    // Check the block number of 'O' in four directions, record the block number.
    // Check all squares with same block number,for four direction, if no space, remove them all.
    const currentState = this.currentState()
    this.handleBlock(i, j, squares, currentState, block)

  }

  currentState() {
    return this.state.xIsNext ? 'X' : 'O'
  }

  handleBlock(i, j, squares, currentState, block) {
    let left, right, top, bottom
    let addedArr = []

    addedArr.push([i, j])

    if (j !== 0) {
      left = squares[i][j-1]
      const blockNumber = this.checkBlockNumber(i, j-1, block)
      
      if (currentState === left) {
        
        block[blockNumber].forEach(arr => {
          addedArr.push(arr)
        })

        block.splice(blockNumber, 1)
      } else if (left !== null) {
        let count = 0
        
        block[blockNumber].forEach(arr => {
          if (this.checkDeath(arr, squares)) {
            count++
          }
        })

        if (count === block[blockNumber].length) {
          block[blockNumber].forEach(arr => {
            squares[arr[0]][arr[1]] = null
          })
          block.splice(blockNumber, 1)
        }
      }
    }

    if (j !== this.boardSize-1) {
      right = squares[i][j+1]
      const blockNumber = this.checkBlockNumber(i, j+1, block)

      if (currentState === right) {

        block[blockNumber].forEach(arr => {
          addedArr.push(arr)
        })

        block.splice(blockNumber, 1)
      } else if (right !== null) {
        let count = 0
        
        block[blockNumber].forEach(arr => {
          if (this.checkDeath(arr, squares)) {
            count++
          }
        })

        if (count === block[blockNumber].length) {
          block[blockNumber].forEach(arr => {
            squares[arr[0]][arr[1]] = null
          })
          block.splice(blockNumber, 1)
        }
      }
    }

    if (i !== 0) {
      top = squares[i-1][j]
      const blockNumber = this.checkBlockNumber(i-1, j, block)

      if (currentState === top) {

        block[blockNumber].forEach(arr => {
          addedArr.push(arr)
        })

        block.splice(blockNumber, 1)
      } else if (top !== null) {
        let count = 0
        
        block[blockNumber].forEach(arr => {
          if (this.checkDeath(arr, squares)) {
            count++
          }
        })

        if (count === block[blockNumber].length) {
          block[blockNumber].forEach(arr => {
            squares[arr[0]][arr[1]] = null
          })
          block.splice(blockNumber, 1)
        }
      }
    }

    if (i !== this.boardSize-1 ) {
      bottom = squares[i+1][j]
      const blockNumber = this.checkBlockNumber(i+1, j, block)

      if (currentState === bottom) {
        
        block[blockNumber].forEach(arr => {
          addedArr.push(arr)
        })

        block.splice(blockNumber, 1)
      } else if (bottom !== null) {
        let count = 0
        
        block[blockNumber].forEach(arr => {
          if (this.checkDeath(arr, squares)) {
            count++
          }
        })

        if (count === block[blockNumber].length) {
          block[blockNumber].forEach(arr => {
            squares[arr[0]][arr[1]] = null
          })
          block.splice(blockNumber, 1)
        }
      }
    }

    block.push(addedArr)
  }

  checkBlockNumber(i, j, block) {
    for (let k = 0; k < block.length; k++) {
      for (let z = 0; z < block[k].length; z++) {
        if (block[k][z][0] === i && block[k][z][1] === j) {
          return k
        }
      }
    }
  }

  checkDeath ([i, j], squares) {
    let [left, right, top, bottom] = new Array(4).fill(true)

    if(j !== 0) {
      left = squares[i][j-1] !== null
    }

    if (j !== this.boardSize-1) {
      right = squares[i][j+1] !== null
    }

    if (i !== 0) {
      top = squares[i-1][j] !== null
    }

    if (i !== this.boardSize-1) {
      bottom = squares[i+1][j] !== null
    }

    return left && right && top && bottom
  }

  handleClick(i,j) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1)
    const currentMove = history.length - 1
    const current = history[currentMove]
    let block = current.block.slice() //withoout slice would cause history bug.
    const squares = JSON.parse(JSON.stringify(current.squares))
    const position = [i,j]

    if (squares[i][j] || this.gameOver) {
      return
    }
    squares[i][j] = this.currentState()

    this.calculateCapture(i, j, squares, block)

    this.setState({
      history: history.concat([
        {
          squares,
          position,
          block
        }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    })
   
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0
    })
  }

  render() {
    const history = this.state.history
    const stepNumber = this.state.stepNumber
    const current = history[stepNumber]
    const winner = this.calculateWinner(current.squares, ...current.position)

    if (winner && !this.gameOver) {
      this.gameOver = true
    }

    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start'
      return (
        <li key={move}>
          <button onClick={
            () => {
              this.jumpTo(move)

              if (stepNumber > move) {
                this.gameOver = false
              }
            }
          }>{desc}</button>
        </li>
      )
    })

    let status
    if (winner) {
      status = 'Winner: ' + winner
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O')
    }

    return (
      <div>
        <div>
          <a href="/">Home</a>
        </div>
        <br/>
        <div className="game">
          <div className="game-board">
            <Board
              squares={current.squares}
              boardSize={this.boardSize}
              onClick={(i,j) => this.handleClick(i,j)}
            />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
          </div>
        </div>
      </div>
    )
  }
}

export default GoGame
