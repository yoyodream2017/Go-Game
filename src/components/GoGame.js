import React, { Component } from 'react'
import Board from './Board'

class GoGame extends Component {

  constructor(props) {
    super(props)
    this.boardSize = 9
    this.state = {
      history: [
        {
          squares: Array.from({length: this.boardSize}).map(() => new Array(this.boardSize).fill(null)),
          position: [],
          block: [],
          capturedSquare: [],
          forbid: false
        }
      ],
      stepNumber: 0,
      xIsNext: true,
    }
  }

  calculateWinner() {
    return null
  }

  calculateCapture(i, j, squares, block, forbid, capturedSquare, position) {
    // Clicking, say ‘X’, set new block number, use block number array in history to store it.
     
    // Check all states in four neighbors, set all X with same block number to the new block number.

    // Check the block number of 'O' in four directions, record the block number. Check all squares with same block number,for four directions for each square, if no space, remove them all.

    // State: three type of states: X, O, space. will not set state for border, just judge when close to border. 
  
    // Forbiding the suiside and ko case. suiside case, just do remove first and check death for the new block. if no block removed and death true for the new block, forbidden. 
    
    // Ko case: the position is the only one last killed and killed the last position only.

    const currentState = this.currentState()

    return this.handleBlock(i, j, squares, currentState, block, forbid, capturedSquare, position)
    
  }

  currentState() {
    return this.state.xIsNext ? 'X' : 'O'
  }

  handleBlock(i, j, squares, currentState, block, forbid, capturedSquare, position) {
    let left, right, top, bottom
    let addedArr = []
    let addNum = []
    let subNum = []
    let blockNumberLeft, blockNumberRight, blockNumberTop, blockNumberBottom

    addedArr.push([i, j])

    if (j !== 0) {
      left = squares[i][j-1]
      blockNumberLeft = this.checkBlockNumber(i, j-1, block)
      
      if (currentState === left) {
        if (blockNumberLeft !== undefined && !addNum.includes(blockNumberLeft)) {

          addNum.push(blockNumberLeft)

          block[blockNumberLeft].forEach(arr => {
            addedArr.push(arr)
          })

        }
      } else if (left !== null) {
        if (blockNumberLeft !== undefined && !subNum.includes(blockNumberLeft)) {
          let count = 0

          block[blockNumberLeft].forEach(arr => {
            if (this.checkDeath(arr, squares)) {
              count++
            }
          })
  
          if (count === block[blockNumberLeft].length) {
            block[blockNumberLeft].forEach(arr => {
              squares[arr[0]][arr[1]] = null
            })

            subNum.push(blockNumberLeft)
          }
        }
      }
    }

    if (j !== this.boardSize-1) {
      right = squares[i][j+1]
      blockNumberRight = this.checkBlockNumber(i, j+1, block)

      if (currentState === right) {
        if (blockNumberRight !== undefined && !addNum.includes(blockNumberRight)) {

          addNum.push(blockNumberRight)

          block[blockNumberRight].forEach(arr => {
            addedArr.push(arr)
          })

        }
      } else if (right !== null) {
        if (blockNumberRight !== undefined && !subNum.includes(blockNumberRight)) {
          let count = 0

          block[blockNumberRight].forEach(arr => {
            if (this.checkDeath(arr, squares)) {
              count++
            }
          })

          if (count === block[blockNumberRight].length) {
            block[blockNumberRight].forEach(arr => {
              squares[arr[0]][arr[1]] = null
            })

            subNum.push(blockNumberRight)
          }
        }
      }
    }

    if (i !== 0) {
      top = squares[i-1][j]
      blockNumberTop = this.checkBlockNumber(i-1, j, block)

      if (currentState === top) {
        if (blockNumberTop !== undefined && !addNum.includes(blockNumberTop)) {
          
          addNum.push(blockNumberTop)

          block[blockNumberTop].forEach(arr => {
            addedArr.push(arr)
          })

          
        }

      } else if (top !== null) {
        if (blockNumberTop !== undefined && !subNum.includes(blockNumberTop)) {
          let count = 0
        
          block[blockNumberTop].forEach(arr => {
            if (this.checkDeath(arr, squares)) {
              count++
            }
          })

          if (count === block[blockNumberTop].length) {
            block[blockNumberTop].forEach(arr => {
              squares[arr[0]][arr[1]] = null
            })

            subNum.push(blockNumberTop)
          }
        }
      }
    }

    if (i !== this.boardSize-1 ) {
      bottom = squares[i+1][j]
      blockNumberBottom = this.checkBlockNumber(i+1, j, block)

      if (currentState === bottom) {
        if (blockNumberBottom !== undefined && !addNum.includes(blockNumberBottom)) {
          
          addNum.push(blockNumberBottom)

          block[blockNumberBottom].forEach(arr => {
            addedArr.push(arr)
          })
        }
      } else if (bottom !== null) {
        if (blockNumberBottom !== undefined && !subNum.includes(blockNumberBottom)) {
          let count = 0
        
          block[blockNumberBottom].forEach(arr => {
            if (this.checkDeath(arr, squares)) {
              count++
            }
          })

          if (count === block[blockNumberBottom].length) {
            block[blockNumberBottom].forEach(arr => {
              squares[arr[0]][arr[1]] = null
            })

            subNum.push(blockNumberBottom)
          }
        }
      }
    }
    let totalNum = []
    
    addNum.concat(subNum).forEach(num => {
      if(!totalNum.includes(num)){
        totalNum.push(num)
      }
    })

    if (subNum.length === 1 && block[subNum[0]].length === 1) {
    
      if(capturedSquare[0] === i && capturedSquare[1] === j && block[subNum[0]][0][0]=== position[0] && block[subNum[0]][0][1] === position[1]) {
        return true
      }

     [capturedSquare[0], capturedSquare[1]] = block[subNum[0]][0].slice()
    }

    totalNum.forEach(num => {
      block[num] = []
    })
    
    // splice would cause the index disturbance,should reduce len and i
    for (let i=0,len=block.length;i<len;i++) {
      if (Object.keys(block[i]).length === 0) {
        block.splice(i, 1)
        len--
        i--
      }
    }

    block.push(addedArr)

    let count = 0

    block[block.length-1].forEach(arr => {
      if (this.checkDeath(arr, squares)) {
        count++
      }
    })

    if(count === block[block.length-1].length) {
      forbid = true
    }
    
    [position[0], position[1]] = [i, j]

    return forbid
    // console.log(block)    
    // console.log(JSON.stringify(block))
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
    let block = current.block.slice() // without slice would cause history bug.
    let forbid = current.forbid
    let capturedSquare = current.capturedSquare.slice()
    const squares = JSON.parse(JSON.stringify(current.squares))
    let position = current.position.slice()

    if (squares[i][j] || this.gameOver) {
      return
    }
    squares[i][j] = this.currentState()

    if (this.calculateCapture(i, j, squares, block, forbid, capturedSquare, position)) {
      return
    }

    this.setState({
      history: history.concat([
        {
          squares,
          position,
          block,
          forbid,
          capturedSquare
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
